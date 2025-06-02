"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  UserIcon as UserMd,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Check,
  ChevronLeft,
  ChevronRight,
  Upload,
  FileText,
  ImageIcon,
  DollarSign,
  Loader2,
  CheckCircle,
  AlertCircle,
  Save,
} from "lucide-react"
import { useState, useCallback, useRef } from "react"

interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

interface ProfessionalDetails {
  specialties: string[]
  licenseNumber: string
  experience: number
  qualifications: string
  consultationFee: string
  availability: { [key: string]: string[] }
}

interface VerificationDocs {
  medicalLicense: File | null
  medicalDegree: File | null
  headshot: File | null
}

interface FormData {
  personal: PersonalInfo
  professional: ProfessionalDetails
  verification: VerificationDocs
}

interface FormErrors {
  personal: Partial<PersonalInfo>
  professional: Partial<ProfessionalDetails>
  verification: Partial<VerificationDocs>
}

const specialties = [
  "General Practice",
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "Orthopedics",
  "Neurology",
  "Psychiatry",
  "Gynecology",
  "Internal Medicine",
  "Emergency Medicine",
  "Radiology",
  "Anesthesiology",
]

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
]

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function Component() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [autoSaved, setAutoSaved] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})

  const [formData, setFormData] = useState<FormData>({
    personal: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    professional: {
      specialties: [],
      licenseNumber: "",
      experience: 1,
      qualifications: "",
      consultationFee: "",
      availability: {},
    },
    verification: {
      medicalLicense: null,
      medicalDegree: null,
      headshot: null,
    },
  })

  const [errors, setErrors] = useState<FormErrors>({
    personal: {},
    professional: {},
    verification: {},
  })

  const fileInputRefs = {
    medicalLicense: useRef<HTMLInputElement>(null),
    medicalDegree: useRef<HTMLInputElement>(null),
    headshot: useRef<HTMLInputElement>(null),
  }

  const validatePersonalInfo = () => {
    const newErrors: Partial<PersonalInfo> = {}
    const { personal } = formData

    if (!personal.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!personal.email) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email)) newErrors.email = "Invalid email format"
    if (!personal.phone) newErrors.phone = "Phone number is required"
    if (!personal.password) newErrors.password = "Password is required"
    else if (personal.password.length < 8) newErrors.password = "Password must be at least 8 characters"
    if (personal.password !== personal.confirmPassword) newErrors.confirmPassword = "Passwords do not match"

    setErrors((prev) => ({ ...prev, personal: newErrors }))
    return Object.keys(newErrors).length === 0
  }

  const validateProfessionalDetails = () => {
    const newErrors: Partial<ProfessionalDetails> = {}
    const { professional } = formData

    if (professional.specialties.length === 0) newErrors.specialties = "At least one specialty is required"
    if (!professional.licenseNumber.trim()) newErrors.licenseNumber = "Medical license number is required"
    if (!professional.qualifications.trim()) newErrors.qualifications = "Qualifications are required"
    if (!professional.consultationFee) newErrors.consultationFee = "Consultation fee is required"

    setErrors((prev) => ({ ...prev, professional: newErrors }))
    return Object.keys(newErrors).length === 0
  }

  const validateVerification = () => {
    const newErrors: Partial<VerificationDocs> = {}
    const { verification } = formData

    if (!verification.medicalLicense) newErrors.medicalLicense = "Medical license document is required"
    if (!verification.medicalDegree) newErrors.medicalDegree = "Medical degree certificate is required"
    if (!verification.headshot) newErrors.headshot = "Professional headshot is required"

    setErrors((prev) => ({ ...prev, verification: newErrors }))
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    let isValid = false

    switch (currentStep) {
      case 1:
        isValid = validatePersonalInfo()
        break
      case 2:
        isValid = validateProfessionalDetails()
        break
      case 3:
        isValid = validateVerification()
        break
    }

    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1)
      triggerAutoSave()
    } else if (isValid && currentStep === 3) {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const triggerAutoSave = () => {
    setAutoSaved(true)
    setTimeout(() => setAutoSaved(false), 2000)
  }

  const handleFileUpload = useCallback((field: keyof VerificationDocs, file: File) => {
    setFormData((prev) => ({
      ...prev,
      verification: { ...prev.verification, [field]: file },
    }))

    // Simulate upload progress
    setUploadProgress((prev) => ({ ...prev, [field]: 0 }))
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = (prev[field] || 0) + 10
        if (newProgress >= 100) {
          clearInterval(interval)
          return { ...prev, [field]: 100 }
        }
        return { ...prev, [field]: newProgress }
      })
    }, 100)
  }, [])

  const handleDrop = useCallback(
    (field: keyof VerificationDocs) => (e: React.DragEvent) => {
      e.preventDefault()
      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        handleFileUpload(field, files[0])
      }
    },
    [handleFileUpload],
  )

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsLoading(false)
    alert("Registration submitted successfully! We'll review your application within 24-48 hours.")
  }

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setFormData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }))
    triggerAutoSave()
  }

  const updateProfessionalDetails = (field: keyof ProfessionalDetails, value: any) => {
    setFormData((prev) => ({
      ...prev,
      professional: { ...prev.professional, [field]: value },
    }))
    triggerAutoSave()
  }

  const toggleSpecialty = (specialty: string) => {
    const current = formData.professional.specialties
    const updated = current.includes(specialty) ? current.filter((s) => s !== specialty) : [...current, specialty]
    updateProfessionalDetails("specialties", updated)
  }

  const toggleAvailability = (day: string, time: string) => {
    const current = formData.professional.availability[day] || []
    const updated = current.includes(time) ? current.filter((t) => t !== time) : [...current, time]
    updateProfessionalDetails("availability", { ...formData.professional.availability, [day]: updated })
  }

  const renderProgressBar = () => (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                step < currentStep
                  ? "bg-green-600 text-white"
                  : step === currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {step < currentStep ? <Check className="w-5 h-5" /> : step}
            </div>
            {step < 3 && (
              <div
                className={`w-24 h-1 mx-4 transition-all duration-300 ${
                  step < currentStep ? "bg-green-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Personal Info</span>
        <span>Professional Details</span>
        <span>Verification</span>
      </div>
    </div>
  )

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Our Network</h2>
        <p className="text-gray-600">of Healthcare Professionals</p>
      </div>

      <div className="grid gap-6">
        <div className="relative">
          <UserMd className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Full Name"
            value={formData.personal.fullName}
            onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
            className="pl-12 h-12"
          />
          {errors.personal.fullName && <p className="text-red-500 text-sm mt-1">{errors.personal.fullName}</p>}
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="email"
            placeholder="Email Address"
            value={formData.personal.email}
            onChange={(e) => updatePersonalInfo("email", e.target.value)}
            className="pl-12 h-12"
          />
          {errors.personal.email && <p className="text-red-500 text-sm mt-1">{errors.personal.email}</p>}
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="tel"
            placeholder="Phone Number"
            value={formData.personal.phone}
            onChange={(e) => updatePersonalInfo("phone", e.target.value)}
            className="pl-12 h-12"
          />
          {errors.personal.phone && <p className="text-red-500 text-sm mt-1">{errors.personal.phone}</p>}
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.personal.password}
            onChange={(e) => updatePersonalInfo("password", e.target.value)}
            className="pl-12 pr-12 h-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
          {errors.personal.password && <p className="text-red-500 text-sm mt-1">{errors.personal.password}</p>}
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={formData.personal.confirmPassword}
            onChange={(e) => updatePersonalInfo("confirmPassword", e.target.value)}
            className="pl-12 pr-12 h-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
          {errors.personal.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.personal.confirmPassword}</p>
          )}
        </div>
      </div>
    </div>
  )

  const renderProfessionalDetails = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Professional Details</h2>
        <p className="text-gray-600">Tell us about your medical expertise</p>
      </div>

      <div className="space-y-6">
        {/* Specialties */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Medical Specialties</Label>
          <div className="grid grid-cols-2 gap-3">
            {specialties.map((specialty) => (
              <div key={specialty} className="flex items-center space-x-2">
                <Checkbox
                  id={specialty}
                  checked={formData.professional.specialties.includes(specialty)}
                  onCheckedChange={() => toggleSpecialty(specialty)}
                />
                <Label htmlFor={specialty} className="text-sm cursor-pointer">
                  {specialty}
                </Label>
              </div>
            ))}
          </div>
          {errors.professional.specialties && (
            <p className="text-red-500 text-sm mt-1">{errors.professional.specialties}</p>
          )}
        </div>

        {/* License Number */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Medical License Number</Label>
          <Input
            placeholder="Enter your medical license number"
            value={formData.professional.licenseNumber}
            onChange={(e) => updateProfessionalDetails("licenseNumber", e.target.value)}
            className="h-12"
          />
          {errors.professional.licenseNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.professional.licenseNumber}</p>
          )}
        </div>

        {/* Experience */}
        <div>
          <Label className="text-sm font-medium mb-2 block">
            Years of Experience: {formData.professional.experience} years
          </Label>
          <Slider
            value={[formData.professional.experience]}
            onValueChange={(value) => updateProfessionalDetails("experience", value[0])}
            max={50}
            min={1}
            step={1}
            className="w-full"
          />
        </div>

        {/* Qualifications */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Education & Qualifications</Label>
          <Textarea
            placeholder="Describe your medical education, certifications, and qualifications..."
            value={formData.professional.qualifications}
            onChange={(e) => updateProfessionalDetails("qualifications", e.target.value)}
            className="min-h-[100px]"
          />
          {errors.professional.qualifications && (
            <p className="text-red-500 text-sm mt-1">{errors.professional.qualifications}</p>
          )}
        </div>

        {/* Consultation Fee */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Consultation Fee (USD)</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="number"
              placeholder="150"
              value={formData.professional.consultationFee}
              onChange={(e) => updateProfessionalDetails("consultationFee", e.target.value)}
              className="pl-12 h-12"
            />
          </div>
          {errors.professional.consultationFee && (
            <p className="text-red-500 text-sm mt-1">{errors.professional.consultationFee}</p>
          )}
        </div>

        {/* Availability */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Available Days & Hours</Label>
          <div className="space-y-4">
            {weekDays.map((day) => (
              <div key={day} className="border rounded-lg p-4">
                <h4 className="font-medium mb-3">{day}</h4>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => toggleAvailability(day, time)}
                      className={`p-2 text-sm rounded border transition-colors ${
                        formData.professional.availability[day]?.includes(time)
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderFileUpload = (
    field: keyof VerificationDocs,
    title: string,
    description: string,
    acceptedTypes: string,
  ) => {
    const file = formData.verification[field]
    const progress = uploadProgress[field]

    return (
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
        <div
          className="text-center"
          onDrop={handleDrop(field)}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
        >
          {file ? (
            <div className="space-y-3">
              <div className="flex items-center justify-center">
                {field === "headshot" ? (
                  <ImageIcon className="w-12 h-12 text-green-600" />
                ) : (
                  <FileText className="w-12 h-12 text-green-600" />
                )}
              </div>
              <div>
                <p className="font-medium text-green-600">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              {progress !== undefined && progress < 100 && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
              {progress === 100 && (
                <div className="flex items-center justify-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="text-sm">Upload complete</span>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <Upload className="w-12 h-12 text-gray-400 mx-auto" />
              <div>
                <h3 className="font-medium text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
                <p className="text-xs text-gray-400 mt-1">{acceptedTypes}</p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRefs[field].current?.click()}
                className="mt-3"
              >
                Choose File
              </Button>
            </div>
          )}
        </div>
        <input
          ref={fileInputRefs[field]}
          type="file"
          accept={acceptedTypes}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFileUpload(field, file)
          }}
          className="hidden"
        />
        {errors.verification[field] && <p className="text-red-500 text-sm mt-2">{errors.verification[field]}</p>}
      </div>
    )
  }

  const renderVerification = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Document Verification</h2>
        <p className="text-gray-600">Upload your credentials for verification</p>
      </div>

      <div className="space-y-6">
        {renderFileUpload(
          "medicalLicense",
          "Medical License",
          "Upload your current medical license",
          ".pdf,.jpg,.jpeg,.png",
        )}

        {renderFileUpload(
          "medicalDegree",
          "Medical Degree Certificate",
          "Upload your medical degree certificate",
          ".pdf,.jpg,.jpeg,.png",
        )}

        {renderFileUpload(
          "headshot",
          "Professional Headshot",
          "Upload a professional photo for your profile",
          ".jpg,.jpeg,.png",
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-900">Document Review Process</p>
            <p className="text-blue-700 mt-1">
              All documents will be reviewed by our medical board within 24-48 hours. You'll receive an email
              notification once your application is approved.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <Checkbox id="doctor-terms" />
        <div className="text-sm">
          <Label htmlFor="doctor-terms" className="cursor-pointer">
            I agree to the{" "}
            <Dialog>
              <DialogTrigger asChild>
                <button type="button" className="text-blue-600 hover:underline">
                  Doctor Terms and Conditions
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Doctor Terms and Conditions</DialogTitle>
                  <DialogDescription>Please read the terms for healthcare providers.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 text-sm">
                  <h4 className="font-semibold">Professional Standards</h4>
                  <p>All doctors must maintain current medical licenses and follow professional standards.</p>
                  <h4 className="font-semibold">Patient Care</h4>
                  <p>Provide quality care and maintain patient confidentiality at all times.</p>
                  <h4 className="font-semibold">Platform Guidelines</h4>
                  <p>Follow all platform guidelines and maintain professional conduct.</p>
                </div>
              </DialogContent>
            </Dialog>{" "}
            and{" "}
            <button type="button" className="text-blue-600 hover:underline">
              Privacy Policy
            </button>
          </Label>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Auto-save indicator */}
        {autoSaved && (
          <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 z-50">
            <Save className="w-4 h-4" />
            <span className="text-sm">Draft saved</span>
          </div>
        )}

        <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-2xl">
          <CardHeader className="pb-8">{renderProgressBar()}</CardHeader>

          <CardContent className="px-8 pb-8">
            <div className="min-h-[600px]">
              {currentStep === 1 && renderPersonalInfo()}
              {currentStep === 2 && renderProfessionalDetails()}
              {currentStep === 3 && renderVerification()}
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

              <Button
                type="button"
                onClick={handleNext}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : currentStep === 3 ? (
                  <span>Submit for Review</span>
                ) : (
                  <>
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
