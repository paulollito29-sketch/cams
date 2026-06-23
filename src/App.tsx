import Header from './components/Header'
import Hero from './components/Hero'
import Calculator from './components/Calculator'
import NutritionInfo from './components/NutritionInfo'
import Recipes from './components/Recipes'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Calculator />
        <NutritionInfo />
        <Recipes />
      </main>
      <Footer />
    </>
  )
}
