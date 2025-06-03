"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Cross,
  Search,
  Calendar,
  Home,
  Star,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  Shield,
  Clock,
  CreditCard,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef } from "react"

export function HealthcareLanding() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const doctorsScrollRef = useRef<HTMLDivElement>(null)

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "General Medicine",
      rating: 4.9,
      reviews: 127,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Pediatrics",
      rating: 4.8,
      reviews: 89,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Cardiology",
      rating: 4.9,
      reviews: 156,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 4,
      name: "Dr. David Kim",
      specialty: "Dermatology",
      rating: 4.7,
      reviews: 93,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 5,
      name: "Dr. Lisa Thompson",
      specialty: "Internal Medicine",
      rating: 4.8,
      reviews: 112,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 6,
      name: "Dr. James Wilson",
      specialty: "Orthopedics",
      rating: 4.9,
      reviews: 134,
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Maria Garcia",
      location: "San Francisco, CA",
      rating: 5,
      text: "DocHome made it so easy to get medical care for my elderly mother. The doctor was professional and caring.",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "John Smith",
      location: "New York, NY",
      rating: 5,
      text: "Amazing service! The doctor arrived on time and provided excellent care. Highly recommend DocHome.",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Jennifer Lee",
      location: "Los Angeles, CA",
      rating: 5,
      text: "Perfect for busy parents. Got my child checked without leaving home. The convenience is unmatched!",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const scrollDoctors = (direction: "left" | "right") => {
    if (doctorsScrollRef.current) {
      const scrollAmount = 320
      const newScrollLeft =
        direction === "left"
          ? doctorsScrollRef.current.scrollLeft - scrollAmount
          : doctorsScrollRef.current.scrollLeft + scrollAmount

      doctorsScrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Cross className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                DocHome
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
                How it Works
              </Link>
              <Link href="/doctor-registration" className="text-gray-700 hover:text-blue-600 transition-colors">
                For Doctors
              </Link>
              <Link href="/login-page" className="text-gray-700 hover:text-blue-600 transition-colors">
                Login
              </Link>
              <Link href="/patient-registration">
                <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105">
                  Sign Up
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Get Quality{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                    Healthcare
                  </span>{" "}
                  At Home
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Book verified doctors for home visits in minutes. Professional healthcare delivered to your doorstep.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/doctor-search">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Find a Doctor
                  </Button>
                </Link>
                <Link href="/doctor-registration">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
                  >
                    Join as Doctor
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 pt-8">
                <Badge
                  variant="secondary"
                  className="bg-white/80 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-medium shadow-lg"
                >
                  <Shield className="w-4 h-4 mr-2 text-green-600" />
                  500+ Verified Doctors
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-white/80 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-medium shadow-lg"
                >
                  <Clock className="w-4 h-4 mr-2 text-blue-600" />
                  24/7 Support
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-white/80 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-medium shadow-lg"
                >
                  <CreditCard className="w-4 h-4 mr-2 text-purple-600" />
                  Secure Payments
                </Badge>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/placeholder.svg?height=600&width=500"
                  alt="Doctor with patient at home"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-r from-blue-200 to-teal-200 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get healthcare at home in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Find Your Doctor",
                description:
                  "Browse through our network of verified healthcare professionals and choose the right specialist for your needs.",
              },
              {
                icon: Calendar,
                title: "Book Appointment",
                description:
                  "Select your preferred time slot and book an appointment that fits your schedule. Instant confirmation guaranteed.",
              },
              {
                icon: Home,
                title: "Get Care at Home",
                description:
                  "Receive professional medical care in the comfort of your home. Safe, convenient, and personalized treatment.",
              },
            ].map((step, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border border-white/20"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">Featured Doctors</h2>
              <p className="text-xl text-gray-600">Meet our top-rated healthcare professionals</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => scrollDoctors("left")} className="rounded-full">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => scrollDoctors("right")} className="rounded-full">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div
            ref={doctorsScrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {doctors.map((doctor) => (
              <Card
                key={doctor.id}
                className="flex-shrink-0 w-80 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border border-white/20"
              >
                <CardContent className="p-6">
                  <div className="text-center">
                    <Image
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.name}
                      width={120}
                      height={120}
                      className="rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
                    />
                    <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{doctor.specialty}</p>
                    <div className="flex items-center justify-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(doctor.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">
                        {doctor.rating} ({doctor.reviews} reviews)
                      </span>
                    </div>
                    <Link href="/doctor-profile">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-full transition-all duration-300">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Patients Say</h2>
            <p className="text-xl text-blue-100">Real stories from real patients</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-lg mb-6 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full border-2 border-white/20"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-blue-100 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <Cross className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">DocHome</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Bringing quality healthcare to your doorstep. Professional, convenient, and caring medical services at
                home.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">About</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Press
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Services</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Home Visits
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Telemedicine
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Lab Tests
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Prescriptions
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-400">1-800-DOCHOME</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-400">support@dochome.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-400">Available Nationwide</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">© 2024 DocHome. All rights reserved.</p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-110"
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}