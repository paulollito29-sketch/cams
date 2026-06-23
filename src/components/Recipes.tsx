import { useState } from 'react'
import { FiClock, FiBarChart2 } from 'react-icons/fi'
import { recipes } from '../data'
import type { MealType, DietPreference } from '../types'

const mealFilters: { label: string; value: MealType | 'todas' }[] = [
  { label: 'Todas', value: 'todas' },
  { label: 'Desayuno', value: 'desayuno' },
  { label: 'Almuerzo', value: 'almuerzo' },
  { label: 'Snack', value: 'snack' },
  { label: 'Cena', value: 'cena' },
]

const dietFilters: { label: string; value: DietPreference | 'todas' }[] = [
  { label: 'Todas', value: 'todas' },
  { label: 'Sin restricción', value: 'sin_restriccion' },
  { label: 'Vegetariano', value: 'vegetariano' },
  { label: 'Vegano', value: 'vegano' },
]

export default function Recipes() {
  const [mealFilter, setMealFilter] = useState<MealType | 'todas'>('todas')
  const [dietFilter, setDietFilter] = useState<DietPreference | 'todas'>('todas')

  const filtered = recipes.filter(r => {
    if (mealFilter !== 'todas' && r.mealType !== mealFilter) return false
    if (dietFilter !== 'todas' && !r.dietaryTags.includes(dietFilter)) return false
    return true
  })

  return (
    <section id="recetas" className="scroll-mt-16 bg-white py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-800">Recetas Personalizadas</h2>
          <p className="mt-2 text-stone-500">
            Recetas ajustadas a tus necesidades. Elige según tu preferencia y momento del día.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <div className="flex flex-wrap gap-2">
            {mealFilters.map(f => (
              <button key={f.value} onClick={() => setMealFilter(f.value)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${mealFilter === f.value ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>
                {f.label}
              </button>
            ))}
          </div>
          <span className="hidden sm:block w-px bg-stone-300" />
          <div className="flex flex-wrap gap-2">
            {dietFilters.map(f => (
              <button key={f.value} onClick={() => setDietFilter(f.value)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${dietFilter === f.value ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(r => (
            <div key={r.id} className="group rounded-2xl border border-stone-200 bg-white p-5 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-3xl">{r.image}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${r.difficulty === 'fácil' ? 'bg-green-100 text-green-700' : r.difficulty === 'media' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                  {r.difficulty}
                </span>
              </div>
              <h3 className="font-bold text-stone-800">{r.name}</h3>
              <p className="mt-1 text-sm text-stone-500 line-clamp-2">{r.description}</p>
              <div className="mt-3 flex items-center gap-4 text-xs text-stone-400">
                <span className="flex items-center gap-1"><FiClock /> {r.prepTime} min</span>
                <span className="flex items-center gap-1"><FiBarChart2 /> {r.macros.calories} kcal</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {r.dietaryTags.map(t => (
                  <span key={t} className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">
                    {t === 'sin_restriccion' ? 'Todo' : t}
                  </span>
                ))}
              </div>
              <details className="mt-3">
                <summary className="cursor-pointer text-xs font-semibold text-emerald-600 hover:text-emerald-700">
                  Ver ingredientes y macros
                </summary>
                <div className="mt-2 space-y-2 text-xs text-stone-600">
                  <div className="grid grid-cols-2 gap-1">
                    {r.ingredients.map(i => (
                      <span key={i.name} className="text-stone-500">• {i.name}: {i.amount}</span>
                    ))}
                  </div>
                  <div className="flex gap-3 border-t border-stone-100 pt-2 text-xs font-medium">
                    <span className="text-red-600">{r.macros.protein}g proteínas</span>
                    <span className="text-blue-600">{r.macros.carbs}g carbohidratos</span>
                    <span className="text-purple-600">{r.macros.fat}g grasas</span>
                  </div>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
