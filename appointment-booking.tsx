"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  AlertCircle,
  CalendarIcon,
  CreditCard,
  Stethoscope,
  UserPlus,
  Zap,
  Star,
  Save,
  Loader2,
  CheckCircle,
} from "lucide-react"
import { useState, useEffect } from "react"

interface Service {
  id: string
  name: string
  price: number
  duration: number
  description: string
  icon: React.ReactNode
  included: string[]
}

interface TimeSlot {
  time: string
  available: boolean
}

interface BookingData {
  service: Service | null
  date: Date | null
  timeSlot: string
  reason: string
  symptoms: string
  address: string
  emergencyContact: string
  emergencyPhone: string
  specialInstructions: string
  saveAddress: boolean
}

const services: Service[] = [
  {
    id: "general",
    name: "General Consultation",
    price: 50,
    duration: 30,
    description: "Comprehensive health checkup and consultation",
    icon: <Stethoscope className="w-6 h-6" />,
    included: ["Physical examination", "Health assessment", "Treatment recommendations", "Prescription if needed"],
  },
  {
    id: "followup",
    name: "Follow-up Visit",
    price: 35,
    duration: 20,
    description: "Follow-up on previous treatment or condition",
    icon: <UserPlus className="w-6 h-6" />,
    included: ["Progress review", "Treatment adjustment", "Prescription refill", "Health monitoring"],
  },
  {
    id: "emergency",
    name: "Emergency Visit",
    price: 75,
    duration: 45,
    description: "Urgent medical attention for immediate concerns",
    icon: <Zap className="w-6 h-6" />,
    included: ["Immediate assessment", "Emergency treatment", "Urgent prescriptions", "Hospital referral if needed"],
  },
  {
    id: "specialist",
    name: "Specialist Consultation",
    price: 80,
    duration: 40,
    description: "Specialized medical consultation and examination",
    icon: <Star className="w-6 h-6" />,
    included: ["Specialized examination", "Expert diagnosis", "Treatment planning", "Specialist recommendations"],
  },
]

const timeSlots: TimeSlot[] = [
  { time: "9:00 AM", available: true },
  { time: "9:30 AM", available: false },
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "11:30 AM", available: true },
  { time: "2:00 PM", available: true },
  { time: "2:30 PM", available: true },
  { time: "3:00 PM", available: false },
  { time: "3:30 PM", available: true },
  { time: "4:00 PM", available: true },
  { time: "4:30 PM", available: true },
]

const reasonOptions = [
  "General checkup",
  "Follow-up appointment",
  "Specific symptoms",
  "Medication review",
  "Preventive care",
  "Emergency consultation",
  "Second opinion",
  "Other",
]

export default function Component() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [autoSaved, setAutoSaved] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const [bookingData, setBookingData] = useState<BookingData>({
    service: null,
    date: null,
    timeSlot: "",
    reason: "",
    symptoms: "",
    address: "123 Main St, San Francisco, CA 94102", // Pre-filled from profile
    emergencyContact: "",
    emergencyPhone: "",
    specialInstructions: "",
    saveAddress: false,
  })

  // Mock doctor data
  const doctor = {
    name: "Dr. Sarah Johnson",
    specialty: "Internal Medicine",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.9,
  }

  const steps = [
    { number: 1, title: "Service", description: "Choose your service" },
    { number: 2, title: "Date & Time", description: "Select appointment time" },
    { number: 3, title: "Details", description: "Provide information" },
    { number: 4, title: "Confirmation", description: "Review and confirm" },
  ]

  useEffect(() => {
    // Auto-save functionality
    const timer = setTimeout(() => {
      if (currentStep > 1) {
        setAutoSaved(true)
        setTimeout(() => setAutoSaved(false), 2000)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [bookingData, currentStep])

  const validateStep = (step: number) => {
    const newErrors: { [key: string]: string } = {}

    switch (step) {
      case 1:
        if (!bookingData.service) {
          newErrors.service = "Please select a service"
        }
        break
      case 2:
        if (!bookingData.date) {
          newErrors.date = "Please select a date"
        }
        if (!bookingData.timeSlot) {
          newErrors.timeSlot = "Please select a time slot"
        }
        break
      case 3:
        if (!bookingData.reason) {
          newErrors.reason = "Please select a reason for visit"
        }
        if (!bookingData.address.trim()) {
          newErrors.address = "Address is required"
        }
        if (!bookingData.emergencyContact.trim()) {
          newErrors.emergencyContact = "Emergency contact is required"
        }
        if (!bookingData.emergencyPhone.trim()) {
          newErrors.emergencyPhone = "Emergency contact phone is required"
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setLoading(true)
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
        setLoading(false)
      }, 500)
    }
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleServiceSelect = (service: Service) => {
    setBookingData((prev) => ({ ...prev, service }))
    setErrors((prev) => ({ ...prev, service: "" }))
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setBookingData((prev) => ({ ...prev, date }))
      setErrors((prev) => ({ ...prev, date: "" }))
    }
  }

  const handleTimeSlotSelect = (time: string) => {
    setBookingData((prev) => ({ ...prev, timeSlot: time }))
    setErrors((prev) => ({ ...prev, timeSlot: "" }))
  }

  const handleConfirmBooking = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert("Booking confirmed! You will receive a confirmation email shortly.")
    }, 2000)
  }

  const getQuickDateFilter = (filter: "today" | "tomorrow" | "week") => {
    const today = new Date()
    switch (filter) {
      case "today":
        return today
      case "tomorrow":
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        return tomorrow
      case "week":
        const nextWeek = new Date(today)
        nextWeek.setDate(nextWeek.getDate() + 7)
        return nextWeek
      default:
        return today
    }
  }

  const ProgressBar = () => (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                step.number < currentStep
                  ? "bg-green-600 text-white"
                  : step.number === currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.number < currentStep ? <Check className="w-5 h-5" /> : step.number}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-24 h-1 mx-4 transition-all duration-300 ${
                  step.number < currentStep ? "bg-green-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm">
        {steps.map((step) => (
          <div key={step.number} className="text-center">
            <p className="font-medium text-gray-900">{step.title}</p>
            <p className="text-gray-500">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  )

  const ServiceSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Service</h2>
        <p className="text-gray-600">Select the type of consultation you need</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card
            key={service.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              bookingData.service?.id === service.id ? "ring-2 ring-blue-600 border-blue-600" : "hover:border-blue-300"
            }`}
            onClick={() => handleServiceSelect(service)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 rounded-lg text-blue-600">{service.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
                {bookingData.service?.id === service.id && <CheckCircle className="w-6 h-6 text-green-600" />}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{service.duration} min</span>
                  </Badge>
                  <span className="text-2xl font-bold text-blue-600">${service.price}</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">What's included:</p>
                <ul className="space-y-1">
                  {service.included.map((item, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                      <Check className="w-3 h-3 text-green-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {errors.service && <p className="text-red-500 text-sm text-center">{errors.service}</p>}
    </div>
  )

  const DateTimeSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Date & Time</h2>
        <p className="text-gray-600">Choose your preferred appointment slot</p>
      </div>

      {/* Doctor Reminder */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
              <AvatarFallback>Dr</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
              <p className="text-sm text-gray-600">{doctor.specialty}</p>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">{doctor.rating}</span>
              </div>
            </div>
            {bookingData.service && (
              <div className="ml-auto text-right">
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-semibold">{bookingData.service.duration} minutes</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Select Date</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleDateSelect(getQuickDateFilter("today"))}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDateSelect(getQuickDateFilter("tomorrow"))}>
                Tomorrow
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDateSelect(getQuickDateFilter("week"))}>
                This Week
              </Button>
            </div>
          </div>

          <Calendar
            mode="single"
            selected={bookingData.date || undefined}
            onSelect={handleDateSelect}
            disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
            className="rounded-md border"
          />
          {errors.date && <p className="text-red-500 text-sm mt-2">{errors.date}</p>}
        </div>

        {/* Time Slots */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Times</h3>
          {bookingData.date ? (
            <div className="grid grid-cols-2 gap-3">
              {timeSlots.map((slot) => (
                <Button
                  key={slot.time}
                  variant={bookingData.timeSlot === slot.time ? "default" : "outline"}
                  disabled={!slot.available}
                  onClick={() => handleTimeSlotSelect(slot.time)}
                  className={`h-12 ${
                    bookingData.timeSlot === slot.time
                      ? "bg-blue-600 text-white"
                      : slot.available
                        ? "hover:border-blue-300"
                        : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {slot.time}
                </Button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <CalendarIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Please select a date first</p>
            </div>
          )}
          {errors.timeSlot && <p className="text-red-500 text-sm mt-2">{errors.timeSlot}</p>}
        </div>
      </div>

      {bookingData.date && bookingData.timeSlot && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">
                Selected: {bookingData.date.toLocaleDateString()} at {bookingData.timeSlot}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  const PatientDetails = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Patient Details</h2>
        <p className="text-gray-600">Provide information for your appointment</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Reason for Visit */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Reason for Visit *</Label>
            <Select
              value={bookingData.reason}
              onValueChange={(value) => {
                setBookingData((prev) => ({ ...prev, reason: value }))
                setErrors((prev) => ({ ...prev, reason: "" }))
              }}
            >
              <SelectTrigger className={errors.reason ? "border-red-500" : ""}>
                <SelectValue placeholder="Select reason for visit" />
              </SelectTrigger>
              <SelectContent>
                {reasonOptions.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
          </div>

          {/* Symptoms Description */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Symptoms Description</Label>
            <Textarea
              placeholder="Please describe your symptoms or concerns..."
              value={bookingData.symptoms}
              onChange={(e) => setBookingData((prev) => ({ ...prev, symptoms: e.target.value }))}
              className="min-h-[100px]"
            />
          </div>

          {/* Emergency Contact */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Emergency Contact *</Label>
              <Input
                placeholder="Contact name"
                value={bookingData.emergencyContact}
                onChange={(e) => {
                  setBookingData((prev) => ({ ...prev, emergencyContact: e.target.value }))
                  setErrors((prev) => ({ ...prev, emergencyContact: "" }))
                }}
                className={errors.emergencyContact ? "border-red-500" : ""}
              />
              {errors.emergencyContact && <p className="text-red-500 text-sm mt-1">{errors.emergencyContact}</p>}
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Emergency Phone *</Label>
              <Input
                placeholder="Phone number"
                value={bookingData.emergencyPhone}
                onChange={(e) => {
                  setBookingData((prev) => ({ ...prev, emergencyPhone: e.target.value }))
                  setErrors((prev) => ({ ...prev, emergencyPhone: "" }))
                }}
                className={errors.emergencyPhone ? "border-red-500" : ""}
              />
              {errors.emergencyPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyPhone}</p>}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Visit Address */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Visit Address *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Textarea
                placeholder="Enter your address"
                value={bookingData.address}
                onChange={(e) => {
                  setBookingData((prev) => ({ ...prev, address: e.target.value }))
                  setErrors((prev) => ({ ...prev, address: "" }))
                }}
                className={`pl-10 ${errors.address ? "border-red-500" : ""}`}
              />
            </div>
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}

            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id="saveAddress"
                checked={bookingData.saveAddress}
                onCheckedChange={(checked) => setBookingData((prev) => ({ ...prev, saveAddress: checked as boolean }))}
              />
              <Label htmlFor="saveAddress" className="text-sm text-gray-600 cursor-pointer">
                Save as new address
              </Label>
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Special Instructions</Label>
            <Textarea
              placeholder="Any special requests or instructions for the doctor..."
              value={bookingData.specialInstructions}
              onChange={(e) => setBookingData((prev) => ({ ...prev, specialInstructions: e.target.value }))}
              className="min-h-[100px]"
            />
          </div>

          {/* Address Map Placeholder */}
          <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Address validation with map</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const BookingConfirmation = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Confirm Your Booking</h2>
        <p className="text-gray-600">Review your appointment details</p>
      </div>

      {/* Appointment Summary */}
      <Card className="border-2 border-blue-200">
        <CardHeader className="bg-blue-50">
          <CardTitle className="flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5" />
            <span>Appointment Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {/* Doctor Info */}
          <div className="flex items-center space-x-4 pb-4 border-b">
            <Avatar className="w-16 h-16">
              <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
              <AvatarFallback>Dr</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.specialty}</p>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">{doctor.rating} rating</span>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Service</h4>
              <p className="text-gray-700">{bookingData.service?.name}</p>
              <p className="text-sm text-gray-500">{bookingData.service?.duration} minutes</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Date & Time</h4>
              <p className="text-gray-700">{bookingData.date?.toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">{bookingData.timeSlot}</p>
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Location</h4>
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-gray-400 mt-1" />
              <p className="text-gray-700">{bookingData.address}</p>
            </div>
          </div>

          {/* Reason */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Reason for Visit</h4>
            <p className="text-gray-700">{bookingData.reason}</p>
            {bookingData.symptoms && <p className="text-sm text-gray-600 mt-1">Symptoms: {bookingData.symptoms}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Cost Breakdown</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-700">Consultation Fee</span>
            <span className="font-medium">${bookingData.service?.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Travel Fee</span>
            <span className="font-medium">$25</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Platform Fee</span>
            <span className="font-medium">$5</span>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-blue-600">${(bookingData.service?.price || 0) + 25 + 5}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card className="bg-gray-50">
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
                    Free cancellation up to 24 hours before appointment. Cancellations within 24 hours may incur a $25
                    fee.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Auto-save indicator */}
        {autoSaved && (
          <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 z-50">
            <Save className="w-4 h-4" />
            <span className="text-sm">Progress saved</span>
          </div>
        )}

        <Card className="bg-white shadow-lg">
          <CardHeader className="pb-8">
            <ProgressBar />
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <div className="min-h-[600px]">
              {currentStep === 1 && <ServiceSelection />}
              {currentStep === 2 && <DateTimeSelection />}
              {currentStep === 3 && <PatientDetails />}
              {currentStep === 4 && <BookingConfirmation />}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>

              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleConfirmBooking}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Confirm Booking</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
