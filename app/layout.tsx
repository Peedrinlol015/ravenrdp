import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "RavenRDP - Premium RDP & VPS Hosting",
  description: "Reliable RDP and VPS servers with 99.9% uptime guarantee. Auto-deployed in 5 minutes.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
