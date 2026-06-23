import { useState, type FormEvent } from 'react'
import { FiClock, FiBarChart2, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import {
  activityLabels, preferenceLabels, activityFactors,
  calculateBMR, calculateMacros, pickRecipesForPlan, filterRecipes,
} from '../data'
import type { ActivityLevel, DietPreference, CalculatorResult, Macros, MealType } from '../types'

const mealSlots: { name: string; time: string }[] = [
  { name: 'Desayuno', time: '07:00' },
  { name: 'Almuerzo', time: '12:00' },
  { name: 'Snack', time: '16:00' },
  { name: 'Cena', time: '19:30' },
]

const mealNameToType: Record<string, MealType> = {
  Desayuno: 'desayuno', Almuerzo: 'almuerzo',
  Snack: 'snack', Cena: 'cena',
}

function pickSlots(availableHours: number) {
  const count = Math.min(Math.floor(availableHours / 1.5), 4)
  return mealSlots.slice(0, count)
}

function distributeCalories(calories: number, slots: number): number[] {
  if (slots === 1) return [calories]
  if (slots === 2) return [Math.round(calories * 0.45), Math.round(calories * 0.55)]
  if (slots === 3) return [Math.round(calories * 0.3), Math.round(calories * 0.4), Math.round(calories * 0.3)]
  return [Math.round(calories * 0.25), Math.round(calories * 0.35), Math.round(calories * 0.15), Math.round(calories * 0.25)]
}

function RecipeMiniCard({ r }: { r: import('../types').Recipe }) {
  return (
    <div className="rounded-xl border border-stone-200 p-3 hover:shadow-md hover:-translate-y-0.5 transition-all bg-white">
      <div className="flex items-start gap-2 mb-1.5">
        <span className="text-xl shrink-0">{r.image}</span>
        <div className="min-w-0">
          <p className="font-semibold text-stone-800 text-sm leading-tight">{r.name}</p>
          <p className="text-xs text-stone-400 line-clamp-1">{r.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 text-[11px] text-stone-400 mb-1.5">
        <span className="flex items-center gap-1"><FiClock /> {r.prepTime} min</span>
        <span className="flex items-center gap-1"><FiBarChart2 /> {r.macros.calories} kcal</span>
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[11px] font-medium">
        <span className="text-red-600">{r.macros.protein}g prot</span>
        <span className="text-blue-600">{r.macros.carbs}g carb</span>
        <span className="text-purple-600">{r.macros.fat}g fat</span>
      </div>
      <details className="mt-1.5">
        <summary className="cursor-pointer text-[11px] font-semibold text-emerald-600 hover:text-emerald-700">
          Ingredientes
        </summary>
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-stone-500">
          {r.ingredients.map(i => (
            <span key={i.name}>• {i.amount} {i.name.toLowerCase()}</span>
          ))}
        </div>
      </details>
    </div>
  )
}

export default function Calculator() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [activity, setActivity] = useState<ActivityLevel>('sedentario')
  const [preference, setPreference] = useState<DietPreference>('sin_restriccion')
  const [availableHours, setAvailableHours] = useState('4')
  const [result, setResult] = useState<CalculatorResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setExpandedMeal(null)

    const w = parseFloat(weight)
    const h = parseFloat(height)
    const a = parseInt(age)
    const hrs = parseFloat(availableHours)
    const bmr = calculateBMR(w, h, a)
    const { tips, ...macros } = calculateMacros(bmr, activityFactors[activity], preference)

    const slots = pickSlots(hrs)
    const names = slots.map(s => s.name)
    const recipeMap = pickRecipesForPlan(names, preference)
    const calDistribution = distributeCalories(macros.calories, slots.length)

    const mealPlans = slots.map((slot, i) => {
      const cal = calDistribution[i]
      const pctProtein = macros.protein * 4 / macros.calories
      const pctCarbs = macros.carbs * 4 / macros.calories
      const pctFat = macros.fat * 9 / macros.calories
      return {
        meal: slot.name,
        time: slot.time,
        recipes: recipeMap[slot.name] || [],
        macros: {
          calories: cal,
          protein: Math.round(cal * pctProtein / 4),
          carbs: Math.round(cal * pctCarbs / 4),
          fat: Math.round(cal * pctFat / 9),
        } as Macros,
      }
    })

    setTimeout(() => {
      setResult({ dailyMacros: macros, mealPlan: mealPlans, tips })
      setLoading(false)
    }, 500)
  }

  const toggleExpand = (name: string) => {
    setExpandedMeal(expandedMeal === name ? null : name)
  }

  return (
    <section id="calculadora" className="scroll-mt-16 bg-white py-16 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-800">Calculadora Inteligente</h2>
          <p className="mt-2 text-stone-500">
            Tus datos → recetas específicas con horarios, preparación y macros.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5 rounded-2xl border border-stone-200 bg-stone-50 p-6 h-fit">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-600">Peso (kg)</label>
                <input type="number" required min={30} max={300} value={weight} onChange={e => setWeight(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-600">Altura (cm)</label>
                <input type="number" required min={100} max={250} value={height} onChange={e => setHeight(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-600">Edad</label>
                <input type="number" required min={14} max={100} value={age} onChange={e => setAge(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-stone-600">Actividad física</label>
              <select value={activity} onChange={e => setActivity(e.target.value as ActivityLevel)}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none">
                {(Object.entries(activityLabels) as [ActivityLevel, string][]).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-stone-600">Preferencia alimenticia</label>
              <select value={preference} onChange={e => setPreference(e.target.value as DietPreference)}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none">
                {(Object.entries(preferenceLabels) as [DietPreference, string][]).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-stone-600">Horas disponibles para comer hoy</label>
              <input type="range" min={1} max={12} step={0.5} value={availableHours} onChange={e => setAvailableHours(e.target.value)}
                className="w-full accent-emerald-600" />
              <p className="text-xs text-stone-400 text-right">{availableHours} h &rarr; {pickSlots(parseFloat(availableHours)).length} comida(s)</p>
            </div>

            <button type="submit" disabled={loading}
              className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors">
              {loading ? 'Calculando...' : 'Obtener mis recetas'}
            </button>
          </form>

          <div className="lg:col-span-3 rounded-2xl border border-stone-200 bg-white p-6 min-h-[500px]">
            {!result ? (
              <div className="flex h-full items-center justify-center text-stone-400 text-sm">
                Completa el formulario y presiona "Obtener mis recetas"
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-stone-800 mb-3">Metas del día</h3>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {[
                      { label: 'Calorías', value: result.dailyMacros.calories, unit: 'kcal', color: 'bg-amber-100 text-amber-800' },
                      { label: 'Proteínas', value: result.dailyMacros.protein, unit: 'g', color: 'bg-red-100 text-red-800' },
                      { label: 'Carbohidratos', value: result.dailyMacros.carbs, unit: 'g', color: 'bg-blue-100 text-blue-800' },
                      { label: 'Grasas', value: result.dailyMacros.fat, unit: 'g', color: 'bg-purple-100 text-purple-800' },
                    ].map(m => (
                      <div key={m.label} className={`rounded-xl p-3 ${m.color}`}>
                        <p className="text-xl font-bold">{m.value}</p>
                        <p className="text-xs">{m.unit}</p>
                        <p className="text-xs font-medium mt-1">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-stone-800 mb-4">Tus recetas recomendadas</h3>
                  <div className="space-y-4">
                    {result.mealPlan.map(mp => {
                      const mealType = mealNameToType[mp.meal]
                      const isExpanded = expandedMeal === mp.meal
                      const allOptions = mealType
                        ? filterRecipes(mealType, preference).filter(r => !mp.recipes.some(pr => pr.id === r.id))
                        : []

                      return (
                        <div key={mp.meal}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-baseline gap-2">
                              <span className="text-sm font-semibold text-emerald-700 bg-emerald-50 rounded-full px-3 py-0.5">
                                {mp.time}
                              </span>
                              <span className="text-sm font-bold text-stone-700">{mp.meal}</span>
                              <span className="text-xs text-stone-400">— {mp.macros.calories} kcal meta</span>
                            </div>
                            {allOptions.length > 0 && (
                              <button onClick={() => toggleExpand(mp.meal)}
                                className="flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                                {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                                {isExpanded ? 'Ocultar opciones' : `Ver +${allOptions.length} opciones`}
                              </button>
                            )}
                          </div>

                          {mp.recipes.length === 0 ? (
                            <p className="text-sm text-stone-400 italic pl-2">
                              No hay recetas disponibles para esta comida.
                            </p>
                          ) : (
                            <div className="grid gap-3 sm:grid-cols-2">
                              {mp.recipes.map(r => <RecipeMiniCard key={r.id} r={r} />)}
                            </div>
                          )}

                          {isExpanded && allOptions.length > 0 && (
                            <div className="mt-3 border border-emerald-100 rounded-xl bg-emerald-50/50 p-3">
                              <p className="text-xs font-semibold text-emerald-700 mb-2">
                                Más opciones para {mp.meal.toLowerCase()}
                              </p>
                              <div className="grid gap-3 sm:grid-cols-2">
                                {allOptions.map(r => <RecipeMiniCard key={r.id} r={r} />)}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="border-t border-stone-100 pt-4">
                  <h4 className="text-sm font-bold text-stone-700 mb-2">Consejos</h4>
                  <ul className="space-y-1">
                    {result.tips.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
