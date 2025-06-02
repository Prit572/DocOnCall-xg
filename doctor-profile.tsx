"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Star,
  Verified,
  Heart,
  Share2,
  MapPin,
  Clock,
  Calendar,
  Phone,
  Mail,
  Globe,
  Award,
  GraduationCap,
  Stethoscope,
  Home,
  Building,
  Car,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Printer,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Users,
  MessageCircle,
} from "lucide-react"
import { useState } from "react"

interface Review {
  id: string
  patientName: string
  rating: number
  date: string
  text: string
  helpful: number
  notHelpful: number
  verified: boolean
}

interface Doctor {
  id: string
  name: string
  credentials: string
  specialty: string
  subSpecialties: string[]
  rating: number
  totalReviews: number
  experience: number
  image: string
  verified: boolean
  bio: string
  education: Array<{
    degree: string
    institution: string
    year: string
  }>
  certifications: string[]
  awards: string[]
  languages: string[]
  services: Array<{
    name: string
    description: string
    homeVisit: boolean
    clinic: boolean
  }>
  consultationFee: number
  responseTime: string
  availableToday: boolean
  schedule: { [key: string]: string[] }
  serviceAreas: string[]
  travelFee: number
  clinicAddress?: string
}

const mockDoctor: Doctor = {
  id: "1",
  name: "Dr. Sarah Johnson",
  credentials: "MD, FACP",
  specialty: "Internal Medicine",
  subSpecialties: ["Cardiology", "Preventive Care", "Geriatrics"],
  rating: 4.9,
  totalReviews: 127,
  experience: 12,
  image: "/placeholder.svg?height=300&width=300",
  verified: true,
  bio: "Dr. Sarah Johnson is a board-certified internal medicine physician with over 12 years of experience providing comprehensive healthcare services. She specializes in preventive care, chronic disease management, and geriatric medicine. Dr. Johnson is passionate about delivering personalized, patient-centered care in the comfort of your home.",
  education: [
    {
      degree: "Doctor of Medicine (MD)",
      institution: "Harvard Medical School",
      year: "2012",
    },
    {
      degree: "Bachelor of Science in Biology",
      institution: "Stanford University",
      year: "2008",
    },
  ],
  certifications: [
    "Board Certified in Internal Medicine",
    "Advanced Cardiac Life Support (ACLS)",
    "Basic Life Support (BLS)",
    "Geriatric Medicine Certificate",
  ],
  awards: ["Top Doctor Award 2023", "Patient Choice Award 2022", "Excellence in Medicine Award 2021"],
  languages: ["English", "Spanish", "French"],
  services: [
    {
      name: "General Health Checkup",
      description: "Comprehensive physical examination and health assessment",
      homeVisit: true,
      clinic: true,
    },
    {
      name: "Chronic Disease Management",
      description: "Ongoing care for diabetes, hypertension, and other chronic conditions",
      homeVisit: true,
      clinic: true,
    },
    {
      name: "Preventive Care",
      description: "Vaccinations, screenings, and health maintenance",
      homeVisit: true,
      clinic: false,
    },
    {
      name: "Geriatric Care",
      description: "Specialized care for elderly patients",
      homeVisit: true,
      clinic: true,
    },
  ],
  consultationFee: 150,
  responseTime: "Usually responds within 2 hours",
  availableToday: true,
  schedule: {
    Monday: ["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM"],
    Tuesday: ["9:00 AM", "11:00 AM", "1:00 PM", "4:00 PM"],
    Wednesday: ["10:00 AM", "2:00 PM", "3:00 PM"],
    Thursday: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM"],
    Friday: ["9:00 AM", "1:00 PM", "2:00 PM"],
    Saturday: ["10:00 AM", "11:00 AM"],
    Sunday: [],
  },
  serviceAreas: ["San Francisco", "Oakland", "Berkeley", "Daly City"],
  travelFee: 25,
  clinicAddress: "123 Medical Center Dr, San Francisco, CA 94102",
}

const mockReviews: Review[] = [
  {
    id: "1",
    patientName: "Maria G.",
    rating: 5,
    date: "2024-01-15",
    text: "Dr. Johnson provided excellent care during my home visit. She was thorough, professional, and made me feel very comfortable. Highly recommend!",
    helpful: 12,
    notHelpful: 0,
    verified: true,
  },
  {
    id: "2",
    patientName: "John D.",
    rating: 5,
    date: "2024-01-10",
    text: "Outstanding doctor! Very knowledgeable and took time to explain everything clearly. The home visit was convenient and professional.",
    helpful: 8,
    notHelpful: 1,
    verified: true,
  },
  {
    id: "3",
    patientName: "Lisa M.",
    rating: 4,
    date: "2024-01-05",
    text: "Great experience overall. Dr. Johnson was punctual and thorough. Only minor issue was the wait time for scheduling.",
    helpful: 5,
    notHelpful: 0,
    verified: true,
  },
  {
    id: "4",
    patientName: "Robert K.",
    rating: 5,
    date: "2023-12-28",
    text: "Exceptional care for my elderly mother. Dr. Johnson was patient, kind, and very professional. Will definitely book again.",
    helpful: 15,
    notHelpful: 0,
    verified: true,
  },
]

export default function Component() {
  const [activeTab, setActiveTab] = useState("about")
  const [isFavorite, setIsFavorite] = useState(false)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [reviewVotes, setReviewVotes] = useState<{ [key: string]: "helpful" | "not-helpful" | null }>({})

  const ratingDistribution = [
    { stars: 5, count: 98, percentage: 77 },
    { stars: 4, count: 20, percentage: 16 },
    { stars: 3, count: 6, percentage: 5 },
    { stars: 2, count: 2, percentage: 1 },
    { stars: 1, count: 1, percentage: 1 },
  ]

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${mockDoctor.name} - ${mockDoctor.specialty}`,
        text: `Check out ${mockDoctor.name}'s profile on DocHome`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Profile link copied to clipboard!")
    }
  }

  const handleVote = (reviewId: string, voteType: "helpful" | "not-helpful") => {
    setReviewVotes((prev) => ({
      ...prev,
      [reviewId]: prev[reviewId] === voteType ? null : voteType,
    }))
  }

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="relative">
                <Avatar className="w-48 h-48 border-4 border-white shadow-lg">
                  <AvatarImage src={mockDoctor.image || "/placeholder.svg"} alt={mockDoctor.name} />
                  <AvatarFallback className="text-4xl">Dr</AvatarFallback>
                </Avatar>
                {mockDoctor.verified && (
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center border-4 border-white">
                    <Verified className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {mockDoctor.name}
                      <span className="text-lg font-normal text-gray-600 ml-2">{mockDoctor.credentials}</span>
                    </h1>
                    <p className="text-xl text-blue-600 font-semibold mb-2">{mockDoctor.specialty}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mockDoctor.subSpecialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={isFavorite ? "text-red-500 border-red-500" : ""}
                    >
                      <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleShare}>
                      <Share2 className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => window.print()}>
                      <Printer className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(mockDoctor.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{mockDoctor.rating}</span>
                    <span className="text-gray-600">({mockDoctor.totalReviews} reviews)</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{mockDoctor.experience} years experience</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                  {mockDoctor.availableToday && (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">Available today</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600">
                    <MessageCircle className="w-4 h-4" />
                    <span>{mockDoctor.responseTime}</span>
                  </div>
                </div>

                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      About Dr. {mockDoctor.name.split(" ")[1]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{mockDoctor.bio}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockDoctor.education.map((edu, index) => (
                      <div key={index} className="border-l-4 border-blue-600 pl-4">
                        <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                        <p className="text-gray-600">{edu.institution}</p>
                        <p className="text-sm text-gray-500">{edu.year}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        Certifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {mockDoctor.certifications.map((cert, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-gray-700">{cert}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="w-5 h-5" />
                        Languages
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {mockDoctor.languages.map((language) => (
                          <Badge key={language} variant="outline">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Awards & Recognition
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {mockDoctor.awards.map((award, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-gray-700">{award}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Services Tab */}
              <TabsContent value="services" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Stethoscope className="w-5 h-5" />
                      Services Offered
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockDoctor.services.map((service, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{service.name}</h4>
                          <div className="flex gap-2">
                            {service.homeVisit && (
                              <Badge variant="default" className="bg-green-600">
                                <Home className="w-3 h-3 mr-1" />
                                Home Visit
                              </Badge>
                            )}
                            {service.clinic && (
                              <Badge variant="outline">
                                <Building className="w-3 h-3 mr-1" />
                                Clinic
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Equipment Available for Home Visits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        "Digital Stethoscope",
                        "Blood Pressure Monitor",
                        "Pulse Oximeter",
                        "Digital Thermometer",
                        "Portable ECG Machine",
                        "Blood Glucose Meter",
                        "Otoscope",
                        "Ophthalmoscope",
                      ].map((equipment) => (
                        <div key={equipment} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-gray-700">{equipment}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Availability Tab */}
              <TabsContent value="availability" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Weekly Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {weekDays.map((day) => (
                        <div key={day} className="flex items-center justify-between py-3 border-b border-gray-100">
                          <div className="font-medium text-gray-900 w-24">{day}</div>
                          <div className="flex-1 flex flex-wrap gap-2">
                            {mockDoctor.schedule[day]?.length > 0 ? (
                              mockDoctor.schedule[day].map((time) => (
                                <Badge key={time} variant="outline" className="bg-green-50 text-green-700">
                                  {time}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-gray-500 italic">Not available</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Availability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <AlertCircle className="w-6 h-6 text-orange-600" />
                      <div>
                        <p className="font-medium text-orange-900">Emergency Consultations</p>
                        <p className="text-sm text-orange-700">
                          Available for urgent cases outside regular hours. Additional fees may apply.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Location Tab */}
              <TabsContent value="location" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Service Areas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      {mockDoctor.serviceAreas.map((area) => (
                        <div key={area} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-gray-700">{area}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <Car className="w-6 h-6 text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-900">Travel Fee</p>
                          <p className="text-sm text-blue-700">
                            ${mockDoctor.travelFee} travel fee applies for home visits outside 5km radius
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {mockDoctor.clinicAddress && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="w-5 h-5" />
                        Clinic Location
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{mockDoctor.clinicAddress}</p>
                      <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <MapPin className="w-12 h-12 mx-auto mb-2" />
                          <p>Interactive map would be displayed here</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Widget */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-center">Book Consultation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">${mockDoctor.consultationFee}</div>
                  <p className="text-sm text-gray-600">per consultation</p>
                </div>

                {mockDoctor.availableToday && (
                  <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 rounded-lg p-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Available today</span>
                  </div>
                )}

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>

                <div className="text-center text-sm text-gray-600">
                  <p>{mockDoctor.responseTime}</p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Alternative Doctors</h4>
                  <div className="space-y-2">
                    {["Dr. Michael Chen", "Dr. Emily Rodriguez"].map((name) => (
                      <div key={name} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{name}</span>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Office
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Patient Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Rating Overview */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900 mb-2">{mockDoctor.rating}</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < Math.floor(mockDoctor.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">{mockDoctor.totalReviews} total reviews</p>
                </div>

                <div className="space-y-2">
                  {ratingDistribution.map((item) => (
                    <div key={item.stars} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-6">{item.stars}★</span>
                      <Progress value={item.percentage} className="flex-1 h-2" />
                      <span className="text-sm text-gray-600 w-8">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="mb-6" />

              {/* Individual Reviews */}
              <div className="space-y-6">
                {(showAllReviews ? mockReviews : mockReviews.slice(0, 3)).map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>{review.patientName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{review.patientName}</span>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Flag className="w-4 h-4" />
                      </Button>
                    </div>

                    <p className="text-gray-700 mb-4">{review.text}</p>

                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">Was this helpful?</span>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVote(review.id, "helpful")}
                          className={reviewVotes[review.id] === "helpful" ? "text-green-600" : ""}
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {review.helpful}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVote(review.id, "not-helpful")}
                          className={reviewVotes[review.id] === "not-helpful" ? "text-red-600" : ""}
                        >
                          <ThumbsDown className="w-4 h-4 mr-1" />
                          {review.notHelpful}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {mockReviews.length > 3 && (
                <div className="text-center mt-6">
                  <Button variant="outline" onClick={() => setShowAllReviews(!showAllReviews)}>
                    {showAllReviews ? "Show Less" : `Load More Reviews (${mockReviews.length - 3} more)`}
                  </Button>
                </div>
              )}

              <div className="text-center mt-6">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Write a Review</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
