import type { Recipe, NutrientInfo, ActivityLevel, DietPreference, Macros, MealType } from './types'

export const activityFactors: Record<ActivityLevel, number> = {
  sedentario: 1.2,
  ligero: 1.375,
  moderado: 1.55,
  intenso: 1.725,
}

export const activityLabels: Record<ActivityLevel, string> = {
  sedentario: 'Poco o ningún ejercicio',
  ligero: 'Ejercicio 1-3 días/semana',
  moderado: 'Ejercicio 3-5 días/semana',
  intenso: 'Ejercicio 6-7 días/semana',
}

export const preferenceLabels: Record<DietPreference, string> = {
  sin_restriccion: 'Sin restricción',
  vegetariano: 'Vegetariano',
  vegano: 'Vegano',
}

export function calculateBMR(weight: number, height: number, age: number): number {
  const bmr = 10 * weight + 6.25 * height - 5 * age + 5
  return Math.round(bmr)
}

export function calculateMacros(bmr: number, factor: number, preference: DietPreference): Macros & { tips: string[] } {
  const calories = Math.round(bmr * factor)
  let proteinPct = 0.3
  let carbsPct = 0.4
  let fatPct = 0.3
  const tips: string[] = []

  if (preference === 'vegetariano') {
    proteinPct = 0.25; carbsPct = 0.5; fatPct = 0.25
    tips.push('Como vegetariano, prioriza legumbres, tofu y quinoa para alcanzar tus proteínas.')
  } else if (preference === 'vegano') {
    proteinPct = 0.2; carbsPct = 0.55; fatPct = 0.25
    tips.push('Si eres vegano, asegura vitamina B12 con suplementos y consume legumbres + cereales integrales.')
  } else {
    tips.push('Incluye proteínas magras como pollo, pescado o huevo en cada comida.')
  }

  tips.push('Distribuye tus comidas cada 3-4 horas para mantener energía constante.')
  tips.push('Bebe al menos 2 litros de agua al día.')

  return {
    calories,
    protein: Math.round((calories * proteinPct) / 4),
    carbs: Math.round((calories * carbsPct) / 4),
    fat: Math.round((calories * fatPct) / 9),
    tips,
  }
}

export function suggestMeals(_hours: number, slots: number, _preference: DietPreference): string[] {
  const meals: string[] = []
  if (slots >= 1) meals.push('desayuno')
  if (slots >= 2) meals.push('almuerzo')
  if (slots >= 3) meals.push('snack')
  if (slots >= 4) meals.push('cena')
  return meals
}

export const recipes: Recipe[] = [
  // ── DESAYUNOS ──
  {
    id: 'd1', name: 'Avena con Frutas y Frutos Secos',
    description: 'Avena cocida con plátano, fresas, almendras y canela.',
    mealType: 'desayuno', prepTime: 10, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion', 'vegetariano', 'vegano'],
    ingredients: [
      { name: 'Avena', amount: '1/2 taza' }, { name: 'Plátano', amount: '1 unidad' },
      { name: 'Fresas', amount: '100g' }, { name: 'Almendras', amount: '30g' },
      { name: 'Canela', amount: '1 cdta' },
    ],
    macros: { calories: 380, protein: 12, carbs: 58, fat: 12 }, image: '🥣',
  },
  {
    id: 'd2', name: 'Yogur Griego con Granola',
    description: 'Yogur griego natural con granola casera, miel y arándanos.',
    mealType: 'desayuno', prepTime: 5, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion', 'vegetariano'],
    ingredients: [
      { name: 'Yogur griego', amount: '200g' }, { name: 'Granola', amount: '30g' },
      { name: 'Miel', amount: '1 cdta' }, { name: 'Arándanos', amount: '50g' },
    ],
    macros: { calories: 340, protein: 18, carbs: 42, fat: 12 }, image: '🥛',
  },
  {
    id: 'd3', name: 'Huevos Revueltos con Aguacate',
    description: 'Huevos revueltos cremosos servidos con aguacate y pan integral tostado.',
    mealType: 'desayuno', prepTime: 10, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion', 'vegetariano'],
    ingredients: [
      { name: 'Huevos', amount: '3 unidades' }, { name: 'Aguacate', amount: '1/2 unidad' },
      { name: 'Pan integral', amount: '2 rebanadas' }, { name: 'Aceite de oliva', amount: '1 cdta' },
    ],
    macros: { calories: 420, protein: 22, carbs: 30, fat: 24 }, image: '🍳',
  },
  {
    id: 'd4', name: 'Pan con Palta y Huevo Poche',
    description: 'Pan integral tostado con palta triturada, huevo poche y microgreens.',
    mealType: 'desayuno', prepTime: 12, difficulty: 'media',
    dietaryTags: ['sin_restriccion', 'vegetariano'],
    ingredients: [
      { name: 'Pan integral', amount: '2 rebanadas' }, { name: 'Palta', amount: '1 unidad' },
      { name: 'Huevo', amount: '1 unidad' }, { name: 'Limón', amount: '1/2 unidad' },
      { name: 'Microgreens', amount: '1 puñado' },
    ],
    macros: { calories: 390, protein: 18, carbs: 32, fat: 22 }, image: '🥑',
  },
  {
    id: 'd5', name: 'Smoothie Bowl de Frutas',
    description: 'Batido espeso de frutas con granola, coco rallado y semillas de chía.',
    mealType: 'desayuno', prepTime: 8, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion', 'vegetariano', 'vegano'],
    ingredients: [
      { name: 'Plátano', amount: '1 unidad' }, { name: 'Frutos rojos congelados', amount: '1/2 taza' },
      { name: 'Leche de almendras', amount: '1/2 taza' }, { name: 'Granola', amount: '30g' },
      { name: 'Chía', amount: '1 cda' }, { name: 'Coco rallado', amount: '1 cda' },
    ],
    macros: { calories: 360, protein: 10, carbs: 60, fat: 10 }, image: '🥥',
  },
  {
    id: 'd6', name: 'Arepa de Queso con Jugo Natural',
    description: 'Arepa de maíz rellena de queso blanco acompañada de jugo de naranja natural.',
    mealType: 'desayuno', prepTime: 15, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion', 'vegetariano'],
    ingredients: [
      { name: 'Harina de maíz', amount: '1/2 taza' }, { name: 'Queso blanco', amount: '60g' },
      { name: 'Naranjas', amount: '3 unidades' }, { name: 'Mantequilla', amount: '1 cdta' },
    ],
    macros: { calories: 410, protein: 14, carbs: 50, fat: 18 }, image: '🫓',
  },
  {
    id: 'd7', name: 'Tostadas Francesas Integrales',
    description: 'Pan integral remojado en huevo y canela, dorado con miel y frutas.',
    mealType: 'desayuno', prepTime: 12, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion', 'vegetariano'],
    ingredients: [
      { name: 'Pan integral', amount: '3 rebanadas' }, { name: 'Huevo', amount: '2 unidades' },
      { name: 'Leche', amount: '1/4 taza' }, { name: 'Canela', amount: '1 cdta' },
      { name: 'Miel', amount: '1 cda' }, { name: 'Fresas', amount: '50g' },
    ],
    macros: { calories: 400, protein: 20, carbs: 48, fat: 14 }, image: '🍞',
  },
  {
    id: 'd8', name: 'Batido Verde de Proteína',
    description: 'Batido de proteína vegetal con espinaca, piña, jengibre y leche de coco.',
    mealType: 'desayuno', prepTime: 5, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion', 'vegetariano', 'vegano'],
    ingredients: [
      { name: 'Proteína vegetal', amount: '1 scoop' }, { name: 'Espinaca', amount: '1 puñado' },
      { name: 'Piña', amount: '1 taza' }, { name: 'Jengibre', amount: '1 cm' },
      { name: 'Leche de coco', amount: '1 taza' },
    ],
    macros: { calories: 320, protein: 28, carbs: 38, fat: 8 }, image: '🥤',
  },
  {
    id: 'd9', name: 'Chilaquiles Saludables',
    description: 'Totopos horneados con salsa verde, crema light, queso panela y frijoles.',
    mealType: 'desayuno', prepTime: 20, difficulty: 'media',
    dietaryTags: ['sin_restriccion', 'vegetariano'],
    ingredients: [
      { name: 'Totopos horneados', amount: '1 taza' }, { name: 'Salsa verde', amount: '1/2 taza' },
      { name: 'Crema light', amount: '2 cdas' }, { name: 'Queso panela', amount: '50g' },
      { name: 'Frijoles refritos', amount: '1/2 taza' },
    ],
    macros: { calories: 450, protein: 18, carbs: 55, fat: 18 }, image: '🌮',
  },
  {
    id: 'd10', name: 'Omelette de Espinacas y Champiñones',
    description: 'Omelette relleno de espinacas salteadas, champiñones y queso derretido.',
    mealType: 'desayuno', prepTime: 10, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion', 'vegetariano'],
    ingredients: [
      { name: 'Huevos', amount: '3 unidades' }, { name: 'Espinaca', amount: '1 puñado' },
      { name: 'Champiñones', amount: '100g' }, { name: 'Queso rallado', amount: '30g' },
    ],
    macros: { calories: 350, protein: 28, carbs: 6, fat: 24 }, image: '🥚',
  },

  // ── ALMUERZOS ──
  {
    id: 'l1', name: 'Bowl de Quinoa y Pollo',
    description: 'Quinoa con pechuga de pollo grillé, aguacate y verduras frescas.',
    mealType: 'almuerzo', prepTime: 25, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion'],
    ingredients: [
      { name: 'Quinoa', amount: '1 taza' }, { name: 'Pechuga de pollo', amount: '150g' },
      { name: 'Aguacate', amount: '1/2 unidad' }, { name: 'Tomate cherry', amount: '100g' },
      { name: 'Espinaca', amount: '1 puñado' },
    ],
    macros: { calories: 520, protein: 38, carbs: 45, fat: 18 }, image: '🥗',
  },
  {
    id: 'l2', name: 'Wrap Integral de Pavo',
    description: 'Tortilla integral con pavo, queso fresco, lechuga y tomate.',
    mealType: 'almuerzo', prepTime: 15, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion'],
    ingredients: [
      { name: 'Tortilla integral', amount: '1 unidad' }, { name: 'Pavo', amount: '100g' },
      { name: 'Queso fresco', amount: '50g' }, { name: 'Lechuga', amount: '1 puñado' },
      { name: 'Tomate', amount: '1/2 unidad' },
    ],
    macros: { calories: 390, protein: 30, carbs: 35, fat: 14 }, image: '🌯',
  },
  {
    id: 'l3', name: 'Tofu Salteado con Verduras',
    description: 'Tofu firme salteado con brócoli, zanahoria y salsa de soja sobre arroz integral.',
    mealType: 'almuerzo', prepTime: 20, difficulty: 'fácil',
    dietaryTags: ['vegetariano', 'vegano'],
    ingredients: [
      { name: 'Tofu firme', amount: '200g' }, { name: 'Brócoli', amount: '1 taza' },
      { name: 'Zanahoria', amount: '1 unidad' }, { name: 'Salsa de soja', amount: '2 cdas' },
      { name: 'Arroz integral', amount: '1 taza' },
    ],
    macros: { calories: 420, protein: 28, carbs: 50, fat: 12 }, image: '🥬',
  },
  {
    id: 'l4', name: 'Lentejas Estofadas',
    description: 'Lentejas guisadas con verduras, comino y acompañadas de arroz blanco.',
    mealType: 'almuerzo', prepTime: 35, difficulty: 'media',
    dietaryTags: ['vegetariano', 'vegano'],
    ingredients: [
      { name: 'Lentejas', amount: '200g' }, { name: 'Zanahoria', amount: '1 unidad' },
      { name: 'Cebolla', amount: '1 unidad' }, { name: 'Arroz', amount: '1/2 taza' },
      { name: 'Comino', amount: '1 cdta' },
    ],
    macros: { calories: 450, protein: 24, carbs: 65, fat: 8 }, image: '🍲',
  },
  {
    id: 'l5', name: 'Ceviche de Pescado',
    description: 'Pescado blanco marinado en limón con cebolla morada, cilantro y camote.',
    mealType: 'almuerzo', prepTime: 20, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion'],
    ingredients: [
      { name: 'Pescado blanco', amount: '200g' }, { name: 'Limón', amount: '4 unidades' },
      { name: 'Cebolla morada', amount: '1/2 unidad' }, { name: 'Cilantro', amount: '1 puñado' },
      { name: 'Camote', amount: '1 unidad' },
    ],
    macros: { calories: 380, protein: 35, carbs: 40, fat: 6 }, image: '🐟',
  },
  {
    id: 'l6', name: 'Bowl Buddha de Garbanzos',
    description: 'Base de quinoa con garbanzos especiados, batata asada, aguacate y tahini.',
    mealType: 'almuerzo', prepTime: 30, difficulty: 'media',
    dietaryTags: ['vegetariano', 'vegano'],
    ingredients: [
      { name: 'Quinoa', amount: '3/4 taza' }, { name: 'Garbanzos', amount: '150g' },
      { name: 'Batata', amount: '1 unidad' }, { name: 'Aguacate', amount: '1/2 unidad' },
      { name: 'Tahini', amount: '2 cdas' },
    ],
    macros: { calories: 520, protein: 22, carbs: 68, fat: 18 }, image: '🧘',
  },
  {
    id: 'l7', name: 'Pasta Integral con Pesto y Cherry',
    description: 'Pasta integral con pesto casero de albahaca, tomates cherry y piñones.',
    mealType: 'almuerzo', prepTime: 20, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion', 'vegetariano', 'vegano'],
    ingredients: [
      { name: 'Pasta integral', amount: '200g' }, { name: 'Albahaca', amount: '1 puñado' },
      { name: 'Piñones', amount: '30g' }, { name: 'Tomates cherry', amount: '100g' },
      { name: 'Aceite de oliva', amount: '2 cdas' },
    ],
    macros: { calories: 480, protein: 16, carbs: 62, fat: 20 }, image: '🍝',
  },
  {
    id: 'l8', name: 'Ensalada César con Pollo',
    description: 'Lechuga romana, pollo grillé, crutones integrales, queso parmesano y aderezo ligero.',
    mealType: 'almuerzo', prepTime: 20, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion'],
    ingredients: [
      { name: 'Lechuga romana', amount: '2 tazas' }, { name: 'Pechuga de pollo', amount: '150g' },
      { name: 'Crutones integrales', amount: '1/2 taza' }, { name: 'Queso parmesano', amount: '20g' },
      { name: 'Aderezo César light', amount: '2 cdas' },
    ],
    macros: { calories: 410, protein: 38, carbs: 22, fat: 18 }, image: '🥬',
  },
  {
    id: 'l9', name: 'Tacos de Pescado con Repollo',
    description: 'Tacos de pescado empanizado horneado con salsa de repollo cremoso y limón.',
    mealType: 'almuerzo', prepTime: 25, difficulty: 'media',
    dietaryTags: ['sin_restriccion'],
    ingredients: [
      { name: 'Pescado blanco', amount: '180g' }, { name: 'Tortillas de maíz', amount: '3 unidades' },
      { name: 'Repollo', amount: '1 taza' }, { name: 'Crema ácida', amount: '2 cdas' },
      { name: 'Limón', amount: '1 unidad' },
    ],
    macros: { calories: 430, protein: 32, carbs: 40, fat: 16 }, image: '🌮',
  },
  {
    id: 'l10', name: 'Salmón Teriyaki con Verduras',
    description: 'Salmón glaseado con salsa teriyaki casera, acompañado de verduras salteadas y arroz.',
    mealType: 'almuerzo', prepTime: 25, difficulty: 'media',
    dietaryTags: ['sin_restriccion'],
    ingredients: [
      { name: 'Salmón', amount: '180g' }, { name: 'Salsa teriyaki', amount: '3 cdas' },
      { name: 'Pimiento morrón', amount: '1/2 unidad' }, { name: 'Brócoli', amount: '1 taza' },
      { name: 'Arroz basmati', amount: '3/4 taza' },
    ],
    macros: { calories: 510, protein: 38, carbs: 50, fat: 16 }, image: '🍣',
  },
  {
    id: 'l11', name: 'Ensalada de Quinoa y Remolacha',
    description: 'Quinoa con remolacha asada, naranja, rúcula, nueces y vinagreta balsámica.',
    mealType: 'almuerzo', prepTime: 25, difficulty: 'fácil',
    dietaryTags: ['vegetariano', 'vegano'],
    ingredients: [
      { name: 'Quinoa', amount: '1 taza' }, { name: 'Remolacha', amount: '1 unidad' },
      { name: 'Naranja', amount: '1/2 unidad' }, { name: 'Rúcula', amount: '1 puñado' },
      { name: 'Nueces', amount: '30g' }, { name: 'Vinagre balsámico', amount: '1 cda' },
    ],
    macros: { calories: 440, protein: 16, carbs: 58, fat: 18 }, image: '🥗',
  },
  {
    id: 'l12', name: 'Wok de Verduras con Pollo',
    description: 'Pollo salteado con verduras variadas, jengibre y salsa de soja en wok.',
    mealType: 'almuerzo', prepTime: 20, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion'],
    ingredients: [
      { name: 'Pechuga de pollo', amount: '150g' }, { name: 'Pimiento morrón', amount: '1/2 unidad' },
      { name: 'Brócoli', amount: '1 taza' }, { name: 'Zanahoria', amount: '1 unidad' },
      { name: 'Jengibre', amount: '1 cm' }, { name: 'Salsa de soja', amount: '2 cdas' },
    ],
    macros: { calories: 400, protein: 35, carbs: 28, fat: 16 }, image: '🥢',
  },
  {
    id: 'l13', name: 'Berenjena Rellena de Quinoa',
    description: 'Berenjena horneada rellena de quinoa, vegetales y salsa de tomate especiada.',
    mealType: 'almuerzo', prepTime: 35, difficulty: 'media',
    dietaryTags: ['vegetariano', 'vegano'],
    ingredients: [
      { name: 'Berenjena', amount: '1 unidad' }, { name: 'Quinoa', amount: '1/2 taza' },
      { name: 'Tomate triturado', amount: '1/2 taza' }, { name: 'Cebolla', amount: '1/2 unidad' },
      { name: 'Pimiento', amount: '1/2 unidad' },
    ],
    macros: { calories: 380, protein: 16, carbs: 52, fat: 12 }, image: '🍆',
  },
  {
    id: 'l14', name: 'Fajitas de Pollo con Pimientos',
    description: 'Tiras de pollo salteadas con pimientos y cebolla, servidas con tortillas y guacamole.',
    mealType: 'almuerzo', prepTime: 25, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion'],
    ingredients: [
      { name: 'Pechuga de pollo', amount: '150g' }, { name: 'Pimiento morrón', amount: '1 unidad' },
      { name: 'Cebolla', amount: '1/2 unidad' }, { name: 'Tortillas de maíz', amount: '3 unidades' },
      { name: 'Guacamole', amount: '3 cdas' },
    ],
    macros: { calories: 460, protein: 35, carbs: 42, fat: 16 }, image: '🌯',
  },
  {
    id: 'l15', name: 'Curry de Garbanzos con Arroz',
    description: 'Garbanzos en salsa de curry cremosa con leche de coco, servido con arroz basmati.',
    mealType: 'almuerzo', prepTime: 25, difficulty: 'media',
    dietaryTags: ['vegetariano', 'vegano'],
    ingredients: [
      { name: 'Garbanzos', amount: '200g' }, { name: 'Leche de coco', amount: '1/2 lata' },
      { name: 'Pasta de curry', amount: '1 cda' }, { name: 'Cebolla', amount: '1/2 unidad' },
      { name: 'Arroz basmati', amount: '3/4 taza' },
    ],
    macros: { calories: 480, protein: 20, carbs: 62, fat: 18 }, image: '🍛',
  },

  // ── SNACKS ──
  {
    id: 's1', name: 'Smoothie Verde Energético',
    description: 'Batido de espinaca, plátano, manzana y proteína vegetal en polvo.',
    mealType: 'snack', prepTime: 5, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion', 'vegetariano', 'vegano'],
    ingredients: [
      { name: 'Espinaca', amount: '1 puñado' }, { name: 'Plátano', amount: '1 unidad' },
      { name: 'Manzana', amount: '1/2 unidad' }, { name: 'Proteína vegetal', amount: '1 scoop' },
      { name: 'Agua', amount: '1 taza' },
    ],
    macros: { calories: 280, protein: 22, carbs: 42, fat: 4 }, image: '🥤',
  },
  {
    id: 's2', name: 'Hummus con Crudités',
    description: 'Hummus de garbanzo con bastones de zanahoria, apio, pepino y pimiento.',
    mealType: 'snack', prepTime: 10, difficulty: 'fácil',
    dietaryTags: ['vegetariano', 'vegano'],
    ingredients: [
      { name: 'Garbanzos cocidos', amount: '150g' }, { name: 'Tahini', amount: '1 cda' },
      { name: 'Zanahoria', amount: '1 unidad' }, { name: 'Apio', amount: '2 tallos' },
      { name: 'Pepino', amount: '1/2 unidad' },
    ],
    macros: { calories: 250, protein: 12, carbs: 28, fat: 12 }, image: '🧆',
  },
  {
    id: 's3', name: 'Fruta Fresca con Mantequilla de Maní',
    description: 'Manzana y plátano en rodajas con mantequilla de maní natural y canela.',
    mealType: 'snack', prepTime: 3, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion', 'vegetariano', 'vegano'],
    ingredients: [
      { name: 'Manzana', amount: '1 unidad' }, { name: 'Plátano', amount: '1 unidad' },
      { name: 'Mantequilla de maní', amount: '2 cdas' }, { name: 'Canela', amount: '1 pizca' },
    ],
    macros: { calories: 290, protein: 10, carbs: 40, fat: 12 }, image: '🍎',
  },
  {
    id: 's4', name: 'Batido de Proteína con Frutos Rojos',
    description: 'Batido cremoso de proteína con frutos rojos congelados, yogur y un toque de miel.',
    mealType: 'snack', prepTime: 5, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion', 'vegetariano'],
    ingredients: [
      { name: 'Proteína whey', amount: '1 scoop' }, { name: 'Frutos rojos congelados', amount: '1/2 taza' },
      { name: 'Yogur griego', amount: '100g' }, { name: 'Miel', amount: '1 cdta' },
      { name: 'Leche', amount: '3/4 taza' },
    ],
    macros: { calories: 310, protein: 30, carbs: 34, fat: 6 }, image: '🫐',
  },
  {
    id: 's5', name: 'Chips de Kale al Horno',
    description: 'Kale crujiente horneado con aceite de oliva, sal marina y levadura nutricional.',
    mealType: 'snack', prepTime: 12, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion', 'vegetariano', 'vegano'],
    ingredients: [
      { name: 'Kale', amount: '2 tazas' }, { name: 'Aceite de oliva', amount: '1 cda' },
      { name: 'Sal marina', amount: '1 pizca' }, { name: 'Levadura nutricional', amount: '1 cda' },
    ],
    macros: { calories: 120, protein: 6, carbs: 12, fat: 6 }, image: '🥬',
  },
  {
    id: 's6', name: 'Barritas de Avena Caseras',
    description: 'Barritas de avena horneadas con plátano, nueces, chispas de chocolate y miel.',
    mealType: 'snack', prepTime: 25, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion', 'vegetariano'],
    ingredients: [
      { name: 'Avena', amount: '1 taza' }, { name: 'Plátano', amount: '1 unidad' },
      { name: 'Nueces', amount: '30g' }, { name: 'Chispas de chocolate', amount: '20g' },
      { name: 'Miel', amount: '2 cdas' },
    ],
    macros: { calories: 220, protein: 6, carbs: 35, fat: 8 }, image: '🍪',
  },
  {
    id: 's7', name: 'Yogur con Frutos Rojos y Semillas',
    description: 'Yogur natural con frutos rojos frescos, semillas de chía y almendras laminadas.',
    mealType: 'snack', prepTime: 3, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion', 'vegetariano'],
    ingredients: [
      { name: 'Yogur natural', amount: '150g' }, { name: 'Frutos rojos', amount: '1/2 taza' },
      { name: 'Chía', amount: '1 cda' }, { name: 'Almendras laminadas', amount: '15g' },
    ],
    macros: { calories: 200, protein: 12, carbs: 24, fat: 8 }, image: '🥣',
  },
  {
    id: 's8', name: 'Rollitos de Pepino con Queso',
    description: 'Láminas de pepino rellenas de queso crema, eneldo y salmón ahumado.',
    mealType: 'snack', prepTime: 8, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion'],
    ingredients: [
      { name: 'Pepino', amount: '1 unidad' }, { name: 'Queso crema', amount: '60g' },
      { name: 'Salmón ahumado', amount: '50g' }, { name: 'Eneldo', amount: '1 ramita' },
    ],
    macros: { calories: 180, protein: 14, carbs: 6, fat: 12 }, image: '🥒',
  },
  {
    id: 's9', name: 'Puñado de Frutos Secos',
    description: 'Mix de almendras, nueces, pistachos, arándanos deshidratados y pepitas de calabaza.',
    mealType: 'snack', prepTime: 1, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion', 'vegetariano', 'vegano'],
    ingredients: [
      { name: 'Almendras', amount: '20g' }, { name: 'Nueces', amount: '20g' },
      { name: 'Pistachos', amount: '15g' }, { name: 'Arándanos deshidratados', amount: '15g' },
      { name: 'Pepitas de calabaza', amount: '10g' },
    ],
    macros: { calories: 260, protein: 10, carbs: 18, fat: 18 }, image: '🥜',
  },
  {
    id: 's10', name: 'Tostada de Palta y Tomate',
    description: 'Pan integral tostado con palta triturada, tomate cherry albahaca y un toque de limón.',
    mealType: 'snack', prepTime: 5, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion', 'vegetariano', 'vegano'],
    ingredients: [
      { name: 'Pan integral', amount: '1 rebanada' }, { name: 'Palta', amount: '1/2 unidad' },
      { name: 'Tomate cherry', amount: '50g' }, { name: 'Albahaca', amount: '3 hojas' },
      { name: 'Limón', amount: '1/2 unidad' },
    ],
    macros: { calories: 190, protein: 6, carbs: 20, fat: 10 }, image: '🥪',
  },

  // ── CENAS ──
  {
    id: 'c1', name: 'Salmón al Horno con Espárragos',
    description: 'Salmón glaseado con limón y eneldo, servido con espárragos y puré de boniato.',
    mealType: 'cena', prepTime: 30, difficulty: 'media',
    dietaryTags: ['sin_restriccion'],
    ingredients: [
      { name: 'Salmón', amount: '180g' }, { name: 'Espárragos', amount: '100g' },
      { name: 'Boniato', amount: '1 unidad' }, { name: 'Limón', amount: '1/2 unidad' },
      { name: 'Aceite de oliva', amount: '1 cda' }, { name: 'Eneldo', amount: '1 ramita' },
    ],
    macros: { calories: 490, protein: 40, carbs: 35, fat: 20 }, image: '🐟',
  },
  {
    id: 'c2', name: 'Omelette de Claras con Champiñones',
    description: 'Claras batidas con champiñones salteados, espinaca y queso light.',
    mealType: 'cena', prepTime: 15, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion', 'vegetariano'],
    ingredients: [
      { name: 'Claras de huevo', amount: '4 unidades' }, { name: 'Champiñones', amount: '100g' },
      { name: 'Espinaca', amount: '1 puñado' }, { name: 'Queso light', amount: '30g' },
    ],
    macros: { calories: 310, protein: 35, carbs: 8, fat: 14 }, image: '🍳',
  },
  {
    id: 'c3', name: 'Garbanzos al Curry',
    description: 'Garbanzos en salsa de curry con leche de coco, espinaca y arroz basmati.',
    mealType: 'cena', prepTime: 25, difficulty: 'media',
    dietaryTags: ['vegetariano', 'vegano'],
    ingredients: [
      { name: 'Garbanzos', amount: '200g' }, { name: 'Leche de coco', amount: '1/2 lata' },
      { name: 'Curry en pasta', amount: '1 cda' }, { name: 'Arroz basmati', amount: '1/2 taza' },
      { name: 'Cebolla', amount: '1/2 unidad' }, { name: 'Espinaca', amount: '1 puñado' },
    ],
    macros: { calories: 460, protein: 20, carbs: 58, fat: 16 }, image: '🍛',
  },
  {
    id: 'c4', name: 'Pechuga de Pollo con Batata',
    description: 'Pechuga de pollo a la plancha con batata asada y ensalada verde de acompañamiento.',
    mealType: 'cena', prepTime: 30, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion'],
    ingredients: [
      { name: 'Pechuga de pollo', amount: '150g' }, { name: 'Batata', amount: '1 unidad' },
      { name: 'Lechuga', amount: '1 puñado' }, { name: 'Aceite de oliva', amount: '1 cda' },
      { name: 'Limón', amount: '1/2 unidad' },
    ],
    macros: { calories: 400, protein: 36, carbs: 38, fat: 12 }, image: '🍗',
  },
  {
    id: 'c5', name: 'Ensalada de Atún con Aguacate',
    description: 'Ensalada fresca de atún, aguacate, huevo duro, tomate cherry y vinagreta de mostaza.',
    mealType: 'cena', prepTime: 12, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion'],
    ingredients: [
      { name: 'Atún en lata', amount: '1 lata' }, { name: 'Aguacate', amount: '1/2 unidad' },
      { name: 'Huevo duro', amount: '1 unidad' }, { name: 'Tomate cherry', amount: '100g' },
      { name: 'Mostaza', amount: '1 cdta' }, { name: 'Lechuga', amount: '2 tazas' },
    ],
    macros: { calories: 370, protein: 32, carbs: 12, fat: 22 }, image: '🥗',
  },
  {
    id: 'c6', name: 'Sopa de Verduras con Quinoa',
    description: 'Sopa de verduras de temporada con quinoa, servida caliente con un toque de jengibre.',
    mealType: 'cena', prepTime: 30, difficulty: 'fácil',
    dietaryTags: ['vegetariano', 'vegano'],
    ingredients: [
      { name: 'Zanahoria', amount: '1 unidad' }, { name: 'Apio', amount: '2 tallos' },
      { name: 'Calabacín', amount: '1/2 unidad' }, { name: 'Quinoa', amount: '1/4 taza' },
      { name: 'Jengibre', amount: '1 cm' }, { name: 'Caldo de verduras', amount: '3 tazas' },
    ],
    macros: { calories: 280, protein: 12, carbs: 48, fat: 4 }, image: '🥣',
  },
  {
    id: 'c7', name: 'Pescado al Vapor con Verduras',
    description: 'Filete de pescado blanco cocido al vapor con brócoli, zanahoria y salsa de soja ligera.',
    mealType: 'cena', prepTime: 20, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion'],
    ingredients: [
      { name: 'Pescado blanco', amount: '180g' }, { name: 'Brócoli', amount: '1 taza' },
      { name: 'Zanahoria', amount: '1 unidad' }, { name: 'Salsa de soja baja', amount: '1 cda' },
      { name: 'Jengibre', amount: '1 cm' },
    ],
    macros: { calories: 320, protein: 38, carbs: 18, fat: 8 }, image: '🐟',
  },
  {
    id: 'c8', name: 'Revuelto de Tofu con Verduras',
    description: 'Tofu desmenuzado salteado con cúrcuma, verduras y espinaca, similar a un revuelto de huevo.',
    mealType: 'cena', prepTime: 15, difficulty: 'fácil',
    dietaryTags: ['vegetariano', 'vegano'],
    ingredients: [
      { name: 'Tofu firme', amount: '200g' }, { name: 'Cúrcuma', amount: '1/2 cdta' },
      { name: 'Pimiento', amount: '1/2 unidad' }, { name: 'Cebolla', amount: '1/2 unidad' },
      { name: 'Espinaca', amount: '1 puñado' },
    ],
    macros: { calories: 300, protein: 24, carbs: 16, fat: 16 }, image: '🥬',
  },
  {
    id: 'c9', name: 'Calabacín Relleno de Carne Magra',
    description: 'Calabacín relleno de carne molida magra, tomate, arroz integral y queso gratinado.',
    mealType: 'cena', prepTime: 35, difficulty: 'media',
    dietaryTags: ['sin_restriccion'],
    ingredients: [
      { name: 'Calabacín', amount: '2 unidades' }, { name: 'Carne molida magra', amount: '120g' },
      { name: 'Arroz integral', amount: '1/4 taza' }, { name: 'Tomate triturado', amount: '1/2 taza' },
      { name: 'Queso rallado', amount: '30g' },
    ],
    macros: { calories: 380, protein: 30, carbs: 32, fat: 14 }, image: '🥒',
  },
  {
    id: 'c10', name: 'Crema de Calabaza con Jengibre',
    description: 'Crema suave de calabaza con jengibre, leche de coco y semillas de calabaza tostadas.',
    mealType: 'cena', prepTime: 25, difficulty: 'fácil',
    dietaryTags: ['vegetariano', 'vegano'],
    ingredients: [
      { name: 'Calabaza', amount: '300g' }, { name: 'Jengibre', amount: '1 cm' },
      { name: 'Leche de coco', amount: '1/4 taza' }, { name: 'Cebolla', amount: '1/2 unidad' },
      { name: 'Semillas de calabaza', amount: '15g' },
    ],
    macros: { calories: 260, protein: 8, carbs: 34, fat: 12 }, image: '🎃',
  },
  {
    id: 'c11', name: 'Ensalada Templada de Lentejas',
    description: 'Lentejas verdes tibias con verduras asadas, vinagreta balsámica y hierbas frescas.',
    mealType: 'cena', prepTime: 20, difficulty: 'fácil',
    dietaryTags: ['vegetariano', 'vegano'],
    ingredients: [
      { name: 'Lentejas verdes', amount: '150g' }, { name: 'Pimiento', amount: '1/2 unidad' },
      { name: 'Calabacín', amount: '1/2 unidad' }, { name: 'Vinagre balsámico', amount: '1 cda' },
      { name: 'Perejil', amount: '1 puñado' },
    ],
    macros: { calories: 340, protein: 20, carbs: 48, fat: 8 }, image: '🥗',
  },
  {
    id: 'c12', name: 'Fajitas de Pollo con Pimientos',
    description: 'Tiras de pollo salteadas con pimientos y cebolla, servidas en tortilla de harina integral.',
    mealType: 'cena', prepTime: 20, difficulty: 'fácil',
    dietaryTags: ['sin_restriccion'],
    ingredients: [
      { name: 'Pechuga de pollo', amount: '150g' }, { name: 'Pimiento morrón', amount: '1 unidad' },
      { name: 'Cebolla', amount: '1/2 unidad' }, { name: 'Tortilla integral', amount: '2 unidades' },
      { name: 'Guacamole', amount: '2 cdas' },
    ],
    macros: { calories: 420, protein: 34, carbs: 38, fat: 14 }, image: '🌯',
  },
]

export function filterRecipes(mealType?: string, preference?: DietPreference): Recipe[] {
  return recipes.filter(r => {
    if (mealType && r.mealType !== mealType) return false
    if (preference && !r.dietaryTags.includes(preference)) return false
    return true
  })
}

const mealTypeToSlots: Record<string, MealType> = {
  'Desayuno': 'desayuno',
  'Almuerzo': 'almuerzo',
  'Snack': 'snack',
  'Cena': 'cena',
}

export function pickRecipesForPlan(
  mealNames: string[],
  preference: DietPreference
): Record<string, Recipe[]> {
  const picked: Record<string, Recipe[]> = {}
  const usedIds = new Set<string>()

  for (const name of mealNames) {
    const mealType = mealTypeToSlots[name]
    if (!mealType) { picked[name] = []; continue }

    const candidates = recipes
      .filter(r => r.mealType === mealType && r.dietaryTags.includes(preference))
      .filter(r => !usedIds.has(r.id))

    if (candidates.length === 0) {
      const fallback = recipes
        .filter(r => r.mealType === mealType)
        .filter(r => !usedIds.has(r.id))
      picked[name] = fallback.slice(0, 1)
      if (picked[name].length > 0) usedIds.add(picked[name][0].id)
    } else {
      const slice = candidates.slice(0, 2)
      picked[name] = slice
      slice.forEach(r => usedIds.add(r.id))
    }
  }

  return picked
}

export const nutrientInfo: NutrientInfo[] = [
  {
    name: 'Proteínas',
    description: 'Macronutriente esencial para la reparación y construcción de tejidos musculares.',
    benefits: 'Ayuda en la recuperación muscular, fortalece el sistema inmunológico y produce enzimas.',
    sources: ['Pollo', 'Pescado', 'Huevos', 'Legumbres', 'Tofu', 'Frutos secos'],
    dailyPercent: 20,
  },
  {
    name: 'Carbohidratos',
    description: 'Principal fuente de energía para el cerebro y los músculos durante el estudio.',
    benefits: 'Proporciona energía inmediata, mejora la concentración y el rendimiento cognitivo.',
    sources: ['Avena', 'Arroz integral', 'Quinoa', 'Batata', 'Frutas', 'Pan integral'],
    dailyPercent: 50,
  },
  {
    name: 'Grasas Saludables',
    description: 'Necesarias para la absorción de vitaminas y la salud cerebral.',
    benefits: 'Mejora la memoria, reduce la inflamación y mantiene la salud hormonal.',
    sources: ['Aguacate', 'Aceite de oliva', 'Frutos secos', 'Salmón', 'Semillas de chía'],
    dailyPercent: 30,
  },
  {
    name: 'Fibra',
    description: 'Carbohidrato no digerible que regula el tránsito intestinal.',
    benefits: 'Mejora la digestión, controla el azúcar en sangre y proporciona saciedad.',
    sources: ['Verduras', 'Frutas', 'Legumbres', 'Cereales integrales', 'Semillas'],
    dailyPercent: 25,
  },
  {
    name: 'Vitamina C',
    description: 'Vitamina antioxidante que fortalece el sistema inmunológico.',
    benefits: 'Reduce el estrés oxidativo, mejora la absorción de hierro y la salud de la piel.',
    sources: ['Naranjas', 'Kiwi', 'Pimientos', 'Brócoli', 'Fresas'],
    dailyPercent: 100,
  },
  {
    name: 'Hierro',
    description: 'Mineral esencial para transportar oxígeno en la sangre.',
    benefits: 'Previene la fatiga, mejora la concentración y el rendimiento académico.',
    sources: ['Espinaca', 'Lentejas', 'Carne roja', 'Quinoa', 'Hígado'],
    dailyPercent: 15,
  },
  {
    name: 'Calcio',
    description: 'Mineral fundamental para la salud ósea y la función muscular.',
    benefits: 'Fortalece huesos y dientes, regula la contracción muscular y la transmisión nerviosa.',
    sources: ['Lácteos', 'Brócoli', 'Almendras', 'Sardinas', 'Col rizada'],
    dailyPercent: 20,
  },
  {
    name: 'Omega-3',
    description: 'Ácido graso esencial con propiedades antiinflamatorias.',
    benefits: 'Mejora la función cerebral, reduce la inflamación y beneficia la salud cardiovascular.',
    sources: ['Salmón', 'Sardinas', 'Semillas de lino', 'Chía', 'Nueces'],
    dailyPercent: 10,
  },
]
