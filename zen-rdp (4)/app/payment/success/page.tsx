"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, MessageCircle, Server, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("order_number") || "N/A"
  const amount = searchParams.get("amount") || "N/A"
  const currency = searchParams.get("currency") || "N/A"

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Success Icon */}
        <div className="text-center">
          <div className="flex items-center justify-center w-24 h-24 mx-auto bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-full border border-green-500/30 mb-6">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-green-400 mb-2">Payment Completed!</h1>
          <p className="text-xl text-neutral-300">Your cryptocurrency payment has been successfully processed</p>
        </div>

        {/* Payment Details */}
        <Card className="bg-neutral-800/50 border-neutral-700/50">
          <CardHeader>
            <CardTitle className="text-neutral-50 flex items-center gap-2">
              <Server className="w-5 h-5 text-purple-400" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-neutral-900/50 p-4 rounded-lg border border-neutral-700/50">
                <p className="text-sm text-neutral-400 mb-1">Order Number</p>
                <p className="font-mono text-sm text-neutral-200">{orderNumber}</p>
              </div>
              <div className="bg-neutral-900/50 p-4 rounded-lg border border-neutral-700/50">
                <p className="text-sm text-neutral-400 mb-1">Amount Paid</p>
                <p className="font-semibold text-neutral-200">
                  {amount} {currency}
                </p>
              </div>
              <div className="bg-neutral-900/50 p-4 rounded-lg border border-neutral-700/50">
                <p className="text-sm text-neutral-400 mb-1">Status</p>
                <p className="font-semibold text-green-400">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-neutral-50 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" />
              Next Steps
            </CardTitle>
            <CardDescription className="text-neutral-300">
              Your RDP server is being prepared and will be ready within 5 minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-blue-400" />
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="text-lg font-semibold text-blue-300">Contact us on Telegram</h3>
                  <p className="text-blue-400/80 text-sm leading-relaxed">
                    Please contact us via Telegram to receive your RDP server credentials and connection details. Our
                    team will provide you with:
                  </p>
                  <ul className="text-blue-400/80 text-sm space-y-1 ml-4">
                    <li>• Server IP address and port</li>
                    <li>• Username and password</li>
                    <li>• Connection instructions</li>
                    <li>• Technical support</li>
                  </ul>
                  <Link href="https://t.me/ravenrdp" target="_blank" rel="noopener noreferrer">
                    <Button
                      size="lg"
                      className="w-full mt-4 text-white font-semibold"
                      style={{ backgroundColor: "#27A7E7" }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e90d4")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "#27A7E7")}
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Contact @RavenRDP on Telegram
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 text-sm font-medium">Important Note</p>
                  <p className="text-amber-400/80 text-xs">
                    Please save your order number for reference. Our support team may ask for it when providing your
                    server details.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Link href="/">
            <Button variant="outline" className="border-neutral-600 hover:bg-neutral-700 text-neutral-300">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-950 text-neutral-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
            <p className="text-neutral-400">Loading...</p>
          </div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  )
}
