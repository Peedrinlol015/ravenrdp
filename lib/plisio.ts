interface PlisioPayment {
  amount: string
  currency: string
  order_name: string
  order_number: string
  callback_url?: string
  success_callback_url?: string
  fail_callback_url?: string
  email?: string
  plugin?: string
  version?: string
  source_amount?: string
  source_currency?: string
  allowed_psys_cids?: string
  psys_cid?: string
  expire_min?: number
}

interface PlisioResponse {
  status: string
  data?: {
    txn_id: string
    invoice_url: string
    amount: string
    pending_amount: string
    wallet_hash: string
    psys_cid: string
    currency: string
    source_currency: string
    source_rate: string
    expected_confirmations: number
    tx_urls: string[]
    time_left: number
    already_paid: string
  }
  error?: {
    message: string
    code: number
  }
}

export class PlisioAPI {
  private secretKey: string
  private baseUrl = "https://plisio.net/api/v1"

  constructor(secretKey: string) {
    this.secretKey = secretKey
  }

  async createInvoice(paymentData: PlisioPayment): Promise<PlisioResponse> {
    try {
      const params = new URLSearchParams({
        api_key: this.secretKey,
        amount: paymentData.amount,
        currency: paymentData.currency,
        order_name: paymentData.order_name,
        order_number: paymentData.order_number,
        source_currency: paymentData.source_currency || "USD",
        source_amount: paymentData.source_amount || paymentData.amount,
        callback_url: paymentData.callback_url || "",
        success_callback_url: paymentData.success_callback_url || "",
        fail_callback_url: paymentData.fail_callback_url || "",
        expire_min: paymentData.expire_min?.toString() || "60",
      })

      console.log("Making request to Plisio:", `${this.baseUrl}/invoices/new?${params}`)

      const response = await fetch(`${this.baseUrl}/invoices/new?${params}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "User-Agent": "RavenRDP/1.0",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log("Plisio response:", result)

      return result
    } catch (error) {
      console.error("Plisio API error:", error)
      throw error
    }
  }

  async getInvoiceStatus(invoiceId: string): Promise<PlisioResponse> {
    try {
      const params = new URLSearchParams({
        api_key: this.secretKey,
        txn_id: invoiceId,
      })

      const response = await fetch(`${this.baseUrl}/invoices?${params}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "User-Agent": "RavenRDP/1.0",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return response.json()
    } catch (error) {
      console.error("Plisio status check error:", error)
      throw error
    }
  }

  // Verificar assinatura do webhook (simplificado para desenvolvimento)
  verifyCallback(postData: any, receivedSign: string): boolean {
    // Em produção, implementar verificação HMAC SHA-1 real
    // const dataString = JSON.stringify(postData)
    // const expectedSign = crypto.createHmac("sha1", this.secretKey).update(dataString).digest("hex")
    // return expectedSign === receivedSign
    return true
  }
}

// Função helper para URLs dinâmicas
export function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin
  }
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
}
