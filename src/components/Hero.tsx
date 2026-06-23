export default function Hero() {
  return (
    <section
      id="inicio"
      className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-4 pt-16"
    >
      <div className="max-w-3xl text-center">
        <span className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700 mb-6">
          Nutrición Inteligente para Estudiantes
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-800 leading-tight">
          Alimenta tu{' '}
          <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
            rendimiento académico
          </span>
        </h1>
        <p className="mt-4 text-lg text-stone-600 max-w-xl mx-auto">
          Calculamos tus necesidades nutricionales según tu actividad, horarios y
          preferencias. Recibe menús personalizados para rendir al máximo en tus
          estudios.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#calculadora"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 transition-colors"
          >
            Calcular mi plan
          </a>
          <a
            href="#recetas"
            className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
          >
            Ver recetas
          </a>
        </div>
        <div className="mt-16 grid grid-cols-3 gap-6 text-center">
          {[
            { value: '500+', label: 'Recetas' },
            { value: '10k+', label: 'Estudiantes' },
            { value: '4.8★', label: 'Valoración' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-2xl font-bold text-emerald-600">{s.value}</p>
              <p className="text-sm text-stone-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
