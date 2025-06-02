"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  AlertCircle,
  RefreshCw,
  CreditCard,
  Phone,
  MessageCircle,
  Mail,
  HelpCircle,
  Clock,
  Calendar,
  Star,
  ChevronRight,
  Bookmark,
  ArrowLeft,
  CheckCircle,
  Shield,
  Headphones,
} from "lucide-react"
import { useState, useEffect } from "react"

interface AppointmentDetails {
  doctor: {
    name: string
    specialty: string
    image: string
    rating: number
  }
  service: {
    name: string
    duration: number
  }
  appointment: {
    date: string
    time: string
  }
  totalAmount: number
}

interface ChecklistItem {
  id: string
  text: string
  checked: boolean
}

const mockAppointment: AppointmentDetails = {
  doctor: {
    name: "Dr. Sarah Johnson",
    specialty: "Internal Medicine",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.9,
  },
  service: {
    name: "General Consultation",
    duration: 30,
  },
  appointment: {
    date: "December 28, 2024",
    time: "2:30 PM",
  },
  totalAmount: 180,
}

const initialChecklist: ChecklistItem[] = [
  { id: "card-details", text: "Check your card details are correct", checked: false },
  { id: "sufficient-funds", text: "Ensure sufficient funds are available", checked: false },
  { id: "billing-address", text: "Verify billing address matches your card", checked: false },
  { id: "expiry-date", text: "Check card expiry date is valid", checked: false },
  { id: "cvv-code", text: "Confirm CVV/security code is correct", checked: false },
]

export default function Component() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist)
  const [timeRemaining, setTimeRemaining] = useState(15 * 60) // 15 minutes in seconds
  const [supportOnline, setSupportOnline] = useState(true)
  const [retryAttempts, setRetryAttempts] = useState(0)

  // Error message - could be dynamic based on actual error
  const errorMessage = "Your card was declined. Please check your payment details and try again."

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleChecklistToggle = (id: string) => {
    setChecklist((prev) => prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }

  const handleTryAgain = () => {
    setRetryAttempts((prev) => prev + 1)
    // Simulate going back to payment page
    alert("Redirecting to payment page...")
  }

  const handleDifferentPayment = () => {
    alert("Redirecting to payment methods...")
  }

  const handleContactSupport = () => {
    alert("Opening support chat...")
  }

  const handleSaveForLater = () => {
    alert("Appointment saved to your account!")
  }

  const completedChecks = checklist.filter((item) => item.checked).length
  const allChecksCompleted = completedChecks === checklist.length

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Could Not Be Processed</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't worry - this happens sometimes. Let's get this sorted out quickly so you can secure your appointment.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Error Details */}
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-1">What happened?</h3>
                    <p className="text-orange-800">{errorMessage}</p>
                    {retryAttempts > 0 && (
                      <p className="text-sm text-orange-700 mt-2">
                        Retry attempt #{retryAttempts} - If this continues, please try a different payment method.
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Problem Diagnosis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span>Quick Troubleshooting</span>
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Check these common issues before trying again ({completedChecks}/{checklist.length} completed)
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {checklist.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={item.id}
                      checked={item.checked}
                      onCheckedChange={() => handleChecklistToggle(item.id)}
                    />
                    <label
                      htmlFor={item.id}
                      className={`text-sm cursor-pointer ${item.checked ? "text-green-700 line-through" : "text-gray-700"}`}
                    >
                      {item.text}
                    </label>
                  </div>
                ))}

                {allChecksCompleted && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                    <div className="flex items-center space-x-2 text-green-800">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Great! You've checked everything. Ready to try again?</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Solution Options */}
            <Card>
              <CardHeader>
                <CardTitle>What would you like to do?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Button
                    onClick={handleTryAgain}
                    className="h-16 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    <span className="font-medium">Try Again</span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleDifferentPayment}
                    className="h-16 flex items-center justify-center space-x-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="font-medium">Different Payment Method</span>
                  </Button>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-12"
                    onClick={() => alert("Updating payment details...")}
                  >
                    <CreditCard className="w-4 h-4 mr-3" />
                    <span>Update Payment Details</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full justify-start h-12"
                    onClick={() => alert("Choosing different time...")}
                  >
                    <Calendar className="w-4 h-4 mr-3" />
                    <span>Choose Different Time Slot</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </Button>

                  <Button variant="ghost" className="w-full justify-start h-12" onClick={handleSaveForLater}>
                    <Bookmark className="w-4 h-4 mr-3" />
                    <span>Save Appointment for Later</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Bank Contact Info */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Contact Your Bank</h3>
                    <p className="text-blue-800 text-sm">
                      If the issue persists, your bank may have declined the transaction for security reasons. Contact
                      them to authorize the payment.
                    </p>
                    <p className="text-blue-700 text-xs mt-2">The phone number is usually on the back of your card.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Back Navigation */}
            <div className="flex justify-start">
              <Button variant="ghost" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Appointment Details</span>
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Appointment Reminder */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-800">
                  <Clock className="w-5 h-5" />
                  <span>Slot Reserved</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-800">{formatTime(timeRemaining)}</div>
                  <p className="text-sm text-green-700">remaining to complete booking</p>
                </div>

                <Separator />

                {/* Doctor Info */}
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={mockAppointment.doctor.image || "/placeholder.svg"}
                      alt={mockAppointment.doctor.name}
                    />
                    <AvatarFallback>Dr</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{mockAppointment.doctor.name}</h3>
                    <p className="text-sm text-gray-600">{mockAppointment.doctor.specialty}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">{mockAppointment.doctor.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{mockAppointment.service.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{mockAppointment.service.duration} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{mockAppointment.appointment.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{mockAppointment.appointment.time}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                    <span>Total:</span>
                    <span className="text-blue-600">${mockAppointment.totalAmount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Headphones className="w-5 h-5" />
                  <span>Need Help?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Live Chat */}
                <Button variant="outline" className="w-full justify-start h-12" onClick={handleContactSupport}>
                  <MessageCircle className="w-4 h-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Live Chat</div>
                    <div className="text-xs text-gray-500">
                      {supportOnline ? "Available now" : "Offline - Email us"}
                    </div>
                  </div>
                  {supportOnline && (
                    <Badge variant="secondary" className="ml-auto bg-green-100 text-green-800">
                      Online
                    </Badge>
                  )}
                </Button>

                {/* Phone Support */}
                <Button variant="outline" className="w-full justify-start h-12">
                  <Phone className="w-4 h-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Call Support</div>
                    <div className="text-xs text-gray-500">1-800-DOC-HELP</div>
                  </div>
                </Button>

                {/* Email Support */}
                <Button variant="outline" className="w-full justify-start h-12">
                  <Mail className="w-4 h-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Email Support</div>
                    <div className="text-xs text-gray-500">support@dochome.com</div>
                  </div>
                </Button>

                {/* FAQ */}
                <Button variant="outline" className="w-full justify-start h-12">
                  <HelpCircle className="w-4 h-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Payment FAQ</div>
                    <div className="text-xs text-gray-500">Common payment issues</div>
                  </div>
                </Button>

                <Separator />

                {/* Security Assurance */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-900">Your data is secure</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    We use bank-level encryption and never store your payment details.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800">💡 Quick Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-yellow-800">
                <p>• Try using a different browser or device</p>
                <p>• Disable browser extensions temporarily</p>
                <p>• Check if your bank sent you a security alert</p>
                <p>• Ensure your internet connection is stable</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
