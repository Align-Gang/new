"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, Building } from "lucide-react"
import { useState } from "react"

// Types
type UserType = {
  id: string
  name: string
  jobTitle: string
  department: string
  avatar: string
  hobbies: string[]
}

type EventType = {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
}

// Mock data - exactly 10 people as shown in image
const mockUsers: UserType[] = [
  {
    id: "1",
    name: "Г. Хулан",
    jobTitle: "Дизайнер",
    department: "Дизайн хэлтэс",
    avatar: "/placeholder.svg?height=120&width=120",
    hobbies: ["Сагсан бөмбөг", "Ном", "Астрологи"],
  },
  {
    id: "2",
    name: "Б.Санаа",
    jobTitle: "Хөгжүүлэгч",
    department: "Хөгжүүлэлт хэлтэс",
    avatar: "/placeholder.svg?height=120&width=120",
    hobbies: ["Сагсан бөмбөг", "Ном", "Астрологи"],
  },
  {
    id: "3",
    name: "У.Болд",
    jobTitle: "Дизайнер",
    department: "Дизайн хэлтэс",
    avatar: "/placeholder.svg?height=120&width=120",
    hobbies: ["Сагсан бөмбөг", "Урлаг"],
  },
  {
    id: "4",
    name: "Г.Батсайхан",
    jobTitle: "Дизайнер",
    department: "Дизайн хэлтэс",
    avatar: "/placeholder.svg?height=120&width=120",
    hobbies: ["Сагсан бөмбөг", "Ном", "Видео тоглоом"],
  },
  {
    id: "5",
    name: "Р.Удвал",
    jobTitle: "Хөгжүүлэгч",
    department: "Хөгжүүлэлт хэлтэс",
    avatar: "/placeholder.svg?height=120&width=120",
    hobbies: ["Сагсан бөмбөг", "Бясалгал", "Ном"],
  },
  {
    id: "6",
    name: "Х.Сайханбилэгт",
    jobTitle: "Хүний нөөц",
    department: "HR хэлтэс",
    avatar: "/placeholder.svg?height=120&width=120",
    hobbies: ["Сагсан бөмбөг", "Ном", "Астрологи"],
  },
  {
    id: "7",
    name: "Е.Ундрам",
    jobTitle: "Дизайнер",
    department: "Дизайн хэлтэс",
    avatar: "/placeholder.svg?height=120&width=120",
    hobbies: ["Сагсан бөмбөг", "Ном"],
  },
  {
    id: "8",
    name: "Л.Нранцацралт",
    jobTitle: "Хүний нөөц",
    department: "HR хэлтэс",
    avatar: "/placeholder.svg?height=120&width=120",
    hobbies: ["Сагсан бөмбөг", "Ном", "Сагсан бөмбөг", "Ном"],
  },
  {
    id: "9",
    name: "Б.Бундан",
    jobTitle: "Нягтлан",
    department: "Санхүү хэлтэс",
    avatar: "/placeholder.svg?height=120&width=120",
    hobbies: ["Сагсан бөмбөг", "Ном", "Сагсан бөмбөг", "Ном"],
  },
  {
    id: "10",
    name: "Г.Лувсандорж",
    jobTitle: "Хөгжүүлэгч",
    department: "Хөгжүүлэлт хэлтэс",
    avatar: "/placeholder.svg?height=120&width=120",
    hobbies: ["Сагсан бөмбөг", "Ном"],
  },
]

// User Card Component
const UserCard = ({
  user,
  onSendRequest,
}: {
  user: UserType
  onSendRequest: (userId: string) => void
}) => {
  return (
    <Card className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center space-y-3">
          {/* Avatar */}
          <Avatar className="w-16 h-16">
            <AvatarImage src={user.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-gray-200 text-gray-600">
              {user.name.split(".")[1]?.charAt(0) || user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          {/* Name and Job */}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{user.name}</h3>
            <div className="flex items-center justify-center gap-1 mt-1">
              <Building className="w-3 h-3 text-gray-500" />
              <p className="text-xs text-gray-600">{user.jobTitle}</p>
            </div>
          </div>

          {/* Hobbies */}
          <div className="space-y-1 w-full">
            {user.hobbies.slice(0, 2).map((hobby, index) => (
              <div key={index} className="flex justify-between items-center">
                <Badge variant="outline" className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 border-blue-200">
                  {hobby}
                </Badge>
                <span className="text-xs text-blue-600">Ном</span>
              </div>
            ))}
          </div>

          {/* Send Request Button */}
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs py-1.5 text-blue-600 border-blue-200 hover:bg-blue-50"
            onClick={() => onSendRequest(user.id)}
          >
            Хүсэлт илгээх
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Event Form Modal
const EventFormModal = ({
  isOpen,
  onClose,
  onCreateEvent,
}: {
  isOpen: boolean
  onClose: () => void
  onCreateEvent: (eventData: EventType) => void
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "сагсан бөмбөг",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreateEvent({
      id: Date.now().toString(),
      ...formData,
    })
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "сагсан бөмбөг",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-screen">
        <DialogHeader>
          <DialogTitle>Эвент үүсгэх</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Гарчиг</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Тайлбар</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Огноо</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Цаг</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Байршил</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Болих
            </Button>
            <Button type="submit">Үүсгэх</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Main Component
export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("сагсан бөмбөг")
  const [activeTab, setActiveTab] = useState("employees")
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [sentRequests, setSentRequests] = useState<Set<string>>(new Set())

  const handleSendRequest = (userId: string) => {
    setSentRequests((prev) => new Set(prev).add(userId))
  }

  const handleCreateEvent = (eventData: EventType) => {
    console.log("New event created:", eventData)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="fixed inset-0 flex flex-col items-center justify-center p-8 space-y-8 bg-white">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Сонирхлоороо нэгдэн цагийг хамтдаа өнгөрүүлцгээе
          </h1>

          {/* Controls */}
          <div className="flex items-center justify-between mb-6">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="сагсан бөмбөг">Сагсан бөмбөг</SelectItem>
                <SelectItem value="хоол хийх">Хоол хийх</SelectItem>
                <SelectItem value="ном унших">Ном унших</SelectItem>
                <SelectItem value="астрологи">Астрологи</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={() => setIsEventModalOpen(true)} className="bg-blue-500 hover:bg-blue-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Эвент үүсгэх
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("employees")}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "employees"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Ажилчдын жагсаалт
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "events"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Эвентын жагсаалт
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "employees" && (
          <div className="grid grid-cols-5 gap-4">
            <AnimatePresence>
              {mockUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <UserCard user={user} onSendRequest={handleSendRequest} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {activeTab === "events" && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Эвентүүд байхгүй байна</p>
          </div>
        )}
      </div>

      {/* Event Modal */}
      <EventFormModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onCreateEvent={handleCreateEvent}
      />
    </div>
  )
}
