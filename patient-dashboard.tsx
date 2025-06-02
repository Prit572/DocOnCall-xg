"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Cross,
  Home,
  Search,
  Calendar,
  FileText,
  CreditCard,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  Clock,
  Users,
  Heart,
  Plus,
  AlertTriangle,
  Pill,
  MessageCircle,
  Sun,
  MapPin,
  ChevronRight,
  Activity,
  CheckCircle,
  DollarSign,
} from "lucide-react"
import { useState, useEffect } from "react"

interface Appointment {
  id: string
  doctor: {
    name: string
    specialty: string
    image: string
  }
  date: string
  time: string
  type: "home" | "clinic"
  status: "upcoming" | "completed" | "cancelled"
}

interface ActivityItem {
  id: string
  type: "appointment" | "payment" | "prescription"
  description: string
  time: string
  icon: React.ReactNode
}

interface Stats {
  upcomingAppointments: number
  totalConsultations: number
  monthlyVisits: number
  savedDoctors: number
}

export default function Component() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [loading, setLoading] = useState(true)

  // Mock patient data
  const patient = {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=80&width=80",
    location: "San Francisco, CA",
  }

  // Mock weather data
  const weather = {
    temperature: 72,
    condition: "Sunny",
    icon: Sun,
  }

  // Mock stats
  const stats: Stats = {
    upcomingAppointments: 2,
    totalConsultations: 24,
    monthlyVisits: 3,
    savedDoctors: 8,
  }

  // Mock appointments
  const appointments: Appointment[] = [
    {
      id: "1",
      doctor: {
        name: "Dr. Michael Chen",
        specialty: "Cardiology",
        image: "/placeholder.svg?height=60&width=60",
      },
      date: "Today",
      time: "2:30 PM",
      type: "home",
      status: "upcoming",
    },
    {
      id: "2",
      doctor: {
        name: "Dr. Emily Rodriguez",
        specialty: "General Medicine",
        image: "/placeholder.svg?height=60&width=60",
      },
      date: "Tomorrow",
      time: "10:00 AM",
      type: "clinic",
      status: "upcoming",
    },
    {
      id: "3",
      doctor: {
        name: "Dr. David Kim",
        specialty: "Dermatology",
        image: "/placeholder.svg?height=60&width=60",
      },
      date: "Dec 28",
      time: "3:00 PM",
      type: "home",
      status: "upcoming",
    },
  ]

  // Mock recent activities
  const activities: ActivityItem[] = [
    {
      id: "1",
      type: "appointment",
      description: "Appointment with Dr. Sarah Wilson completed",
      time: "2 hours ago",
      icon: <CheckCircle className="w-4 h-4 text-green-600" />,
    },
    {
      id: "2",
      type: "payment",
      description: "Payment of $150 processed successfully",
      time: "1 day ago",
      icon: <DollarSign className="w-4 h-4 text-blue-600" />,
    },
    {
      id: "3",
      type: "appointment",
      description: "Appointment with Dr. James Lee booked",
      time: "2 days ago",
      icon: <Calendar className="w-4 h-4 text-purple-600" />,
    },
    {
      id: "4",
      type: "prescription",
      description: "Prescription refill requested",
      time: "3 days ago",
      icon: <Pill className="w-4 h-4 text-orange-600" />,
    },
  ]

  const navigationItems = [
    { name: "Dashboard", icon: Home, active: true },
    { name: "Find Doctors", icon: Search, active: false },
    { name: "My Appointments", icon: Calendar, active: false },
    { name: "Medical History", icon: FileText, active: false },
    { name: "Payments", icon: CreditCard, active: false },
    { name: "Settings", icon: Settings, active: false },
  ]

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const StatCard = ({ title, value, subtitle, icon: Icon, color }: any) => (
    <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Cross className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Cross className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                DocHome
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  item.active
                    ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search doctors, appointments..."
                  className="pl-10 w-64 bg-gray-50 border-gray-200"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>
              <Avatar>
                <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Card */}
            <Card className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16 border-4 border-white/20">
                      <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-2xl font-bold">
                        {getGreeting()}, {patient.name}!
                      </h1>
                      <p className="text-blue-100 flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {patient.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 text-blue-100 mb-1">
                      <weather.icon className="w-5 h-5" />
                      <span className="text-sm">Perfect for home visits</span>
                    </div>
                    <p className="text-2xl font-bold">{weather.temperature}°F</p>
                    <p className="text-blue-100">{weather.condition}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Upcoming Appointments"
                value={stats.upcomingAppointments}
                subtitle="Next: Today 2:30 PM"
                icon={Calendar}
                color="bg-blue-500"
              />
              <StatCard
                title="Total Consultations"
                value={stats.totalConsultations}
                subtitle="Since joining"
                icon={Activity}
                color="bg-green-500"
              />
              <StatCard
                title="This Month's Visits"
                value={stats.monthlyVisits}
                subtitle="December 2024"
                icon={Users}
                color="bg-purple-500"
              />
              <StatCard
                title="Saved Doctors"
                value={stats.savedDoctors}
                subtitle="In your favorites"
                icon={Heart}
                color="bg-red-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Appointments */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Upcoming Appointments</CardTitle>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      View All
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {appointments.slice(0, 3).map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <Avatar className="w-12 h-12">
                          <AvatarImage
                            src={appointment.doctor.image || "/placeholder.svg"}
                            alt={appointment.doctor.name}
                          />
                          <AvatarFallback>Dr</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{appointment.doctor.name}</h4>
                          <p className="text-sm text-gray-600">{appointment.doctor.specialty}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-500 flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {appointment.date}
                            </span>
                            <span className="text-sm text-gray-500 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {appointment.time}
                            </span>
                          </div>
                        </div>
                        <Badge variant={appointment.type === "home" ? "default" : "secondary"}>
                          {appointment.type === "home" ? "Home Visit" : "Clinic"}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Book New Appointment
                    </Button>
                    <Button variant="destructive" className="w-full">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Emergency Booking
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Pill className="w-4 h-4 mr-2" />
                      Refill Prescription
                    </Button>
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">{activity.icon}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900">{activity.description}</p>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Health Tips Widget */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Daily Health Tip</h3>
                    <p className="text-gray-700 mt-1">
                      Stay hydrated! Aim for 8 glasses of water daily to maintain optimal health and energy levels.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
