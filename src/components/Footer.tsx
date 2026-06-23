import { GiHealthNormal } from 'react-icons/gi'

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white py-8 px-4">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center text-sm text-stone-400">
        <div className="flex items-center gap-2 text-emerald-700 font-semibold">
          <GiHealthNormal />
          Nutrigo
        </div>
        <p>Nutrición inteligente para tu rendimiento académico.</p>
        <p>Nutrigo 2025 — Prototipo</p>
      </div>
    </footer>
  )
}
