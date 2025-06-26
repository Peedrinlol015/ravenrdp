import { type NextRequest, NextResponse } from "next/server"

// Discord webhook function for new orders
async function sendOrderCreatedNotification(orderData: any) {
  const webhookUrl =
    "https://discord.com/api/webhooks/1387819046505938995/TzXUSFvv3mpoDwOl-JQIbw33ibRZCgOHXaNTwIYGZ_uhTyTF_zSEQKAwVFKHh_79bLGO"

  try {
    const embed = {
      title: "🆕 New Order Created",
      description: "A new RDP order has been initiated and is awaiting payment.",
      color: 0x0099ff,
      fields: [
        {
          name: "Order Number",
          value: `\`${orderData.order_number}\``,
          inline: true,
        },
        {
          name: "Plan",
          value: orderData.order_name,
          inline: true,
        },
        {
          name: "Amount",
          value: `$${orderData.source_amount} USD`,
          inline: true,
        },
        {
          name: "Payment URL",
          value: `[Open Payment Page](${orderData.invoice_url})`,
          inline: false,
        },
        {
          name: "Expires In",
          value: `${orderData.expire_min} minutes`,
          inline: true,
        },
        {
          name: "Status",
          value: "AWAITING PAYMENT",
          inline: true,
        },
      ],
      footer: {
        text: "RavenRDP Payment System",
      },
      timestamp: new Date().toISOString(),
    }

    const payload = {
      username: "RavenRDP Bot",
      avatar_url: "https://cdn.discordapp.com/attachments/1234567890/server-icon.png",
      embeds: [embed],
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error("Discord webhook failed:", response.status, response.statusText)
    } else {
      console.log("✅ Order creation notification sent to Discord")
    }
  } catch (error) {
    console.error("Error sending Discord notification:", error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, order_name, order_number, source_currency, source_amount, expire_min } = body

    const secretKey = process.env.PLISIO_SECRET_KEY

    if (!secretKey) {
      return NextResponse.json({ error: "Plisio API key not configured" }, { status: 500 })
    }

    // Build parameters for Plisio API
    const params = new URLSearchParams({
      api_key: secretKey,
      amount: amount.toString(),
      order_name: order_name,
      order_number: order_number,
      source_currency: source_currency || "USD",
      source_amount: source_amount?.toString() || amount.toString(),
      expire_min: expire_min?.toString() || "60",
      callback_url: `${request.nextUrl.origin}/api/payment/callback`,
      success_callback_url: `${request.nextUrl.origin}/payment/success`,
      fail_callback_url: `${request.nextUrl.origin}/payment/failed`,
    })

    console.log("Making request to Plisio API...")
    console.log("URL:", `https://plisio.net/api/v1/invoices/new?${params}`)

    // Make request to Plisio API
    const response = await fetch(`https://plisio.net/api/v1/invoices/new?${params}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "RavenRDP/1.0",
      },
    })

    if (!response.ok) {
      console.error("Plisio API error:", response.status, response.statusText)
      return NextResponse.json(
        { error: `Plisio API error: ${response.status} ${response.statusText}` },
        { status: response.status },
      )
    }

    const result = await response.json()
    console.log("Plisio response:", result)

    // Send notification to Discord about new order
    if (result.status === "success" && result.data) {
      await sendOrderCreatedNotification({
        order_number: order_number,
        order_name: order_name,
        source_amount: source_amount || amount,
        invoice_url: result.data.invoice_url,
        expire_min: expire_min || 60,
      })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Payment creation error:", error)

    // Send error notification to Discord
    try {
      const webhookUrl =
        "https://discord.com/api/webhooks/1387819046505938995/TzXUSFvv3mpoDwOl-JQIbw33ibRZCgOHXaNTwIYGZ_uhTyTF_zSEQKAwVFKHh_79bLGO"

      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "RavenRDP Bot",
          embeds: [
            {
              title: "🚨 Order Creation Error",
              description: `Error creating new order: ${error.message}`,
              color: 0xff0000,
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      })
    } catch (discordError) {
      console.error("Failed to send error notification to Discord:", discordError)
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
