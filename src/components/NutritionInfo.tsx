import { nutrientInfo } from '../data'

export default function NutritionInfo() {
  return (
    <section id="nutrientes" className="scroll-mt-16 bg-stone-50 py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-800">Información Nutricional</h2>
          <p className="mt-2 text-stone-500">
            Conoce los nutrientes clave para tu rendimiento académico y dónde encontrarlos.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {nutrientInfo.map(n => (
            <div key={n.name} className="group rounded-2xl border border-stone-200 bg-white p-5 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-bold text-stone-800">{n.name}</h3>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  {n.dailyPercent}% diario
                </span>
              </div>
              <p className="mb-2 text-sm text-stone-500">{n.description}</p>
              <p className="mb-3 text-xs text-stone-600 leading-relaxed">{n.benefits}</p>
              <div>
                <p className="mb-1 text-xs font-semibold text-stone-500">Fuentes:</p>
                <div className="flex flex-wrap gap-1">
                  {n.sources.map(s => (
                    <span key={s} className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
