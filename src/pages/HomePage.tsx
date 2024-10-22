import React, { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockRecipes = [
  { id: 1, title: 'Spaghetti Carbonara', cuisine: 'Italian', diet: 'Vegetarian', image: '/placeholder.svg?height=200&width=300', description: 'A classic Italian pasta dish.' },
  { id: 2, title: 'Chicken Stir Fry', cuisine: 'Chinese', diet: 'Gluten-free', image: '/placeholder.svg?height=200&width=300', description: 'A quick and easy Chinese-inspired dish.' },
  { id: 3, title: 'Vegan Buddha Bowl', cuisine: 'International', diet: 'Vegan', image: '/placeholder.svg?height=200&width=300', description: 'A nutritious and colorful vegan meal.' },
  // Add more mock recipes as needed
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [cuisineFilter, setCuisineFilter] = useState('')
  const [dietFilter, setDietFilter] = useState('')

  const filteredRecipes = mockRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (cuisineFilter === '' || recipe.cuisine === cuisineFilter) &&
    (dietFilter === '' || recipe.diet === dietFilter)
  )

  return (
    <div className="container mx-auto px-4 py-12">

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          <div className="flex gap-4">
            <Select
              value={cuisineFilter}
              onValueChange={setCuisineFilter}
              // placeholder="Cuisine"
            >
              <option value="">All Cuisines</option>
              <option value="Italian">Italian</option>
              <option value="Chinese">Chinese</option>
              <option value="International">International</option>
            </Select>
            <Select
              value={dietFilter}
              onValueChange={setDietFilter}
              // placeholder="Diet"
            >
              <option value="">All Diets</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Gluten-free">Gluten-free</option>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.map(recipe => (
          <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
                <p className="text-gray-600 mb-2">{recipe.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{recipe.cuisine}</span>
                  <span>{recipe.diet}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}