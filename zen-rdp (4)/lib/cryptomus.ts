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

  private async makeRequest(endpoint: string, data: any): Promise<PlisioResponse> {
    const params = new URLSearchParams({
      ...data,
      api_key: this.secretKey,
    })

    const response = await fetch(`${this.baseUrl}${endpoint}?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    return response.json()
  }

  async createInvoice(paymentData: PlisioPayment): Promise<PlisioResponse> {
    return this.makeRequest("/invoices/new", paymentData)
  }

  async getInvoiceStatus(invoiceId: string): Promise<PlisioResponse> {
    return this.makeRequest("/invoices", { txn_id: invoiceId })
  }

  // Verificar assinatura do webhook
  verifyCallback(postData: any, receivedSign: string): boolean {
    const dataString = JSON.stringify(postData)
    const expectedSign = require("crypto").createHmac("sha1", this.secretKey).update(dataString).digest("hex")

    return expectedSign === receivedSign
  }
}

// Função helper para URLs dinâmicas
export function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin
  }
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
}
