"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Cross,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Shield,
  Key,
  Chrome,
  CheckCircle,
  AlertCircle,
  UserIcon,
  Stethoscope,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

interface FormErrors {
  email?: string
  password?: string
  general?: string
}

export default function Component() {
  const [activeRole, setActiveRole] = useState<"patient" | "doctor">("patient")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random success/failure for demo
          if (Math.random() > 0.3) {
            resolve("success")
          } else {
            reject(new Error("Invalid credentials"))
          }
        }, 2000)
      })

      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        // Redirect to dashboard
        alert(`Welcome back! Redirecting to ${activeRole} dashboard...`)
      }, 2000)
    } catch (error) {
      setErrors({ general: "Invalid email or password. Please try again." })
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof LoginForm, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear field-specific errors when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSocialLogin = (provider: string) => {
    alert(`${provider} login integration would be implemented here`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-blue-300 rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-teal-300 rounded-full"></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 border border-blue-300 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 border border-teal-300 rounded-full"></div>
      </div>

      {/* Success/Error Messages */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Login successful! Redirecting...</span>
          </div>
        </div>
      )}

      {showError && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300">
          <div className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <span>{errors.general || "Please check your input and try again"}</span>
          </div>
        </div>
      )}

      <div className="flex min-h-screen">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <Card className="w-full max-w-md bg-white/80 backdrop-blur-md border border-white/20 shadow-2xl">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cross className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-gray-600 mt-2">Sign in to your healthcare account</p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Role Selector */}
              <Tabs value={activeRole} onValueChange={(value) => setActiveRole(value as "patient" | "doctor")}>
                <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                  <TabsTrigger
                    value="patient"
                    className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:text-blue-600"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>Patient</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="doctor"
                    className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:text-blue-600"
                  >
                    <Stethoscope className="w-4 h-4" />
                    <span>Doctor</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="patient" className="mt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
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
                          className={`pl-12 h-12 transition-all duration-300 ${
                            errors.email
                              ? "border-red-500 focus:border-red-500"
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
                      </div>
                      {errors.email && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.email}</p>}
                    </div>

                    {/* Password Field */}
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
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.password}</p>}
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={formData.rememberMe}
                          onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                        />
                        <Label htmlFor="remember" className="text-sm text-gray-700 cursor-pointer">
                          Remember me
                        </Label>
                      </div>
                      <Link
                        href="#"
                        className="text-sm text-blue-600 hover:text-blue-700 relative group transition-colors"
                      >
                        Forgot password?
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                      </Link>
                    </div>

                    {/* Sign In Button */}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-70"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>

                    {/* Social Login Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                      </div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialLogin("Google")}
                        className="h-12 border-2 hover:bg-gray-50 transition-all duration-300"
                      >
                        <Chrome className="w-5 h-5 mr-2" />
                        Google
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialLogin("Facebook")}
                        className="h-12 border-2 hover:bg-gray-50 transition-all duration-300"
                      >
                        <div className="w-5 h-5 mr-2 bg-blue-600 rounded"></div>
                        Facebook
                      </Button>
                    </div>

                    {/* Registration Link */}
                    <div className="text-center">
                      <p className="text-gray-600">
                        New patient?{" "}
                        <Link href="#" className="text-blue-600 hover:underline font-semibold">
                          Sign up for free
                        </Link>
                      </p>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="doctor" className="mt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
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
                          className={`pl-12 h-12 transition-all duration-300 ${
                            errors.email
                              ? "border-red-500 focus:border-red-500"
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
                          Professional Email
                        </Label>
                      </div>
                      {errors.email && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.email}</p>}
                    </div>

                    {/* Password Field */}
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
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.password}</p>}
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember-doctor"
                          checked={formData.rememberMe}
                          onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                        />
                        <Label htmlFor="remember-doctor" className="text-sm text-gray-700 cursor-pointer">
                          Remember me
                        </Label>
                      </div>
                      <Link
                        href="#"
                        className="text-sm text-blue-600 hover:text-blue-700 relative group transition-colors"
                      >
                        Forgot password?
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                      </Link>
                    </div>

                    {/* Sign In Button */}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-70"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Access Dashboard"
                      )}
                    </Button>

                    {/* Social Login Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                      </div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialLogin("Google")}
                        className="h-12 border-2 hover:bg-gray-50 transition-all duration-300"
                      >
                        <Chrome className="w-5 h-5 mr-2" />
                        Google
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialLogin("Facebook")}
                        className="h-12 border-2 hover:bg-gray-50 transition-all duration-300"
                      >
                        <div className="w-5 h-5 mr-2 bg-blue-600 rounded"></div>
                        Facebook
                      </Button>
                    </div>

                    {/* Registration Link */}
                    <div className="text-center">
                      <p className="text-gray-600">
                        New doctor?{" "}
                        <Link href="#" className="text-blue-600 hover:underline font-semibold">
                          Join our network
                        </Link>
                      </p>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>

              {/* Security Badges */}
              <div className="flex justify-center space-x-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Secure Login</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <Key className="w-4 h-4 text-green-600" />
                  <span>256-bit Encryption</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Healthcare Visual */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-teal-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 border border-white rounded-full"></div>
            <div className="absolute top-40 right-32 w-24 h-24 border border-white rounded-full"></div>
            <div className="absolute bottom-32 left-32 w-40 h-40 border border-white rounded-full"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
            {/* Healthcare Illustration */}
            <div className="mb-12">
              <Image
                src="/placeholder.svg?height=400&width=350"
                alt="Healthcare professionals"
                width={350}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>

            {/* Trust Indicators */}
            <div className="space-y-6 text-center">
              <h2 className="text-3xl font-bold mb-4">Trusted by Healthcare Professionals</h2>
              <p className="text-xl text-blue-100 mb-8">
                Secure access to your healthcare platform with enterprise-grade security
              </p>

              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-md rounded-lg p-4">
                  <Shield className="w-8 h-8 text-green-300" />
                  <div className="text-left">
                    <h3 className="font-semibold">HIPAA Compliant</h3>
                    <p className="text-sm text-blue-100">Your data is protected and secure</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-md rounded-lg p-4">
                  <CheckCircle className="w-8 h-8 text-green-300" />
                  <div className="text-left">
                    <h3 className="font-semibold">Verified Platform</h3>
                    <p className="text-sm text-blue-100">Trusted by thousands of users</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-md rounded-lg p-4">
                  <Key className="w-8 h-8 text-green-300" />
                  <div className="text-left">
                    <h3 className="font-semibold">End-to-End Encryption</h3>
                    <p className="text-sm text-blue-100">Military-grade security standards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
