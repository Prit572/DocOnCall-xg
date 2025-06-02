"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  Eye,
  EyeOff,
  Check,
  Shield,
  FileCheck,
  UserCheck,
  Star,
  Loader2,
  Chrome,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

interface FormData {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  address: string
  termsAccepted: boolean
}

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  password?: string
  confirmPassword?: string
  address?: string
  termsAccepted?: string
}

export default function Component() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    termsAccepted: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[a-z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25
    return Math.min(strength, 100)
  }

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(formData.password))
  }, [formData.password])

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors }

    switch (name) {
      case "fullName":
        if (!value.trim()) {
          newErrors.fullName = "Full name is required"
        } else if (value.trim().length < 2) {
          newErrors.fullName = "Name must be at least 2 characters"
        } else {
          delete newErrors.fullName
        }
        break

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value) {
          newErrors.email = "Email is required"
        } else if (!emailRegex.test(value)) {
          newErrors.email = "Please enter a valid email"
        } else {
          delete newErrors.email
        }
        break

      case "phone":
        const phoneRegex = /^\+?[\d\s\-$$$$]{10,}$/
        if (!value) {
          newErrors.phone = "Phone number is required"
        } else if (!phoneRegex.test(value)) {
          newErrors.phone = "Please enter a valid phone number"
        } else {
          delete newErrors.phone
        }
        break

      case "password":
        if (!value) {
          newErrors.password = "Password is required"
        } else if (value.length < 8) {
          newErrors.password = "Password must be at least 8 characters"
        } else {
          delete newErrors.password
        }
        break

      case "confirmPassword":
        if (!value) {
          newErrors.confirmPassword = "Please confirm your password"
        } else if (value !== formData.password) {
          newErrors.confirmPassword = "Passwords do not match"
        } else {
          delete newErrors.confirmPassword
        }
        break

      case "address":
        if (!value.trim()) {
          newErrors.address = "Address is required"
        } else {
          delete newErrors.address
        }
        break
    }

    setErrors(newErrors)
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    Object.keys(formData).forEach((key) => {
      if (key !== "termsAccepted") {
        validateField(key, formData[key as keyof FormData] as string)
      }
    })

    if (!formData.termsAccepted) {
      setErrors((prev) => ({ ...prev, termsAccepted: "You must accept the terms and conditions" }))
      return
    }

    // Check if there are any errors
    if (Object.keys(errors).length > 0) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    alert("Account created successfully!")
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return "bg-red-500"
    if (passwordStrength < 50) return "bg-orange-500"
    if (passwordStrength < 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return "Weak"
    if (passwordStrength < 50) return "Fair"
    if (passwordStrength < 75) return "Good"
    return "Strong"
  }

  const isFieldValid = (fieldName: string) => {
    return formData[fieldName as keyof FormData] && !errors[fieldName as keyof FormErrors]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-md border border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Create Your Account
            </h1>
            <p className="text-gray-600 mt-2">Join thousands who trust us with their health</p>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center mt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  1
                </div>
                <div className="w-16 h-1 bg-blue-600 rounded"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-semibold">
                  2
                </div>
                <div className="w-16 h-1 bg-gray-200 rounded"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-semibold">
                  3
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Personal Information</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="relative">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder=" "
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    onFocus={() => setFocusedField("fullName")}
                    onBlur={() => setFocusedField(null)}
                    className={`pl-12 pr-12 h-12 transition-all duration-300 ${
                      errors.fullName
                        ? "border-red-500 focus:border-red-500"
                        : isFieldValid("fullName")
                          ? "border-green-500 focus:border-green-500"
                          : "border-gray-300 focus:border-blue-500"
                    }`}
                  />
                  <Label
                    className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                      focusedField === "fullName" || formData.fullName
                        ? "top-2 text-xs text-blue-600"
                        : "top-1/2 transform -translate-y-1/2 text-gray-500"
                    }`}
                  >
                    Full Name
                  </Label>
                  {isFieldValid("fullName") && (
                    <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.fullName && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div className="relative">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={`pl-12 pr-12 h-12 transition-all duration-300 ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : isFieldValid("email")
                          ? "border-green-500 focus:border-green-500"
                          : "border-gray-300 focus:border-blue-500"
                    }`}
                  />
                  <Label
                    className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                      focusedField === "email" || formData.email
                        ? "top-2 text-xs text-blue-600"
                        : "top-1/2 transform -translate-y-1/2 text-gray-500"
                    }`}
                  >
                    Email Address
                  </Label>
                  {isFieldValid("email") && (
                    <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="relative">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="tel"
                    placeholder=" "
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    className={`pl-12 pr-12 h-12 transition-all duration-300 ${
                      errors.phone
                        ? "border-red-500 focus:border-red-500"
                        : isFieldValid("phone")
                          ? "border-green-500 focus:border-green-500"
                          : "border-gray-300 focus:border-blue-500"
                    }`}
                  />
                  <Label
                    className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                      focusedField === "phone" || formData.phone
                        ? "top-2 text-xs text-blue-600"
                        : "top-1/2 transform -translate-y-1/2 text-gray-500"
                    }`}
                  >
                    Phone Number
                  </Label>
                  {isFieldValid("phone") && (
                    <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.phone}</p>}
              </div>

              {/* Password */}
              <div className="relative">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder=" "
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className={`pl-12 pr-12 h-12 transition-all duration-300 ${
                      errors.password
                        ? "border-red-500 focus:border-red-500"
                        : isFieldValid("password")
                          ? "border-green-500 focus:border-green-500"
                          : "border-gray-300 focus:border-blue-500"
                    }`}
                  />
                  <Label
                    className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                      focusedField === "password" || formData.password
                        ? "top-2 text-xs text-blue-600"
                        : "top-1/2 transform -translate-y-1/2 text-gray-500"
                    }`}
                  >
                    Password
                  </Label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Password strength:</span>
                      <span
                        className={`font-medium ${passwordStrength >= 75 ? "text-green-600" : passwordStrength >= 50 ? "text-yellow-600" : "text-red-600"}`}
                      >
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${passwordStrength}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                {errors.password && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder=" "
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField(null)}
                    className={`pl-12 pr-12 h-12 transition-all duration-300 ${
                      errors.confirmPassword
                        ? "border-red-500 focus:border-red-500"
                        : isFieldValid("confirmPassword")
                          ? "border-green-500 focus:border-green-500"
                          : "border-gray-300 focus:border-blue-500"
                    }`}
                  />
                  <Label
                    className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                      focusedField === "confirmPassword" || formData.confirmPassword
                        ? "top-2 text-xs text-blue-600"
                        : "top-1/2 transform -translate-y-1/2 text-gray-500"
                    }`}
                  >
                    Confirm Password
                  </Label>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Address */}
              <div className="relative">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder=" "
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    onFocus={() => setFocusedField("address")}
                    onBlur={() => setFocusedField(null)}
                    className={`pl-12 pr-12 h-12 transition-all duration-300 ${
                      errors.address
                        ? "border-red-500 focus:border-red-500"
                        : isFieldValid("address")
                          ? "border-green-500 focus:border-green-500"
                          : "border-gray-300 focus:border-blue-500"
                    }`}
                  />
                  <Label
                    className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                      focusedField === "address" || formData.address
                        ? "top-2 text-xs text-blue-600"
                        : "top-1/2 transform -translate-y-1/2 text-gray-500"
                    }`}
                  >
                    Home Address
                  </Label>
                  {isFieldValid("address") && (
                    <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.address && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.address}</p>}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => {
                    setFormData((prev) => ({ ...prev, termsAccepted: checked as boolean }))
                    if (checked) {
                      setErrors((prev) => ({ ...prev, termsAccepted: undefined }))
                    }
                  }}
                  className="mt-1"
                />
                <div className="text-sm">
                  <Label htmlFor="terms" className="text-gray-700 cursor-pointer">
                    I agree to the{" "}
                    <Dialog>
                      <DialogTrigger asChild>
                        <button type="button" className="text-blue-600 hover:underline">
                          Terms and Conditions
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Terms and Conditions</DialogTitle>
                          <DialogDescription>Please read our terms and conditions carefully.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 text-sm">
                          <p>By creating an account with DocHome, you agree to the following terms and conditions:</p>
                          <h4 className="font-semibold">1. Privacy and Data Protection</h4>
                          <p>
                            We are committed to protecting your personal health information in accordance with HIPAA
                            regulations.
                          </p>
                          <h4 className="font-semibold">2. Medical Services</h4>
                          <p>
                            Our platform connects you with licensed healthcare professionals for home visits and
                            consultations.
                          </p>
                          <h4 className="font-semibold">3. User Responsibilities</h4>
                          <p>
                            You are responsible for providing accurate medical information and following prescribed
                            treatments.
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>{" "}
                    and{" "}
                    <Link href="#" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                  {errors.termsAccepted && <p className="text-red-500 text-xs mt-1">{errors.termsAccepted}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              {/* Social Login */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 border-2 hover:bg-gray-50 transition-all duration-300"
                >
                  <Chrome className="w-5 h-5 mr-2" />
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 border-2 hover:bg-gray-50 transition-all duration-300"
                >
                  <div className="w-5 h-5 mr-2 bg-blue-600 rounded"></div>
                  Facebook
                </Button>
              </div>

              {/* Sign In Link */}
              <div className="text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link href="#" className="text-blue-600 hover:underline font-semibold">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-white rounded-full"></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 border border-white rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          {/* Medical Illustration */}
          <div className="mb-12">
            <Image
              src="/placeholder.svg?height=400&width=350"
              alt="Healthcare professional"
              width={350}
              height={400}
              className="rounded-2xl shadow-2xl"
            />
          </div>

          {/* Trust Indicators */}
          <div className="space-y-6 mb-12">
            <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-md rounded-lg p-4">
              <Shield className="w-8 h-8 text-green-300" />
              <div>
                <h3 className="font-semibold">Secure Registration</h3>
                <p className="text-sm text-blue-100">Your data is encrypted and protected</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-md rounded-lg p-4">
              <FileCheck className="w-8 h-8 text-green-300" />
              <div>
                <h3 className="font-semibold">HIPAA Compliant</h3>
                <p className="text-sm text-blue-100">Meeting healthcare privacy standards</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-md rounded-lg p-4">
              <UserCheck className="w-8 h-8 text-green-300" />
              <div>
                <h3 className="font-semibold">Verified Doctors</h3>
                <p className="text-sm text-blue-100">Licensed healthcare professionals</p>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <Card className="bg-white/20 backdrop-blur-md border border-white/30 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg mb-4 leading-relaxed">
                "DocHome made it incredibly easy to get the medical care I needed. The registration was simple and the
                doctors are amazing!"
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Patient"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white/30"
                />
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-blue-100">Verified Patient</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
