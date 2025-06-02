"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MapPin,
  Mic,
  Filter,
  Grid3X3,
  List,
  Map,
  Star,
  Heart,
  Clock,
  DollarSign,
  X,
  ChevronDown,
  ChevronUp,
  Verified,
  Calendar,
  Eye,
  SlidersHorizontal,
  Navigation,
} from "lucide-react"
import { useState, useEffect } from "react"

interface Doctor {
  id: string
  name: string
  specialty: string
  rating: number
  reviewCount: number
  experience: number
  price: number
  distance: number
  nextAvailable: string
  image: string
  verified: boolean
  languages: string[]
  gender: "male" | "female"
  isFavorite: boolean
}

interface Filters {
  specialties: string[]
  availability: string
  distance: number
  priceRange: [number, number]
  rating: number
  gender: string
  languages: string[]
}

const specialties = [
  { name: "General Practice", icon: "🩺" },
  { name: "Cardiology", icon: "❤️" },
  { name: "Dermatology", icon: "🧴" },
  { name: "Pediatrics", icon: "👶" },
  { name: "Orthopedics", icon: "🦴" },
  { name: "Neurology", icon: "🧠" },
  { name: "Psychiatry", icon: "🧘" },
  { name: "Gynecology", icon: "👩" },
]

const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "General Practice",
    rating: 4.9,
    reviewCount: 127,
    experience: 8,
    price: 150,
    distance: 2.3,
    nextAvailable: "Today 3:00 PM",
    image: "/placeholder.svg?height=120&width=120",
    verified: true,
    languages: ["English", "Spanish"],
    gender: "female",
    isFavorite: false,
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Cardiology",
    rating: 4.8,
    reviewCount: 89,
    experience: 12,
    price: 200,
    distance: 1.8,
    nextAvailable: "Tomorrow 10:00 AM",
    image: "/placeholder.svg?height=120&width=120",
    verified: true,
    languages: ["English", "Mandarin"],
    gender: "male",
    isFavorite: true,
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatology",
    rating: 4.7,
    reviewCount: 156,
    experience: 6,
    price: 180,
    distance: 3.1,
    nextAvailable: "Today 5:30 PM",
    image: "/placeholder.svg?height=120&width=120",
    verified: true,
    languages: ["English", "Spanish", "French"],
    gender: "female",
    isFavorite: false,
  },
  {
    id: "4",
    name: "Dr. David Kim",
    specialty: "Pediatrics",
    rating: 4.9,
    reviewCount: 93,
    experience: 10,
    price: 160,
    distance: 4.2,
    nextAvailable: "Dec 28 2:00 PM",
    image: "/placeholder.svg?height=120&width=120",
    verified: true,
    languages: ["English", "Korean"],
    gender: "male",
    isFavorite: false,
  },
  {
    id: "5",
    name: "Dr. Lisa Thompson",
    specialty: "Orthopedics",
    rating: 4.6,
    reviewCount: 112,
    experience: 15,
    price: 220,
    distance: 5.7,
    nextAvailable: "Tomorrow 4:00 PM",
    image: "/placeholder.svg?height=120&width=120",
    verified: true,
    languages: ["English"],
    gender: "female",
    isFavorite: true,
  },
  {
    id: "6",
    name: "Dr. James Wilson",
    specialty: "Neurology",
    rating: 4.8,
    reviewCount: 134,
    experience: 18,
    price: 250,
    distance: 6.3,
    nextAvailable: "Dec 29 11:00 AM",
    image: "/placeholder.svg?height=120&width=120",
    verified: true,
    languages: ["English", "German"],
    gender: "male",
    isFavorite: false,
  },
]

export default function Component() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("San Francisco, CA")
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid")
  const [sortBy, setSortBy] = useState("relevance")
  const [showFilters, setShowFilters] = useState(true)
  const [loading, setLoading] = useState(false)
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors)
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(mockDoctors)
  const [expandedSections, setExpandedSections] = useState({
    specialty: true,
    availability: true,
    distance: true,
    price: true,
    rating: true,
    preferences: true,
  })

  const [filters, setFilters] = useState<Filters>({
    specialties: [],
    availability: "any",
    distance: 50,
    priceRange: [0, 500],
    rating: 0,
    gender: "any",
    languages: [],
  })

  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const suggestions = [
    "Dr. Sarah Johnson",
    "Cardiology",
    "General Practice",
    "Dermatology near me",
    "Pediatrics",
    "Emergency care",
  ]

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = suggestions.filter((suggestion) => suggestion.toLowerCase().includes(searchQuery.toLowerCase()))
      setSearchSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [searchQuery])

  useEffect(() => {
    applyFilters()
  }, [filters, doctors])

  const applyFilters = () => {
    let filtered = [...doctors]

    // Apply specialty filter
    if (filters.specialties.length > 0) {
      filtered = filtered.filter((doctor) => filters.specialties.includes(doctor.specialty))
    }

    // Apply distance filter
    filtered = filtered.filter((doctor) => doctor.distance <= filters.distance)

    // Apply price range filter
    filtered = filtered.filter(
      (doctor) => doctor.price >= filters.priceRange[0] && doctor.price <= filters.priceRange[1],
    )

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((doctor) => doctor.rating >= filters.rating)
    }

    // Apply gender filter
    if (filters.gender !== "any") {
      filtered = filtered.filter((doctor) => doctor.gender === filters.gender)
    }

    setFilteredDoctors(filtered)
  }

  const toggleFavorite = (doctorId: string) => {
    setDoctors((prev) =>
      prev.map((doctor) => (doctor.id === doctorId ? { ...doctor, isFavorite: !doctor.isFavorite } : doctor)),
    )
  }

  const clearAllFilters = () => {
    setFilters({
      specialties: [],
      availability: "any",
      distance: 50,
      priceRange: [0, 500],
      rating: 0,
      gender: "any",
      languages: [],
    })
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.specialties.length > 0) count++
    if (filters.availability !== "any") count++
    if (filters.distance < 50) count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 500) count++
    if (filters.rating > 0) count++
    if (filters.gender !== "any") count++
    if (filters.languages.length > 0) count++
    return count
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleSearch = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowSuggestions(false)
    }, 1000)
  }

  const DoctorCard = ({ doctor, isListView = false }: { doctor: Doctor; isListView?: boolean }) => (
    <Card
      className={`hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
        isListView ? "flex" : ""
      }`}
    >
      <CardContent className={`p-6 ${isListView ? "flex items-center space-x-6 w-full" : ""}`}>
        <div className={`${isListView ? "flex-shrink-0" : "text-center mb-4"}`}>
          <div className="relative inline-block">
            <Avatar className={`${isListView ? "w-20 h-20" : "w-24 h-24 mx-auto"} border-4 border-white shadow-lg`}>
              <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
              <AvatarFallback>Dr</AvatarFallback>
            </Avatar>
            {doctor.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <Verified className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        </div>

        <div className={`${isListView ? "flex-1" : ""}`}>
          <div className={`${isListView ? "flex justify-between items-start" : ""}`}>
            <div className={`${isListView ? "" : "text-center"}`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{doctor.name}</h3>
              <p className="text-blue-600 font-medium mb-2">{doctor.specialty}</p>

              <div className={`flex items-center ${isListView ? "" : "justify-center"} space-x-1 mb-2`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(doctor.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  {doctor.rating} ({doctor.reviewCount} reviews)
                </span>
              </div>

              <div className={`space-y-2 text-sm text-gray-600 ${isListView ? "" : "text-center"}`}>
                <p className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{doctor.experience} years experience</span>
                </p>
                <p className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-medium">Next: {doctor.nextAvailable}</span>
                </p>
                <p className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4" />
                  <span>${doctor.price} consultation</span>
                </p>
                <p className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{doctor.distance} km away</span>
                </p>
              </div>
            </div>

            {isListView && (
              <div className="flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFavorite(doctor.id)}
                  className={`${doctor.isFavorite ? "text-red-500" : "text-gray-400"} hover:scale-110 transition-transform`}
                >
                  <Heart className={`w-5 h-5 ${doctor.isFavorite ? "fill-current" : ""}`} />
                </Button>
              </div>
            )}
          </div>

          <div className={`${isListView ? "flex space-x-3 mt-4" : "space-y-2 mt-4"}`}>
            <Button variant="outline" className={`${isListView ? "flex-1" : "w-full"}`}>
              <Eye className="w-4 h-4 mr-2" />
              View Profile
            </Button>
            <Button className={`${isListView ? "flex-1" : "w-full"} bg-blue-600 hover:bg-blue-700`}>Book Now</Button>
            {!isListView && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleFavorite(doctor.id)}
                className={`${doctor.isFavorite ? "text-red-500" : "text-gray-400"} hover:scale-110 transition-transform mx-auto`}
              >
                <Heart className={`w-5 h-5 ${doctor.isFavorite ? "fill-current" : ""}`} />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const FilterSection = ({ title, children, sectionKey }: any) => (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
      >
        {title}
        {expandedSections[sectionKey] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {expandedSections[sectionKey] && <div className="space-y-3">{children}</div>}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search by name, specialty, or location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 h-12 text-lg"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => alert("Voice search activated")}
                >
                  <Mic className="w-5 h-5 text-gray-400" />
                </Button>
              </div>

              {/* Search Suggestions */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchQuery(suggestion)
                        setShowSuggestions(false)
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 pr-10 h-12 w-64"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  onClick={() => alert("GPS location detected")}
                >
                  <Navigation className="w-4 h-4 text-blue-600" />
                </Button>
              </div>
              <Button onClick={handleSearch} className="h-12 px-8 bg-blue-600 hover:bg-blue-700">
                Search
              </Button>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                <Filter className="w-4 h-4 mr-2" />
                Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
              </Button>

              <div className="hidden lg:flex items-center space-x-2">
                <span className="text-sm text-gray-600">View:</span>
                <div className="flex border border-gray-300 rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-none border-x"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "map" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("map")}
                    className="rounded-l-none"
                  >
                    <Map className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="distance">Distance</SelectItem>
                </SelectContent>
              </Select>

              <span className="text-sm text-gray-600">{filteredDoctors.length} doctors found</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-80 bg-white rounded-lg shadow-sm border border-gray-200 h-fit sticky top-24`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <SlidersHorizontal className="w-5 h-5 mr-2" />
                  Filters
                  {getActiveFilterCount() > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {getActiveFilterCount()}
                    </Badge>
                  )}
                </h3>
                {getActiveFilterCount() > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                    Clear All
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                {/* Specialty Filter */}
                <FilterSection title="Specialty" sectionKey="specialty">
                  <div className="space-y-2">
                    {specialties.map((specialty) => (
                      <div key={specialty.name} className="flex items-center space-x-2">
                        <Checkbox
                          id={specialty.name}
                          checked={filters.specialties.includes(specialty.name)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters((prev) => ({
                                ...prev,
                                specialties: [...prev.specialties, specialty.name],
                              }))
                            } else {
                              setFilters((prev) => ({
                                ...prev,
                                specialties: prev.specialties.filter((s) => s !== specialty.name),
                              }))
                            }
                          }}
                        />
                        <Label htmlFor={specialty.name} className="flex items-center space-x-2 cursor-pointer">
                          <span>{specialty.icon}</span>
                          <span>{specialty.name}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </FilterSection>

                {/* Availability Filter */}
                <FilterSection title="Availability" sectionKey="availability">
                  <Select
                    value={filters.availability}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, availability: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="tomorrow">Tomorrow</SelectItem>
                      <SelectItem value="week">This week</SelectItem>
                      <SelectItem value="custom">Custom date</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterSection>

                {/* Distance Filter */}
                <FilterSection title="Distance" sectionKey="distance">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Within {filters.distance} km</span>
                    </div>
                    <Slider
                      value={[filters.distance]}
                      onValueChange={(value) => setFilters((prev) => ({ ...prev, distance: value[0] }))}
                      max={50}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </FilterSection>

                {/* Price Range Filter */}
                <FilterSection title="Price Range" sectionKey="price">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>${filters.priceRange[0]}</span>
                      <span>${filters.priceRange[1]}</span>
                    </div>
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) =>
                        setFilters((prev) => ({ ...prev, priceRange: value as [number, number] }))
                      }
                      max={500}
                      min={0}
                      step={10}
                      className="w-full"
                    />
                  </div>
                </FilterSection>

                {/* Rating Filter */}
                <FilterSection title="Minimum Rating" sectionKey="rating">
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={filters.rating === rating}
                          onCheckedChange={(checked) => {
                            setFilters((prev) => ({ ...prev, rating: checked ? rating : 0 }))
                          }}
                        />
                        <Label htmlFor={`rating-${rating}`} className="flex items-center space-x-1 cursor-pointer">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="text-sm text-gray-600">& up</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </FilterSection>

                {/* Preferences Filter */}
                <FilterSection title="Preferences" sectionKey="preferences">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Gender</Label>
                      <Select
                        value={filters.gender}
                        onValueChange={(value) => setFilters((prev) => ({ ...prev, gender: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </FilterSection>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Active Filters */}
            {getActiveFilterCount() > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {filters.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="flex items-center space-x-1">
                    <span>{specialty}</span>
                    <button
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          specialties: prev.specialties.filter((s) => s !== specialty),
                        }))
                      }
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                {filters.rating > 0 && (
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <span>{filters.rating}+ stars</span>
                    <button onClick={() => setFilters((prev) => ({ ...prev, rating: 0 }))}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}

            {/* Loading State */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : viewMode === "map" ? (
              <Card className="h-96">
                <CardContent className="p-6 h-full flex items-center justify-center">
                  <div className="text-center">
                    <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Map View</h3>
                    <p className="text-gray-600">Interactive map showing doctor locations would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            ) : filteredDoctors.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No doctors found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
                  <Button onClick={clearAllFilters}>Clear all filters</Button>
                </CardContent>
              </Card>
            ) : (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              >
                {filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} isListView={viewMode === "list"} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
