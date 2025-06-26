"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { PaymentModal } from "@/components/payment-modal"
import {
  Server,
  Zap,
  Shield,
  HardDrive,
  Globe,
  Clock,
  Users,
  Lock,
  BarChart3,
  CheckCircle,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ZenRDPLanding() {
  const [selectedRegion, setSelectedRegion] = useState("Europe")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)

  const scrollToPlans = () => {
    const plansSection = document.getElementById("plans")
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToSupport = () => {
    const supportSection = document.getElementById("support")
    if (supportSection) {
      supportSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handlePurchase = (plan: any) => {
    setSelectedPlan(plan)
    setPaymentModalOpen(true)
  }

  const regions = ["Europe", "North America", "United States"]

  const plans = [
    {
      name: "Starter Plan",
      price: "$3.99",
      cores: "2 Cores",
      ram: "4 GB RAM",
      storage: "100 GB SSD Storage",
      bandwidth: "Unlimited Bandwidth",
      ip: "Dedicated IP",
      available: "10+ in stock",
      popular: false,
    },
    {
      name: "Essential Plan",
      price: "$7.50",
      cores: "2 Cores",
      ram: "8 GB RAM",
      storage: "150 GB SSD Storage",
      bandwidth: "Unlimited Bandwidth",
      ip: "Dedicated IP",
      available: "10+ in stock",
      popular: false,
    },
    {
      name: "Professional Plan",
      price: "$11.99",
      cores: "4 Cores",
      ram: "8 GB RAM",
      storage: "250 GB SSD Storage",
      bandwidth: "Unlimited Bandwidth",
      ip: "Dedicated IP",
      available: "10+ in stock",
      popular: true,
    },
    {
      name: "Advanced Plan",
      price: "$17.99",
      cores: "4 Cores",
      ram: "16 GB RAM",
      storage: "350 GB SSD Storage",
      bandwidth: "Unlimited Bandwidth",
      ip: "Dedicated IP",
      available: "10+ in stock",
      popular: false,
    },
    {
      name: "Enterprise Plan",
      price: "$24.99",
      cores: "8 Cores",
      ram: "16 GB RAM",
      storage: "500 GB SSD Storage",
      bandwidth: "Unlimited Bandwidth",
      ip: "Dedicated IP",
      available: "10+ in stock",
      popular: false,
    },
    {
      name: "Ultimate Plan",
      price: "$34.99",
      cores: "8 Cores",
      ram: "32 GB RAM",
      storage: "1 TB SSD Storage",
      bandwidth: "Unlimited Bandwidth",
      ip: "Dedicated IP",
      available: "10+ in stock",
      popular: false,
    },
  ]

  const features = [
    { icon: Clock, title: "5-minute automatic deployment" },
    { icon: Globe, title: "Unlimited bandwidth" },
    { icon: Server, title: "Unlimited OS reinstalls" },
    { icon: HardDrive, title: "Windows & Linux servers" },
    { icon: Shield, title: "Dedicated IP" },
    { icon: Zap, title: "Reliable infrastructure" },
  ]

  const guarantees = [
    { icon: Users, title: "Dedicated Support", description: "24/7 expert assistance" },
    { icon: Zap, title: "Fast & Reliable", description: "99.9% uptime guarantee" },
    { icon: CheckCircle, title: "Super Easy to Use", description: "Intuitive control panel" },
    { icon: Lock, title: "100% Privacy", description: "Your data stays private" },
    { icon: Shield, title: "DDoS Protection", description: "Advanced security measures" },
    { icon: HardDrive, title: "NVMe Storage", description: "Lightning-fast SSD storage" },
    { icon: Clock, title: "Instant Setup", description: "Ready in 5 minutes" },
    { icon: Globe, title: "Unlimited Bandwidth", description: "No traffic restrictions" },
    { icon: BarChart3, title: "Detailed Client Panel", description: "Complete server management" },
  ]

  const faqs = [
    {
      question: "What is RDP server hosting?",
      answer:
        "RDP (Remote Desktop Protocol) server hosting allows you to access a virtual Windows or Linux server remotely from anywhere in the world. It's perfect for running applications, storing files, or accessing your work environment from any device.",
    },
    {
      question: "Do these servers have root/admin permissions?",
      answer:
        "Yes, all our servers come with full root/administrator access. You have complete control over your server environment and can install any software or make system-level changes as needed.",
    },
    {
      question: "Can I do crypto mining on my server?",
      answer:
        "Cryptocurrency mining is not permitted on our servers as it violates our terms of service. Our servers are designed for general computing, development, and business applications.",
    },
    {
      question: "Can I upgrade to a higher package without losing data?",
      answer:
        "You can upgrade your server plan at any time without losing your data. We'll migrate your existing setup to the new server configuration seamlessly.",
    },
    {
      question: "Do the Windows servers come with a license?",
      answer:
        "Yes, all Windows servers include a valid Windows Server license. You don't need to worry about licensing costs - everything is included in your monthly subscription.",
    },
  ]

  const cryptos = [
    {
      name: "BTC",
      fullName: "Bitcoin",
      color: "bg-gradient-to-r from-orange-400 to-orange-600",
      textColor: "text-orange-100",
      borderColor: "border-orange-500/30",
      icon: "₿",
    },
    {
      name: "ETH",
      fullName: "Ethereum",
      color: "bg-gradient-to-r from-blue-400 to-blue-600",
      textColor: "text-blue-100",
      borderColor: "border-blue-500/30",
      icon: "Ξ",
    },
    {
      name: "LTC",
      fullName: "Litecoin",
      color: "bg-gradient-to-r from-gray-300 to-gray-500",
      textColor: "text-gray-100",
      borderColor: "border-gray-500/30",
      icon: "Ł",
    },
    {
      name: "USDT",
      fullName: "Tether",
      color: "bg-gradient-to-r from-green-400 to-green-600",
      textColor: "text-green-100",
      borderColor: "border-green-500/30",
      icon: "₮",
    },
    {
      name: "SOL",
      fullName: "Solana",
      color: "bg-gradient-to-r from-purple-400 to-purple-600",
      textColor: "text-purple-100",
      borderColor: "border-purple-500/30",
      icon: "◎",
    },
  ]

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-950/95 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Server className="h-8 w-8 text-purple-400" />
                <span className="text-xl font-bold">RavenRDP</span>
              </Link>
            </div>

            {/* Desktop Navigation - Perfectly Centered */}
            <nav className="hidden md:flex items-center justify-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <Link href="#plans" className="text-neutral-300 hover:text-neutral-50 transition-colors">
                Plans
              </Link>
              <Link href="#features" className="text-neutral-300 hover:text-neutral-50 transition-colors">
                Features
              </Link>
              <Link href="#guarantees" className="text-neutral-300 hover:text-neutral-50 transition-colors">
                Guarantees
              </Link>
              <Link href="#faq" className="text-neutral-300 hover:text-neutral-50 transition-colors">
                FAQ
              </Link>
              <button onClick={scrollToSupport} className="text-neutral-300 hover:text-neutral-50 transition-colors">
                Support
              </button>
            </nav>

            <div className="hidden md:flex items-center space-x-4"></div>

            {/* Mobile menu button */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-neutral-800">
              <nav className="flex flex-col space-y-4 items-center">
                <Link href="#plans" className="text-neutral-300 hover:text-neutral-50 transition-colors">
                  Plans
                </Link>
                <Link href="#features" className="text-neutral-300 hover:text-neutral-50 transition-colors">
                  Features
                </Link>
                <Link href="#guarantees" className="text-neutral-300 hover:text-neutral-50 transition-colors">
                  Guarantees
                </Link>
                <Link href="#faq" className="text-neutral-300 hover:text-neutral-50 transition-colors">
                  FAQ
                </Link>
                <button onClick={scrollToSupport} className="text-neutral-300 hover:text-neutral-50 transition-colors">
                  Support
                </button>
                <div className="flex flex-col space-y-2 pt-4"></div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Seamless Access. <span className="text-purple-400">Unmatched Performance.</span>
            </h1>
            <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
              RavenRDP is your go-to for reliable RDP and VPS servers. No fluff — just speed, privacy, and quality. All
              services are auto-deployed in 5 minutes after payment.
            </p>

            {/* Region Selector */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              Available in all regions: Europe, North America, and South America
            </div>

            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-3"
              onClick={scrollToPlans}
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="plans" className="py-20 bg-neutral-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-xl text-neutral-300">All plans include unlimited bandwidth and dedicated IP</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`relative bg-neutral-800 border-neutral-700 hover:bg-neutral-750 hover:border-neutral-600 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 ease-in-out cursor-pointer ${plan.popular ? "ring-2 ring-purple-500 hover:ring-purple-400" : ""}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-neutral-50">{plan.name}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-purple-400">
                    {plan.price}
                    <span className="text-sm text-neutral-400"> USD</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-neutral-300">• {plan.cores}</div>
                  <div className="text-neutral-300">• {plan.ram}</div>
                  <div className="text-neutral-300">• {plan.storage}</div>
                  <div className="text-neutral-300">• {plan.bandwidth}</div>
                  <div className="text-neutral-300">• {plan.ip}</div>
                  <Badge variant="secondary" className="w-full justify-center">
                    {plan.available}
                  </Badge>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white transform hover:scale-105 transition-transform duration-200"
                    onClick={() => handlePurchase(plan)}
                  >
                    Purchase
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Essential Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Essential Features</h2>
            <p className="text-xl text-neutral-300">Everything you need for reliable server hosting</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-6 bg-neutral-800/50 rounded-lg border border-neutral-700"
              >
                <feature.icon className="h-8 w-8 text-purple-400 flex-shrink-0" />
                <span className="text-lg font-medium text-neutral-50">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Guarantees */}
      <section id="guarantees" className="py-20 bg-neutral-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Guarantees</h2>
            <p className="text-xl text-neutral-300">What makes RavenRDP different</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="text-center p-6 bg-neutral-800/50 rounded-lg border border-neutral-700">
                <guarantee.icon className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-neutral-50">{guarantee.title}</h3>
                <p className="text-neutral-300">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-neutral-300">Get answers to common questions</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-neutral-800/50 border border-neutral-700 rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left text-neutral-50 hover:text-purple-400">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-300 pb-4">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="support" className="bg-neutral-900 border-t border-neutral-800 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-8">
            <Link href="https://t.me/ravenrdp" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="text-white mb-6"
                style={{ backgroundColor: "#27A7E7" }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e90d4")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#27A7E7")}
              >
                Support
              </Button>
            </Link>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="text-center">
              <p className="text-neutral-300 mb-3 font-medium">We accept cryptocurrency payments:</p>
            </div>

            {/* Crypto Payment Options - Smaller Size */}
            <div className="flex flex-wrap justify-center gap-3">
              {cryptos.map((crypto, index) => (
                <div
                  key={crypto.name}
                  className={`${crypto.color} ${crypto.borderColor} border rounded-lg p-3 min-w-[80px] text-center transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <div className={`text-lg font-bold ${crypto.textColor}`}>{crypto.icon}</div>
                    <div className={`font-semibold text-sm ${crypto.textColor}`}>{crypto.name}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center text-xs text-neutral-500 mt-4">
              <p>Secure payments powered by Plisio • Fast & reliable cryptocurrency processing</p>
            </div>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-neutral-800">
            <p className="text-neutral-400">© 2025 RavenRDP. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Payment Modal */}
      <PaymentModal isOpen={paymentModalOpen} onClose={() => setPaymentModalOpen(false)} plan={selectedPlan} />
    </div>
  )
}
