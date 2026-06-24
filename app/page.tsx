import Header from "../src/components/Header"
import Hero from "../src/components/Hero"
import Calculator from "../src/components/Calculator"
import NutritionInfo from "../src/components/NutritionInfo"
import Recipes from "../src/components/Recipes"
import Footer from "../src/components/Footer"

export default function Home() {
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
