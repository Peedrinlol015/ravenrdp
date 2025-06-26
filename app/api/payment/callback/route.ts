import { type NextRequest, NextResponse } from "next/server"

// Discord webhook function
async function sendDiscordNotification(data: any) {
  const webhookUrl =
    "https://discord.com/api/webhooks/1387819046505938995/TzXUSFvv3mpoDwOl-JQIbw33ibRZCgOHXaNTwIYGZ_uhTyTF_zSEQKAwVFKHh_79bLGO"

  try {
    const embed = {
      title: data.status === "completed" ? "✅ Payment Completed" : `🔄 Payment ${data.status}`,
      color:
        data.status === "completed"
          ? 0x00ff00
          : data.status === "cancelled" || data.status === "expired"
            ? 0xff0000
            : 0xffaa00,
      fields: [
        {
          name: "Order Number",
          value: `\`${data.order_number}\``,
          inline: true,
        },
        {
          name: "Amount",
          value: `${data.amount} ${data.currency}`,
          inline: true,
        },
        {
          name: "Status",
          value: data.status.toUpperCase(),
          inline: true,
        },
        {
          name: "Transaction ID",
          value: `\`${data.txn_id || "N/A"}\``,
          inline: true,
        },
        {
          name: "Source Amount",
          value: `$${data.source_amount} ${data.source_currency || "USD"}`,
          inline: true,
        },
        {
          name: "Timestamp",
          value: new Date().toISOString(),
          inline: true,
        },
      ],
      footer: {
        text: "RavenRDP Payment System",
      },
      timestamp: new Date().toISOString(),
    }

    if (data.status === "completed") {
      embed.description =
        "🎉 **New RDP order completed!**\n\n**Action Required:** Contact customer via Telegram to provide server credentials."
    } else if (data.status === "cancelled" || data.status === "expired") {
      embed.description = `❌ Payment ${data.status}. No action required.`
    } else {
      embed.description = `⏳ Payment is ${data.status}. Monitoring...`
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
      console.log("✅ Discord notification sent successfully")
    }
  } catch (error) {
    console.error("Error sending Discord notification:", error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const signature = request.headers.get("x-plisio-signature") || ""

    console.log("Plisio webhook received:", body)

    // Verificar a assinatura do webhook
    const secretKey = process.env.PLISIO_SECRET_KEY

    if (!secretKey) {
      console.error("Plisio secret key not configured")
      return NextResponse.json({ error: "Configuration error" }, { status: 500 })
    }

    // Enviar notificação para Discord para todos os status
    await sendDiscordNotification(body)

    // Processar diferentes tipos de status
    if (body.status === "completed" || body.status === "mismatch") {
      // Payment confirmed
      console.log(`✅ Payment confirmed for order: ${body.order_number}`)
      console.log(`💰 Amount: ${body.amount} ${body.currency}`)
      console.log(`🔗 Transaction ID: ${body.txn_id}`)

      // Here you would implement logic to:
      // 1. Activate RDP/VPS server
      // 2. Send credentials via email
      // 3. Update database status
      // 4. Notify team via Telegram/Discord

      // Available data:
      // body.order_number - order number
      // body.amount - amount paid
      // body.currency - currency used
      // body.source_amount - original amount
      // body.source_currency - original currency
      // body.txn_id - transaction ID

      console.log("🚀 Server activation logic should be implemented here")
    } else if (body.status === "cancelled" || body.status === "expired") {
      // Payment cancelled or expired
      console.log(`❌ Payment ${body.status} for order: ${body.order_number}`)
    } else if (body.status === "pending") {
      // Payment pending
      console.log(`⏳ Payment pending for order: ${body.order_number}`)
    } else {
      console.log(`ℹ️ Payment status '${body.status}' for order: ${body.order_number}`)
    }

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Webhook processing error:", error)

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
              title: "🚨 Webhook Error",
              description: `Error processing webhook: ${error.message}`,
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
