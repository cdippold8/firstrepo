/* ------------------------------------------------------------------
   Plan data: meals, recipes, exercise programming, nutrition tips.
   Two weekday rotations (A/B) of seasonal (late-summer) meals so the
   plan doesn't repeat every week. Weekends are intentionally left
   off the meal plan, per the goal.
------------------------------------------------------------------ */

const GOAL = {
  targetLossLbs: 10,
  approachNote:
    "A steady 1–1.5 lb/week loss (about a 500–750 calorie/day deficit) puts 10 lbs about 7–10 weeks out. " +
    "Pace it with the training load below rather than cutting harder — you're running, lifting, and doing yoga, " +
    "so the body needs fuel to recover.",
};

const CHOLESTEROL_TIPS = [
  { title: "Lead with soluble fiber", body: "Oats, barley, beans, lentils, apples, and berries bind cholesterol in the gut. Aim for 5–10g of soluble fiber a day — most days on this plan hit that with breakfast alone." },
  { title: "Swap the fat, don't just cut it", body: "Replace butter and fatty red meat with olive oil, avocado, and nuts. Saturated fat raises LDL more than dietary cholesterol itself does." },
  { title: "Fatty fish, twice a week", body: "Salmon, mackerel, and sardines supply omega-3s that lower triglycerides and support HDL. Two dinners a week on this plan are built around fish or shrimp." },
  { title: "Go easy on yolks, lean on whites", body: "Egg whites show up in the scrambles and burritos below. Whole eggs a few times a week are fine for most people — mix in whites when you want the protein without the extra cholesterol." },
  { title: "Choose lean, skip processed", body: "Skinless poultry, turkey, and legumes stand in for red/processed meat, which carries most of the saturated fat and sodium." },
  { title: "Refined carbs work against you twice", body: "White bread, sugary snacks, and fried food spike triglycerides and add empty calories that fight the deficit. Whole grains (farro, quinoa, brown rice, oats) are used throughout instead." },
  { title: "Cardio moves the needle on HDL", body: "Running and brisk walking are two of the most effective ways to raise protective HDL cholesterol — which is exactly what's already programmed below." },
  { title: "Check in with your doctor", body: "If you're on a statin or have a diagnosed lipid condition, loop in your physician or a dietitian before changing your diet or training load — this plan is general guidance, not medical advice." },
];

/* ---------------------------- RECIPES ---------------------------- */
/* Full recipes for dinners (the meals worth cooking from scratch).
   Breakfasts/lunches/snacks get ingredient lists + a quick note. */

const RECIPES = {
  bulkChili: {
    name: "Turkey & Veggie Chili (Bulk — 2 nights)",
    servings: "6 servings (2 dinners for 2 people + leftovers)",
    seasonal: "Uses late-summer bell peppers, corn, and tomatoes",
    bulk: true,
    cholesterolTip: "Lean ground turkey + beans instead of ground beef cuts saturated fat while keeping the fiber high.",
    ingredients: [
      "1.5 lb 93%-lean ground turkey",
      "1 tbsp olive oil",
      "1 yellow onion, diced",
      "2 bell peppers, diced",
      "3 cloves garlic, minced",
      "2 cans (15 oz) fire-roasted diced tomatoes",
      "1 can (15 oz) kidney beans, drained & rinsed",
      "1 can (15 oz) black beans, drained & rinsed",
      "2 ears corn, kernels cut off (or 1.5 cups frozen)",
      "2 tbsp chili powder, 1 tbsp cumin, 1 tsp smoked paprika",
      "2 cups low-sodium chicken or veg broth",
      "Salt & pepper to taste",
      "Optional garnish: sliced avocado, fresh cilantro, lime",
    ],
    steps: [
      "Heat olive oil in a large pot over medium heat. Brown the turkey, breaking it up, 5–6 min.",
      "Add onion and bell pepper; cook 5 min until softened. Add garlic, cook 1 min more.",
      "Stir in chili powder, cumin, and paprika; toast 30 seconds.",
      "Add tomatoes, beans, corn, and broth. Bring to a simmer, then reduce heat and cook uncovered 30–40 min, stirring occasionally, until thickened.",
      "Season with salt and pepper. Serve half tonight over brown rice or on its own; refrigerate the rest for the repeat dinner later this week.",
    ],
  },
  bulkBolognese: {
    name: "Turkey & Vegetable Bolognese (Bulk — 2 nights)",
    servings: "6 servings (2 dinners for 2 people + leftovers)",
    seasonal: "Loaded with end-of-summer zucchini and tomatoes",
    bulk: true,
    cholesterolTip: "Ground turkey breast + a big ratio of vegetables lowers the saturated fat per serving versus a classic beef bolognese.",
    ingredients: [
      "1.5 lb lean ground turkey (breast, if available)",
      "1 tbsp olive oil",
      "1 onion, diced",
      "2 carrots, finely diced",
      "2 zucchini, diced",
      "3 cloves garlic, minced",
      "1 can (28 oz) crushed tomatoes",
      "1/2 cup low-sodium broth",
      "1 tsp dried oregano, 1 tsp dried basil, pinch of red pepper flakes",
      "Salt & pepper to taste",
      "12 oz whole-wheat pasta (cook fresh each night)",
      "Grated parmesan (light) and fresh basil to finish",
    ],
    steps: [
      "Heat olive oil in a large pot; brown turkey over medium heat, 5–6 min.",
      "Add onion and carrot, cook 5 min. Add zucchini and garlic, cook 3–4 min more.",
      "Stir in crushed tomatoes, broth, oregano, basil, and red pepper flakes.",
      "Simmer uncovered 25–30 min, stirring occasionally, until thickened. Season to taste.",
      "Cook pasta fresh each night (don't reheat the pasta itself — just the sauce) and top with a light grating of parmesan and fresh basil.",
    ],
  },
  salmon: {
    name: "Herb-Grilled Salmon with Roasted Zucchini & Corn",
    servings: "2 servings",
    seasonal: "Zucchini and sweet corn are at their peak in August",
    cholesterolTip: "Salmon's omega-3s help lower triglycerides and support HDL.",
    ingredients: [
      "2 salmon fillets (5–6 oz each)",
      "2 tbsp olive oil, divided",
      "1 lemon (zest + juice)",
      "2 cloves garlic, minced",
      "1 tsp each dried dill and thyme",
      "2 zucchini, sliced into rounds",
      "2 ears corn, husked",
      "1 cup cooked quinoa",
      "Salt & pepper",
    ],
    steps: [
      "Whisk 1 tbsp olive oil, lemon zest/juice, garlic, dill, and thyme; brush over salmon. Let sit 10 min.",
      "Toss zucchini with remaining olive oil, salt, and pepper. Roast at 425°F (or grill) 12–15 min alongside the corn.",
      "Grill or pan-sear salmon skin-side down 4–5 min, flip, cook 2–3 min more until just opaque.",
      "Cut corn off the cob. Plate over quinoa with roasted zucchini.",
    ],
  },
  scampi: {
    name: "Shrimp Scampi with Whole-Wheat Linguine & Zucchini",
    servings: "2 servings",
    seasonal: "Garden zucchini, diced small — no spiralizer needed",
    cholesterolTip: "Shrimp is low in saturated fat; light on butter, heavy on olive oil and garlic keeps it heart-friendly.",
    ingredients: [
      "6 oz whole-wheat linguine",
      "1 lb large shrimp, peeled & deveined",
      "2 medium zucchini, diced or cut into half-moons",
      "3 cloves garlic, minced",
      "2 tbsp olive oil + 1 tsp butter (for flavor, not the base fat)",
      "1/4 cup low-sodium chicken broth",
      "Juice of 1 lemon",
      "Red pepper flakes, salt, pepper",
      "Fresh parsley, chopped",
    ],
    steps: [
      "Cook linguine according to package directions; drain, reserving 1/4 cup pasta water.",
      "Pat shrimp dry, season with salt and pepper. Heat olive oil in a large skillet over medium-high; sear shrimp 1–2 min per side. Remove and set aside.",
      "Add zucchini to the same skillet, sauté 3–4 min until just tender. Add garlic and red pepper flakes, cook 30 sec.",
      "Add broth, lemon juice, and reserved pasta water; simmer 1 min. Stir in butter, return shrimp to the pan.",
      "Toss with the cooked linguine, top with parsley, and serve immediately.",
    ],
  },
  grilledChicken: {
    name: "Grilled Lemon-Herb Chicken with Corn & Green Salad",
    servings: "2 servings",
    seasonal: "Grilled corn on the cob is a late-summer staple",
    cholesterolTip: "Skinless chicken breast keeps saturated fat low; olive-oil vinaigrette instead of creamy dressing.",
    ingredients: [
      "2 boneless, skinless chicken breasts",
      "2 tbsp olive oil, divided",
      "1 lemon (zest + juice)",
      "2 cloves garlic, minced",
      "1 tsp each oregano and thyme",
      "2 ears corn",
      "Large bowl mixed greens, cherry tomatoes, cucumber",
      "1 tbsp red wine vinegar for dressing",
    ],
    steps: [
      "Marinate chicken in 1 tbsp olive oil, lemon zest/juice, garlic, oregano, and thyme for at least 20 min.",
      "Grill chicken 6–7 min per side until internal temp hits 165°F. Grill corn alongside, turning occasionally, 10 min.",
      "Whisk remaining olive oil with red wine vinegar, salt, and pepper for the salad dressing.",
      "Slice chicken, serve with corn and a big dressed green salad.",
    ],
  },
  cod: {
    name: "Sheet-Pan Lemon-Herb Cod with Green Beans & Sweet Potato",
    servings: "2 servings",
    seasonal: "Green beans are in season through early fall",
    cholesterolTip: "White fish is naturally low in saturated fat and a great low-cholesterol protein swap for red meat.",
    ingredients: [
      "2 cod fillets (6 oz each)",
      "2 tbsp olive oil, divided",
      "1 lemon, sliced",
      "2 cups green beans, trimmed",
      "1 large sweet potato, cubed",
      "2 cloves garlic, minced",
      "1 tsp paprika, salt, pepper",
    ],
    steps: [
      "Preheat oven to 425°F. Toss sweet potato with 1 tbsp olive oil, salt, pepper; roast 10 min on a sheet pan.",
      "Add green beans tossed with remaining olive oil, garlic, and paprika to the pan. Roast 10 min more.",
      "Push vegetables aside, add cod, top with lemon slices, salt, and pepper. Roast 10–12 min until fish flakes easily.",
    ],
  },
  skewers: {
    name: "Grilled Portobello & Veggie Skewers with Farro",
    servings: "2 servings (meatless night)",
    seasonal: "Peak zucchini, bell pepper, and cherry tomatoes",
    cholesterolTip: "A fully plant-based dinner — zero dietary cholesterol, and the farro adds soluble fiber.",
    ingredients: [
      "2 portobello caps, cut into chunks",
      "1 zucchini, thick-sliced",
      "1 bell pepper, chunked",
      "1 cup cherry tomatoes",
      "1 red onion, chunked",
      "3 tbsp olive oil",
      "2 tbsp balsamic vinegar",
      "1 tsp Italian herbs, salt, pepper",
      "1.5 cups cooked farro",
    ],
    steps: [
      "Whisk olive oil, balsamic, herbs, salt, and pepper. Toss vegetables and mushrooms in the marinade; let sit 15 min.",
      "Thread onto skewers. Grill 8–10 min, turning occasionally, until charred and tender.",
      "Serve over cooked farro, drizzled with any remaining marinade.",
    ],
  },
  shrimpTacos: {
    name: "Grilled Shrimp Tacos with Cabbage Slaw",
    servings: "2 servings",
    seasonal: "Cabbage slaw and avocado are late-summer staples",
    cholesterolTip: "Corn tortillas + shrimp + avocado (unsaturated fat) instead of fried fish or fatty beef.",
    ingredients: [
      "1 lb shrimp, peeled & deveined",
      "1 tbsp olive oil, 1 tsp chili powder, 1/2 tsp cumin",
      "2 cups shredded cabbage",
      "2 tbsp lime juice + zest",
      "1 tbsp plain low-fat Greek yogurt (for a light crema)",
      "1 avocado, sliced",
      "6 small corn tortillas",
      "Fresh cilantro",
    ],
    steps: [
      "Toss shrimp with olive oil, chili powder, and cumin. Grill or pan-sear 2–3 min per side.",
      "Toss cabbage with lime juice/zest and a pinch of salt for a quick slaw.",
      "Warm tortillas. Build tacos with slaw, shrimp, avocado, a small dollop of yogurt crema, and cilantro.",
    ],
  },
};

/* ---------------------------- WEEKDAY MEAL PLANS ---------------------------- */

const WEEKS = {
  A: {
    title: "Week A — Late-Summer Harvest",
    days: {
      Monday: {
        breakfast: { name: "Greek yogurt parfait", kcal: 320, ingredients: ["Plain low-fat Greek yogurt", "Fresh peach, sliced", "Blueberries", "1/4 cup rolled oats", "1 tbsp chopped walnuts", "Drizzle of honey"], note: "Layer yogurt, oats, fruit, and nuts." },
        snackAm: { name: "Apple with almond butter", kcal: 180, ingredients: ["1 apple", "1 tbsp almond butter"] },
        lunch: { name: "Mediterranean chickpea salad", kcal: 420, ingredients: ["1 can chickpeas", "Cucumber, diced", "Cherry tomatoes", "Red onion", "2 tbsp light feta", "Olive oil & lemon dressing"], note: "Toss everything, dress just before eating." },
        snackPm: { name: "Carrot & bell pepper sticks with hummus", kcal: 150, ingredients: ["Carrots", "Bell pepper", "3 tbsp hummus"] },
        dinner: { name: RECIPES.salmon.name, kcal: 520, recipeId: "salmon" },
      },
      Tuesday: {
        breakfast: { name: "Steel-cut oats with flax & berries", kcal: 340, ingredients: ["1/2 cup steel-cut oats", "1 tbsp ground flaxseed", "Cinnamon", "Mixed berries"], note: "Cook oats, stir in flax and cinnamon, top with berries." },
        snackAm: { name: "Orange + small handful walnuts", kcal: 170, ingredients: ["1 orange", "8–10 walnut halves"] },
        lunch: { name: "Turkey & white bean soup (make-ahead friendly)", kcal: 380, ingredients: ["Ground turkey", "White beans", "Carrots, celery, onion", "Low-sodium broth", "Fresh thyme"] },
        snackPm: { name: "Crunchy roasted chickpeas with cherry tomatoes", kcal: 160, ingredients: ["1/2 cup roasted chickpeas, lightly salted", "Cherry tomatoes", "Cracked pepper"] },
        dinner: { name: RECIPES.bulkChili.name, kcal: 480, recipeId: "bulkChili", bulk: true, bulkNote: "Cook the full batch tonight — repeats Thursday." },
      },
      Wednesday: {
        breakfast: { name: "Veggie egg-white scramble", kcal: 310, ingredients: ["4 egg whites (or 1 cup liquid egg whites)", "Bell pepper, spinach, tomato", "1 slice whole-grain toast"], note: "Scramble whites with veggies, serve with toast." },
        snackAm: { name: "Peach + small handful almonds", kcal: 170, ingredients: ["1 peach", "10 almonds"] },
        lunch: { name: "Grilled chicken & summer grain bowl", kcal: 440, ingredients: ["Grilled chicken breast", "Cooked farro", "Zucchini, corn, cherry tomato", "Basil vinaigrette"] },
        snackPm: { name: "Air-popped popcorn (plain)", kcal: 110, ingredients: ["3 cups air-popped popcorn", "Pinch of salt"] },
        dinner: { name: RECIPES.scampi.name, kcal: 400, recipeId: "scampi" },
      },
      Thursday: {
        breakfast: { name: "Overnight chia oats", kcal: 330, ingredients: ["1/3 cup rolled oats", "1 tbsp chia seeds", "Almond milk", "Blueberries"], note: "Combine and refrigerate overnight." },
        snackAm: { name: "Cucumber with light tzatziki", kcal: 130, ingredients: ["Cucumber", "3 tbsp low-fat yogurt tzatziki"] },
        lunch: { name: "Whole-grain veggie & hummus wrap", kcal: 400, ingredients: ["Whole-grain tortilla", "Hummus", "Grilled zucchini & pepper", "Spinach"] },
        snackPm: { name: "Fresh watermelon cubes", kcal: 90, ingredients: ["1.5 cups watermelon"] },
        dinner: { name: RECIPES.bulkChili.name + " (leftovers)", kcal: 480, recipeId: "bulkChili", bulk: true, bulkNote: "Reheat Tuesday's batch — no cooking tonight." },
      },
      Friday: {
        breakfast: { name: "Avocado toast with tomato", kcal: 320, ingredients: ["1 slice whole-grain toast", "1/2 avocado, mashed", "Sliced tomato", "Everything-bagel seasoning"] },
        snackAm: { name: "Banana with peanut butter", kcal: 200, ingredients: ["1 banana", "1 tbsp peanut butter"] },
        lunch: { name: "Tuna & white bean salad on greens", kcal: 380, ingredients: ["Olive-oil-packed tuna", "White beans", "Mixed greens", "Lemon-olive oil dressing"] },
        snackPm: { name: "Bell pepper strips with guacamole", kcal: 150, ingredients: ["Bell pepper", "3 tbsp guacamole"] },
        dinner: { name: RECIPES.grilledChicken.name, kcal: 480, recipeId: "grilledChicken" },
      },
    },
  },
  B: {
    title: "Week B — Peak Summer Garden",
    days: {
      Monday: {
        breakfast: { name: "Green peach smoothie", kcal: 320, ingredients: ["Spinach", "Frozen peach", "Banana", "1/3 cup rolled oats", "Almond milk", "1 tbsp ground flaxseed"], note: "Blend all ingredients until smooth." },
        snackAm: { name: "Rice cakes with almond butter", kcal: 170, ingredients: ["2 rice cakes", "1 tbsp almond butter"] },
        lunch: { name: "Grilled veggie & white bean salad", kcal: 400, ingredients: ["White beans", "Grilled zucchini & eggplant", "Cherry tomatoes", "Olive oil & balsamic"] },
        snackPm: { name: "Cherry tomatoes with part-skim mozzarella", kcal: 160, ingredients: ["Cherry tomatoes", "1 oz part-skim mozzarella", "Fresh basil"] },
        dinner: { name: RECIPES.cod.name, kcal: 430, recipeId: "cod" },
      },
      Tuesday: {
        breakfast: { name: "Oat bran with berries & walnuts", kcal: 330, ingredients: ["1/2 cup oat bran", "Mixed berries", "1 tbsp walnuts", "Cinnamon"] },
        snackAm: { name: "Sliced peach", kcal: 90, ingredients: ["1 peach"] },
        lunch: { name: "Lentil soup with side salad", kcal: 400, ingredients: ["Lentils", "Carrots, celery, onion", "Low-sodium broth", "Side green salad, olive oil dressing"] },
        snackPm: { name: "Steamed edamame, lightly salted", kcal: 150, ingredients: ["1 cup edamame in pods", "Sea salt"] },
        dinner: { name: RECIPES.bulkBolognese.name, kcal: 490, recipeId: "bulkBolognese", bulk: true, bulkNote: "Cook the full batch tonight — repeats Thursday." },
      },
      Wednesday: {
        breakfast: { name: "Egg-white veggie breakfast burrito", kcal: 340, ingredients: ["4 egg whites", "Whole-wheat tortilla", "Bell pepper, onion, spinach", "Salsa"] },
        snackAm: { name: "Apple with walnuts", kcal: 180, ingredients: ["1 apple", "8 walnut halves"] },
        lunch: { name: "Grilled chicken summer salad", kcal: 420, ingredients: ["Grilled chicken breast", "Corn, tomato, avocado", "Lime vinaigrette", "Mixed greens"] },
        snackPm: { name: "Hummus with cucumber", kcal: 150, ingredients: ["3 tbsp hummus", "Cucumber slices"] },
        dinner: { name: RECIPES.skewers.name, kcal: 410, recipeId: "skewers" },
      },
      Thursday: {
        breakfast: { name: "Chia pudding with peaches", kcal: 310, ingredients: ["3 tbsp chia seeds", "Almond milk", "Sliced peach", "Cinnamon"], note: "Mix chia with almond milk, refrigerate overnight." },
        snackAm: { name: "Carrots with hummus", kcal: 150, ingredients: ["Carrots", "3 tbsp hummus"] },
        lunch: { name: "Mediterranean grain bowl", kcal: 430, ingredients: ["Cooked quinoa", "Chickpeas", "Cucumber, tomato", "Light feta", "Olive oil & lemon"] },
        snackPm: { name: "Watermelon cubes", kcal: 90, ingredients: ["1.5 cups watermelon"] },
        dinner: { name: RECIPES.bulkBolognese.name + " (leftovers)", kcal: 490, recipeId: "bulkBolognese", bulk: true, bulkNote: "Reheat Tuesday's sauce, cook fresh pasta — no sauce-making tonight." },
      },
      Friday: {
        breakfast: { name: "Avocado toast with tomato", kcal: 320, ingredients: ["1 slice whole-grain toast", "1/2 avocado, mashed", "Sliced tomato", "Chili flakes"] },
        snackAm: { name: "Orange", kcal: 80, ingredients: ["1 orange"] },
        lunch: { name: "Salmon salad on greens", kcal: 400, ingredients: ["Canned wild salmon", "Celery", "Light olive-oil mayo", "Mixed greens"] },
        snackPm: { name: "Air-popped popcorn (plain)", kcal: 110, ingredients: ["3 cups air-popped popcorn"] },
        dinner: { name: RECIPES.shrimpTacos.name, kcal: 460, recipeId: "shrimpTacos" },
      },
    },
  },
};

/* ---------------------------- EXERCISE PLAN ---------------------------- */
/* Runs the full week — training doesn't take weekends off even though meal planning does. */

const EXERCISE = {
  Monday: { type: "Strength", title: "Full-Body Lift", duration: "40–45 min", details: ["Squat or leg press 3x8", "Push-ups or bench press 3x10", "Bent-over row 3x10", "Plank 3x30–45 sec"], note: "Strength training preserves muscle during the calorie deficit, which keeps your metabolism higher as you lose weight." },
  Tuesday: { type: "Run", title: "Moderate Run + Core", duration: "30–35 min", details: ["25–30 min easy-to-moderate pace run", "10 min core: dead bugs, bicycle crunches, side planks"], note: "Steady-state cardio like this is one of the most effective ways to raise HDL (\"good\") cholesterol." },
  Wednesday: { type: "Yoga", title: "Recovery Flow", duration: "30–40 min", details: ["Slow vinyasa or restorative flow", "Focus on hips, hamstrings, and shoulders (areas tight from running/lifting)"], note: "Active recovery lowers cortisol and supports better sleep — both matter for sustainable fat loss." },
  Thursday: { type: "Strength", title: "Lower Body + Posterior Chain", duration: "40–45 min", details: ["Romanian deadlift 3x8", "Walking lunges 3x10/leg", "Hip thrust 3x10", "Farmer's carry 3 rounds"], note: "" },
  Friday: { type: "Run", title: "Intervals or Tempo", duration: "30 min", details: ["5 min warm-up walk/jog", "6x2 min hard / 2 min easy, or a continuous tempo run", "5 min cool-down walk"], note: "Interval work is efficient for calorie burn and cardiovascular conditioning in a shorter session." },
  Saturday: { type: "Walk", title: "Long Walk or Hike", duration: "45–60 min", details: ["Brisk pace, ideally outdoors", "Optional: bring the dog, family, or a podcast"], note: "Off the meal plan today, but an easy long walk supports recovery from the week without adding training stress.", optional: true },
  Sunday: { type: "Yoga", title: "Rest or Gentle Yoga", duration: "20–30 min", details: ["Full rest, or a gentle/restorative yoga session", "Light stretching, foam rolling"], note: "A true low-stress day sets you up for Monday's lift.", optional: true },
};
