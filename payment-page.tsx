"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  Lock,
  CreditCard,
  Calendar,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Tag,
  Star,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react"
import { useState, useEffect } from "react"

interface PaymentMethod {
  id: string
  type: "card" | "paypal" | "apple" | "google" | "saved"
  name: string
  icon: React.ReactNode
  enabled: boolean
}

interface CardData {
  number: string
  expiry: string
  cvv: string
  name: string
  saveCard: boolean
}

interface BillingAddress {
  street: string
  city: string
  state: string
  country: string
  postalCode: string
  useProfileAddress: boolean
}

interface OrderSummary {
  doctor: {
    name: string
    specialty: string
    image: string
    rating: number
  }
  service: {
    name: string
    duration: number
    price: number
  }
  appointment: {
    date: string
    time: string
    address: string
  }
  fees: {
    consultation: number
    platform: number
    travel: number
    discount: number
  }
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    type: "card",
    name: "Credit/Debit Card",
    icon: <CreditCard className="w-5 h-5" />,
    enabled: true,
  },
  {
    id: "paypal",
    type: "paypal",
    name: "PayPal",
    icon: <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">P</div>,
    enabled: true,
  },
  {
    id: "apple",
    type: "apple",
    name: "Apple Pay",
    icon: <div className="w-5 h-5 bg-black rounded text-white text-xs flex items-center justify-center">🍎</div>,
    enabled: true,
  },
  {
    id: "google",
    type: "google",
    name: "Google Pay",
    icon: <div className="w-5 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center">G</div>,
    enabled: true,
  },
]

const savedCards = [
  { id: "1", last4: "4242", brand: "Visa", expiry: "12/25" },
  { id: "2", last4: "5555", brand: "MasterCard", expiry: "08/26" },
]

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
  "Sweden",
]

const mockOrder: OrderSummary = {
  doctor: {
    name: "Dr. Sarah Johnson",
    specialty: "Internal Medicine",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.9,
  },
  service: {
    name: "General Consultation",
    duration: 30,
    price: 150,
  },
  appointment: {
    date: "December 28, 2024",
    time: "2:30 PM",
    address: "123 Main St, San Francisco, CA 94102",
  },
  fees: {
    consultation: 150,
    platform: 5,
    travel: 25,
    discount: 0,
  },
}

export default function Component() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card")
  const [showBillingAddress, setShowBillingAddress] = useState(false)
  const [showCvv, setShowCvv] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [promoLoading, setPromoLoading] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState("")

  const [cardData, setCardData] = useState<CardData>({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
    saveCard: false,
  })

  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    useProfileAddress: false,
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [cardType, setCardType] = useState("")

  // Auto-detect card type
  useEffect(() => {
    const number = cardData.number.replace(/\s/g, "")
    if (number.startsWith("4")) {
      setCardType("visa")
    } else if (number.startsWith("5") || number.startsWith("2")) {
      setCardType("mastercard")
    } else if (number.startsWith("3")) {
      setCardType("amex")
    } else if (number.startsWith("6")) {
      setCardType("discover")
    } else {
      setCardType("")
    }
  }, [cardData.number])

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const validateCard = () => {
    const newErrors: { [key: string]: string } = {}

    if (!cardData.number || cardData.number.replace(/\s/g, "").length < 13) {
      newErrors.cardNumber = "Please enter a valid card number"
    }

    if (!cardData.expiry || cardData.expiry.length < 5) {
      newErrors.expiry = "Please enter a valid expiry date"
    }

    if (!cardData.cvv || cardData.cvv.length < 3) {
      newErrors.cvv = "Please enter a valid CVV"
    }

    if (!cardData.name.trim()) {
      newErrors.cardName = "Please enter the cardholder name"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setCardData((prev) => ({ ...prev, number: formatted }))
    if (errors.cardNumber) {
      setErrors((prev) => ({ ...prev, cardNumber: "" }))
    }
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value)
    setCardData((prev) => ({ ...prev, expiry: formatted }))
    if (errors.expiry) {
      setErrors((prev) => ({ ...prev, expiry: "" }))
    }
  }

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return

    setPromoLoading(true)
    setPromoError("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (promoCode.toUpperCase() === "SAVE10") {
      setPromoApplied(true)
      mockOrder.fees.discount = 15
    } else {
      setPromoError("Invalid promo code")
    }

    setPromoLoading(false)
  }

  const handlePayment = async () => {
    if (selectedPaymentMethod === "card" && !validateCard()) {
      return
    }

    setProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setProcessing(false)
    alert("Payment successful! Your appointment has been confirmed.")
  }

  const getTotalAmount = () => {
    return mockOrder.fees.consultation + mockOrder.fees.platform + mockOrder.fees.travel - mockOrder.fees.discount
  }

  const CardTypeIcon = ({ type }: { type: string }) => {
    const iconClass = "w-8 h-6 rounded border border-gray-300 flex items-center justify-center text-xs font-bold"

    switch (type) {
      case "visa":
        return <div className={`${iconClass} bg-blue-600 text-white`}>VISA</div>
      case "mastercard":
        return <div className={`${iconClass} bg-red-600 text-white`}>MC</div>
      case "amex":
        return <div className={`${iconClass} bg-green-600 text-white`}>AMEX</div>
      case "discover":
        return <div className={`${iconClass} bg-orange-600 text-white`}>DISC</div>
      default:
        return <div className={`${iconClass} bg-gray-200 text-gray-500`}>CARD</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Secure Payment</h1>
              <p className="text-gray-600">Complete your appointment booking</p>
            </div>
          </div>

          {/* Security Badges */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">256-bit SSL Encrypted</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
              <Lock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">PCI Compliant</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-50 border border-purple-200 rounded-lg px-3 py-2">
              <CheckCircle className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Money-back Guarantee</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Payment Method</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Saved Cards */}
                {savedCards.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Saved Payment Methods</Label>
                    <div className="space-y-2">
                      {savedCards.map((card) => (
                        <div
                          key={card.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedPaymentMethod === `saved-${card.id}`
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedPaymentMethod(`saved-${card.id}`)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <CardTypeIcon type={card.brand.toLowerCase()} />
                              <div>
                                <p className="font-medium">•••• •••• •••• {card.last4}</p>
                                <p className="text-sm text-gray-600">Expires {card.expiry}</p>
                              </div>
                            </div>
                            {selectedPaymentMethod === `saved-${card.id}` && (
                              <CheckCircle className="w-5 h-5 text-blue-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-4" />
                  </div>
                )}

                {/* Payment Methods */}
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <Button
                      key={method.id}
                      variant={selectedPaymentMethod === method.id ? "default" : "outline"}
                      className={`h-16 flex items-center justify-center space-x-2 ${
                        !method.enabled ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={() => method.enabled && setSelectedPaymentMethod(method.id)}
                      disabled={!method.enabled}
                    >
                      {method.icon}
                      <span className="font-medium">{method.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Card Payment Form */}
            {selectedPaymentMethod === "card" && (
              <Card>
                <CardHeader>
                  <CardTitle>Card Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Card Number */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Card Number</Label>
                    <div className="relative">
                      <Input
                        placeholder="1234 5678 9012 3456"
                        value={cardData.number}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                        className={`pr-12 ${errors.cardNumber ? "border-red-500" : ""}`}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <CardTypeIcon type={cardType} />
                      </div>
                    </div>
                    {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                  </div>

                  {/* Expiry and CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Expiry Date</Label>
                      <Input
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={handleExpiryChange}
                        maxLength={5}
                        className={errors.expiry ? "border-red-500" : ""}
                      />
                      {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">CVV</Label>
                      <div className="relative">
                        <Input
                          type={showCvv ? "text" : "password"}
                          placeholder="123"
                          value={cardData.cvv}
                          onChange={(e) => {
                            setCardData((prev) => ({ ...prev, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))
                            if (errors.cvv) setErrors((prev) => ({ ...prev, cvv: "" }))
                          }}
                          maxLength={4}
                          className={`pr-10 ${errors.cvv ? "border-red-500" : ""}`}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                          onClick={() => setShowCvv(!showCvv)}
                        >
                          {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                    </div>
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Cardholder Name</Label>
                    <Input
                      placeholder="John Doe"
                      value={cardData.name}
                      onChange={(e) => {
                        setCardData((prev) => ({ ...prev, name: e.target.value }))
                        if (errors.cardName) setErrors((prev) => ({ ...prev, cardName: "" }))
                      }}
                      className={errors.cardName ? "border-red-500" : ""}
                    />
                    {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                  </div>

                  {/* Save Card */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="saveCard"
                      checked={cardData.saveCard}
                      onCheckedChange={(checked) => setCardData((prev) => ({ ...prev, saveCard: checked as boolean }))}
                    />
                    <Label htmlFor="saveCard" className="text-sm cursor-pointer">
                      Save this card for future payments
                    </Label>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Alternative Payment Methods */}
            {selectedPaymentMethod !== "card" && !selectedPaymentMethod.startsWith("saved-") && (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      {paymentMethods.find((m) => m.id === selectedPaymentMethod)?.icon}
                    </div>
                    <h3 className="text-lg font-semibold">
                      {paymentMethods.find((m) => m.id === selectedPaymentMethod)?.name}
                    </h3>
                    <p className="text-gray-600">
                      You'll be redirected to {selectedPaymentMethod} to complete your payment securely.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Billing Address */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Billing Address</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBillingAddress(!showBillingAddress)}
                    className="flex items-center space-x-1"
                  >
                    <span>{showBillingAddress ? "Hide" : "Show"}</span>
                    {showBillingAddress ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              {showBillingAddress && (
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="useProfile"
                      checked={billingAddress.useProfileAddress}
                      onCheckedChange={(checked) =>
                        setBillingAddress((prev) => ({ ...prev, useProfileAddress: checked as boolean }))
                      }
                    />
                    <Label htmlFor="useProfile" className="text-sm cursor-pointer">
                      Use address from my profile
                    </Label>
                  </div>

                  {!billingAddress.useProfileAddress && (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Street Address</Label>
                        <Input
                          placeholder="123 Main Street"
                          value={billingAddress.street}
                          onChange={(e) => setBillingAddress((prev) => ({ ...prev, street: e.target.value }))}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium mb-2 block">City</Label>
                          <Input
                            placeholder="San Francisco"
                            value={billingAddress.city}
                            onChange={(e) => setBillingAddress((prev) => ({ ...prev, city: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium mb-2 block">State</Label>
                          <Input
                            placeholder="CA"
                            value={billingAddress.state}
                            onChange={(e) => setBillingAddress((prev) => ({ ...prev, state: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Country</Label>
                          <Select
                            value={billingAddress.country}
                            onValueChange={(value) => setBillingAddress((prev) => ({ ...prev, country: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Postal Code</Label>
                          <Input
                            placeholder="94102"
                            value={billingAddress.postalCode}
                            onChange={(e) => setBillingAddress((prev) => ({ ...prev, postalCode: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          </div>

          {/* Order Summary - Right Column */}
          <div className="space-y-6">
            {/* Appointment Details */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Appointment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Doctor Info */}
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={mockOrder.doctor.image || "/placeholder.svg"} alt={mockOrder.doctor.name} />
                    <AvatarFallback>Dr</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{mockOrder.doctor.name}</h3>
                    <p className="text-sm text-gray-600">{mockOrder.doctor.specialty}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">{mockOrder.doctor.rating}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Service Details */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">
                      {mockOrder.service.name} ({mockOrder.service.duration} min)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">
                      {mockOrder.appointment.date} at {mockOrder.appointment.time}
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="text-sm text-gray-700">{mockOrder.appointment.address}</span>
                  </div>
                </div>

                <Separator />

                {/* Cost Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Consultation Fee</span>
                    <span className="text-sm font-medium">${mockOrder.fees.consultation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Platform Fee</span>
                    <span className="text-sm font-medium">${mockOrder.fees.platform}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Travel Fee</span>
                    <span className="text-sm font-medium">${mockOrder.fees.travel}</span>
                  </div>
                  {mockOrder.fees.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="text-sm">Discount Applied</span>
                      <span className="text-sm font-medium">-${mockOrder.fees.discount}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-blue-600">${getTotalAmount()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Tag className="w-4 h-4" />
                  <span>Promo Code</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value.toUpperCase())
                      setPromoError("")
                    }}
                    disabled={promoApplied}
                    className={promoApplied ? "bg-green-50 border-green-300" : ""}
                  />
                  <Button
                    variant="outline"
                    onClick={handleApplyPromo}
                    disabled={promoLoading || promoApplied || !promoCode.trim()}
                  >
                    {promoLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apply"}
                  </Button>
                </div>

                {promoApplied && (
                  <div className="flex items-center space-x-2 text-green-600 bg-green-50 rounded-lg p-3">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Promo code applied successfully!</span>
                  </div>
                )}

                {promoError && (
                  <div className="flex items-center space-x-2 text-red-600 bg-red-50 rounded-lg p-3">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{promoError}</span>
                  </div>
                )}

                <div className="text-xs text-gray-500">
                  <p>Available codes: SAVE10 (for demo)</p>
                </div>
              </CardContent>
            </Card>

            {/* Security Info */}
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">Your payment is protected by 256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700">PCI DSS compliant payment processing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-700">100% money-back guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox id="terms" />
                  <div className="text-sm">
                    <Label htmlFor="terms" className="cursor-pointer">
                      I agree to the <button className="text-blue-600 hover:underline">Terms and Conditions</button> and{" "}
                      <button className="text-blue-600 hover:underline">Privacy Policy</button>
                    </Label>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-yellow-900">Cancellation Policy</p>
                      <p className="text-yellow-700 mt-1">
                        Free cancellation up to 24 hours before appointment. Cancellations within 24 hours may incur a
                        $25 fee.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Review</span>
                  </Button>

                  <Button
                    onClick={handlePayment}
                    disabled={processing}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 mr-2" />
                        Complete Payment ${getTotalAmount()}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
