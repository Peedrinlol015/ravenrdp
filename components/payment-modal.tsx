"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2, AlertCircle, DollarSign, Zap, CheckCircle } from "lucide-react"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  plan: {
    name: string
    price: string
  }
}

export function PaymentModal({ isOpen, onClose, plan }: PaymentModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreatePayment = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const orderNumber = `ravenrdp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const amount = plan.price.replace("$", "")

      console.log("Creating payment via API route...")

      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number.parseFloat(amount),
          currency: "USD", // Deixar o Plisio converter para crypto
          order_name: `RavenRDP - ${plan.name}`,
          order_number: orderNumber,
          source_currency: "USD",
          source_amount: Number.parseFloat(amount),
          expire_min: 60,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const payment = await response.json()
      console.log("Payment response:", payment)

      if (payment.status === "success" && payment.data) {
        // Redirecionar diretamente para a página de pagamento do Plisio
        window.open(payment.data.invoice_url, "_blank")
        onClose() // Fechar o modal após abrir a página de pagamento
      } else {
        const errorMessage = payment.error?.message || "Unknown error occurred"
        console.error("Payment creation failed:", payment)
        throw new Error(`Payment creation failed: ${errorMessage}`)
      }
    } catch (error: any) {
      console.error("Payment creation error:", error)

      let errorMessage = "Error creating payment. Please try again."

      if (error.message.includes("Failed to fetch")) {
        errorMessage = "🌐 Network error. Please check your internet connection and try again."
      } else if (error.message.includes("HTTP error")) {
        errorMessage = "🔧 API error. Please check your Plisio configuration."
      } else if (error.message.includes("not configured")) {
        errorMessage = "🔑 Plisio API key not configured. Please check your environment variables."
      } else if (error.message) {
        errorMessage = error.message
      }

      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 border border-neutral-700/50 shadow-2xl backdrop-blur-xl">
        <DialogHeader className="space-y-4 pb-6">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl border border-purple-500/30">
            <Zap className="w-8 h-8 text-purple-400" />
          </div>
          <div className="text-center space-y-2">
            <DialogTitle className="text-2xl font-bold text-neutral-50">Secure Payment</DialogTitle>
            <p className="text-neutral-400 text-sm">{plan?.name} • Cryptocurrency Payment</p>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Price Display */}
          <div className="text-center py-8 bg-gradient-to-r from-purple-500/10 via-purple-600/10 to-purple-500/10 rounded-2xl border border-purple-500/20">
            <div className="space-y-3">
              <p className="text-sm text-neutral-400 uppercase tracking-wider font-medium">Total Amount</p>
              <p className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                {plan?.price}
              </p>
              <p className="text-neutral-500 text-sm">USD • One-time payment</p>
            </div>
          </div>

          {error && (
            <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/30 rounded-xl p-4 flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-300 text-sm font-medium">Payment Error</p>
                <p className="text-red-400/80 text-xs mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Payment Button */}
          <Button
            onClick={handleCreatePayment}
            disabled={isLoading}
            className="w-full h-16 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold text-xl rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                Processing payment...
              </>
            ) : (
              <>
                <DollarSign className="mr-3 h-6 w-6" />
                Pay with Cryptocurrency
              </>
            )}
          </Button>

          {/* Info Cards */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-green-300 text-sm font-medium">Multiple Cryptocurrencies</p>
                  <p className="text-green-400/80 text-xs">
                    Choose from Bitcoin, Ethereum, USDT, Litecoin, Solana and more
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-blue-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-blue-300 text-sm font-medium">Instant Activation</p>
                  <p className="text-blue-400/80 text-xs">Your server will be ready within 5 minutes after payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
