import { GiHealthNormal } from 'react-icons/gi'

const links = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#calculadora', label: 'Calculadora' },
  { href: '#nutrientes', label: 'Nutrientes' },
  { href: '#recetas', label: 'Recetas' },
]

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-stone-200">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#inicio" className="flex items-center gap-2 text-xl font-bold text-emerald-700">
          <GiHealthNormal className="text-2xl" />
          Nutrigo
        </a>
        <ul className="flex gap-6 text-sm font-medium text-stone-600">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-emerald-600 transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
