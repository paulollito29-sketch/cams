export type ActivityLevel = 'sedentario' | 'ligero' | 'moderado' | 'intenso'

export type DietPreference = 'sin_restriccion' | 'vegetariano' | 'vegano'

export type MealType = 'desayuno' | 'almuerzo' | 'cena' | 'snack'

export interface UserInput {
  weight: number
  height: number
  age: number
  activity: ActivityLevel
  preference: DietPreference
  availableHours: number
  mealSlots: number
}

export interface Macros {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface Ingredient {
  name: string
  amount: string
}

export interface Recipe {
  id: string
  name: string
  description: string
  mealType: MealType
  prepTime: number
  difficulty: 'fácil' | 'media' | 'difícil'
  dietaryTags: DietPreference[]
  ingredients: Ingredient[]
  macros: Macros
  image: string
}

export interface MealPlan {
  meal: string
  time: string
  recipes: Recipe[]
  macros: Macros
}

export interface NutrientInfo {
  name: string
  description: string
  benefits: string
  sources: string[]
  dailyPercent: number
}

export interface CalculatorResult {
  dailyMacros: Macros
  mealPlan: MealPlan[]
  tips: string[]
}
