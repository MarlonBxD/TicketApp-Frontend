
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useNavigate } from "react-router-dom"

interface NuevoTicketFormProps {
  categories: Array<{
    id: number
    name: string
    description: string
  }>
  userId: string
}

export function NuevoTicketForm({ categories, userId }: NuevoTicketFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [categoryId, setCategoryId] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
  }

  const handleCancel = () => {
    setTitle("")
    setDescription("")
    setCategoryId("")
    setLoading(false)
    setError(null)
  }

    



  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Título del Ticket</Label>
            <Input
              id="title"
              type="text"
              placeholder="Describe el problema brevemente"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select value={categoryId} onValueChange={setCategoryId} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe el problema con el mayor detalle posible"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={8}
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Creando..." : "Crear Ticket"}
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
