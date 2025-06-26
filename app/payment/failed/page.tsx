"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle, MessageCircle, RefreshCw, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function PaymentFailedContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("order_number") || "N/A"
  const reason = searchParams.get("reason") || "Payment was not completed"

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Failed Icon */}
        <div className="text-center">
          <div className="flex items-center justify-center w-24 h-24 mx-auto bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full border border-red-500/30 mb-6">
            <XCircle className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-4xl font-bold text-red-400 mb-2">Payment Failed</h1>
          <p className="text-xl text-neutral-300">Your payment could not be processed</p>
        </div>

        {/* Payment Details */}
        <Card className="bg-neutral-800/50 border-neutral-700/50">
          <CardHeader>
            <CardTitle className="text-neutral-50 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-400" />
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div className="bg-neutral-900/50 p-4 rounded-lg border border-neutral-700/50">
                <p className="text-sm text-neutral-400 mb-1">Order Number</p>
                <p className="font-mono text-sm text-neutral-200">{orderNumber}</p>
              </div>
              <div className="bg-neutral-900/50 p-4 rounded-lg border border-neutral-700/50">
                <p className="text-sm text-neutral-400 mb-1">Status</p>
                <p className="font-semibold text-red-400">Failed</p>
              </div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-sm text-red-300 font-medium mb-1">Reason:</p>
              <p className="text-red-400/80 text-sm">{reason}</p>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-neutral-50 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-blue-400" />
              What to do next?
            </CardTitle>
            <CardDescription className="text-neutral-300">Here are your options to resolve this issue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-xl p-6 text-center">
                <RefreshCw className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-purple-300 mb-2">Try Again</h3>
                <p className="text-purple-400/80 text-sm mb-4">Go back and attempt the payment process again</p>
                <Link href="/">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Payment Again
                  </Button>
                </Link>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6 text-center">
                <MessageCircle className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Get Support</h3>
                <p className="text-blue-400/80 text-sm mb-4">Contact our support team for assistance</p>
                <Link href="https://t.me/ravenrdp" target="_blank" rel="noopener noreferrer">
                  <Button
                    className="w-full text-white font-semibold"
                    style={{ backgroundColor: "#27A7E7" }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e90d4")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#27A7E7")}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-4 h-4 text-amber-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 text-sm font-medium">Common Issues</p>
                  <p className="text-amber-400/80 text-xs">
                    Payment failures can occur due to insufficient funds, network issues, or expired payment windows.
                    Please try again or contact support.
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

export default function PaymentFailedPage() {
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
      <PaymentFailedContent />
    </Suspense>
  )
}
