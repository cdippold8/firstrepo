/* ------------------------------------------------------------------
   Plan data: meals, recipes, exercise programming, nutrition tips.
   Two weekday rotations (A/B) of seasonal (late-summer) meals so the
   plan doesn't repeat every week. Weekends are intentionally left
   off the meal plan, per the goal. Wednesday and Friday dinners are
   standing choices that stay fixed across both rotations.
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
  bulkCabbageSkillet: {
    name: "Unstuffed Cabbage Roll Skillet with Turkey & Rice (Bulk — 2 nights)",
    servings: "6 servings (2 dinners for 2 people + leftovers)",
    seasonal: "Built around the cabbage you already have on hand",
    bulk: true,
    cholesterolTip: "Lean ground turkey and cabbage stand in for a classic beef-and-rice stuffed cabbage — same comfort, far less saturated fat, and cabbage adds real fiber.",
    ingredients: [
      "1.5 lb 93%-lean ground turkey",
      "1 tbsp olive oil",
      "1 small head cabbage, chopped (about 6–8 cups)",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "1 can (28 oz) crushed tomatoes",
      "1 cup low-sodium broth",
      "3/4 cup brown rice (uncooked)",
      "1 tsp paprika, 1 tsp dried dill, salt, pepper",
    ],
    steps: [
      "Heat olive oil in a large deep skillet or Dutch oven over medium heat. Brown the turkey, breaking it up, 5–6 min.",
      "Add onion, cook 4 min until softened. Add garlic and cabbage, cook 5–6 min, stirring, until the cabbage wilts down.",
      "Stir in crushed tomatoes, broth, rice, paprika, and dill. Bring to a simmer, cover, and cook 25–30 min, stirring occasionally, until the rice is tender.",
      "Season with salt and pepper. Serve half tonight; refrigerate the rest for the repeat dinner later this week.",
    ],
  },
  bulkMinestrone: {
    name: "White Bean & Turkey Sausage Minestrone (Bulk — 2 nights)",
    servings: "6 servings (2 dinners for 2 people + leftovers)",
    seasonal: "Zucchini, green beans, and tomatoes at their peak",
    bulk: true,
    cholesterolTip: "Lean turkey sausage in place of pork sausage cuts saturated fat; beans and whole-wheat pasta add soluble fiber.",
    ingredients: [
      "12 oz lean turkey sausage (casings removed if links)",
      "1 tbsp olive oil",
      "1 onion, diced",
      "2 carrots, diced",
      "2 zucchini, diced",
      "1 cup green beans, trimmed and cut",
      "3 cloves garlic, minced",
      "1 can (28 oz) crushed tomatoes",
      "4 cups low-sodium vegetable or chicken broth",
      "1 can (15 oz) white beans, drained & rinsed",
      "1 cup small whole-wheat pasta shells (cook fresh each night)",
      "1 tsp Italian herbs, salt, pepper",
      "Fresh basil and grated parmesan (light) to finish",
    ],
    steps: [
      "Heat olive oil in a large pot; brown turkey sausage, breaking it up, 5–6 min.",
      "Add onion and carrot, cook 5 min. Add zucchini, green beans, and garlic, cook 3–4 min more.",
      "Stir in crushed tomatoes, broth, white beans, and Italian herbs. Simmer uncovered 25 min. Season with salt and pepper.",
      "Cook a small batch of pasta shells fresh each night (keeps them from going mushy in storage) and ladle soup over them. Top with basil and a light grating of parmesan.",
    ],
  },
  sheetPanSalmon: {
    name: "Sheet-Pan Garlic Salmon with Green Beans & Sweet Potato",
    servings: "2 servings",
    seasonal: "Green beans are in season through early fall",
    cholesterolTip: "Salmon's omega-3s help lower triglycerides and support HDL — a second fish night alongside Wednesday's shrimp pasta.",
    ingredients: [
      "2 salmon fillets (5–6 oz each)",
      "2 tbsp olive oil, divided",
      "3 cloves garlic, minced",
      "1 lemon (zest + juice)",
      "2 cups green beans, trimmed",
      "1 large sweet potato, cubed",
      "1 tsp paprika, salt, pepper",
      "Fresh dill or parsley",
    ],
    steps: [
      "Preheat oven to 425°F. Toss sweet potato with 1 tbsp olive oil, salt, and pepper; roast 10 min on a sheet pan.",
      "Add green beans tossed with remaining olive oil, garlic, and paprika to the pan. Roast 8 min more.",
      "Push vegetables aside, add salmon skin-side down, drizzle with lemon juice and zest, season with salt and pepper.",
      "Roast 10–12 min more until salmon flakes easily. Top with fresh dill or parsley.",
    ],
  },
  blackenedCod: {
    name: "Blackened Cod with Corn & Black Bean Salsa",
    servings: "2 servings",
    seasonal: "Fresh corn and tomatoes make a bright late-summer salsa",
    cholesterolTip: "White fish is naturally low in saturated fat; black beans add soluble fiber in place of a starchy side.",
    ingredients: [
      "2 cod fillets (6 oz each)",
      "1 tbsp olive oil",
      "1 tbsp blackening seasoning (paprika, cayenne, garlic powder, onion powder, oregano, salt, pepper)",
      "1 cup corn kernels (fresh or grilled)",
      "1 can (15 oz) black beans, drained & rinsed",
      "1 cup cherry tomatoes, halved",
      "1/4 red onion, diced",
      "Juice of 1 lime",
      "Fresh cilantro, chopped",
    ],
    steps: [
      "Pat cod dry, rub with olive oil and blackening seasoning.",
      "Heat a skillet over medium-high heat; sear cod 3–4 min per side until it flakes easily and is nicely charred.",
      "Combine corn, black beans, tomatoes, red onion, lime juice, and cilantro for the salsa. Season with salt.",
      "Serve cod topped with the corn and black bean salsa.",
    ],
  },
};

/* ---------------------------- STANDING DINNERS ---------------------------- */
/* Two nights that stay fixed across both weekly rotations: Wednesday is
   always the shrimp & zucchini pasta, Friday is always the taco-stand
   order. Edit here to change either for both weeks at once. */

const WEDNESDAY_PASTA_NIGHT = { name: RECIPES.scampi.name, kcal: 470, recipeId: "scampi" };

const FRIDAY_TACO_NIGHT = {
  name: "Taco Stand Night — 1 Veggie, 1 Tofu, 2 Fish & 1 Chicken Taco",
  kcal: 650,
  bulkNote: "Standing order: 5 small tacos on corn tortillas, rice & beans on the side, hold the cheese/sour cream.",
};

/* ---------------------------- WEEKDAY MEAL PLANS ---------------------------- */

const WEEKS = {
  A: {
    title: "Week A — Late-Summer Harvest",
    days: {
      Monday: {
        breakfast: { name: "Plum & walnut overnight oats", kcal: 330, ingredients: ["1/3 cup rolled oats", "Plain low-fat Greek yogurt", "1 plum, sliced", "1 tbsp chopped walnuts", "1 tsp chia seeds", "Cinnamon"], note: "Combine and refrigerate overnight." },
        snackAm: { name: "Blackberries with pistachios", kcal: 150, ingredients: ["3/4 cup blackberries", "Small handful pistachios"] },
        lunch: { name: "Heirloom tomato & white bean panzanella", kcal: 420, ingredients: ["Cubed whole-grain bread, toasted", "Heirloom tomatoes", "Cucumber", "Red onion", "White beans", "Olive oil & red wine vinegar", "Fresh basil"] },
        snackPm: { name: "Roasted edamame", kcal: 150, ingredients: ["3/4 cup roasted edamame, lightly salted"] },
        dinner: { name: RECIPES.sheetPanSalmon.name, kcal: 500, recipeId: "sheetPanSalmon" },
      },
      Tuesday: {
        breakfast: { name: "Peach & almond butter oatmeal", kcal: 340, ingredients: ["1/2 cup rolled oats", "1 peach, sliced", "1 tbsp almond butter", "Cinnamon"] },
        snackAm: { name: "Cherry tomato & mozzarella skewers", kcal: 150, ingredients: ["Cherry tomatoes", "1 oz part-skim mozzarella pearls", "Fresh basil"] },
        lunch: { name: "Grilled chicken & peach salad", kcal: 420, ingredients: ["Mixed greens", "Grilled chicken breast", "1 peach, sliced", "Walnuts", "Balsamic vinaigrette"] },
        snackPm: { name: "Celery with almond butter", kcal: 170, ingredients: ["Celery sticks", "1 tbsp almond butter"] },
        dinner: { name: RECIPES.bulkCabbageSkillet.name, kcal: 440, recipeId: "bulkCabbageSkillet", bulk: true, bulkNote: "Cook the full batch tonight — repeats Thursday." },
      },
      Wednesday: {
        breakfast: { name: "Greek yogurt with blackberries", kcal: 310, ingredients: ["Plain low-fat Greek yogurt", "3/4 cup blackberries", "1 tsp chia seeds", "Drizzle of honey"] },
        snackAm: { name: "Orange", kcal: 80, ingredients: ["1 orange"] },
        lunch: { name: "Mediterranean farro bowl", kcal: 420, ingredients: ["Cooked farro", "Grilled zucchini & bell pepper", "Cherry tomatoes", "2 tbsp hummus", "Lemon-olive oil dressing"] },
        snackPm: { name: "Bell pepper strips with white bean dip", kcal: 150, ingredients: ["Bell pepper", "White bean & garlic dip"] },
        dinner: WEDNESDAY_PASTA_NIGHT,
      },
      Thursday: {
        breakfast: { name: "Veggie egg-white omelet", kcal: 320, ingredients: ["4 egg whites (or 1 cup liquid egg whites)", "Mushrooms, spinach", "1 slice whole-grain toast"], note: "Sauté mushrooms and spinach, fold into egg whites." },
        snackAm: { name: "Plum", kcal: 70, ingredients: ["1 plum"] },
        lunch: { name: "White bean & arugula salad", kcal: 400, ingredients: ["White beans", "Arugula", "Shaved parmesan (light)", "Lemon-olive oil dressing"] },
        snackPm: { name: "Watermelon with mint", kcal: 90, ingredients: ["1.5 cups watermelon", "Fresh mint"] },
        dinner: { name: RECIPES.bulkCabbageSkillet.name + " (leftovers)", kcal: 440, recipeId: "bulkCabbageSkillet", bulk: true, bulkNote: "Reheat Tuesday's batch — no cooking tonight." },
      },
      Friday: {
        breakfast: { name: "Blackberry chia pudding", kcal: 310, ingredients: ["3 tbsp chia seeds", "Almond milk", "3/4 cup blackberries", "Cinnamon"], note: "Mix chia with almond milk, refrigerate overnight." },
        snackAm: { name: "Banana with peanut butter", kcal: 200, ingredients: ["1 banana", "1 tbsp peanut butter"] },
        lunch: { name: "Tuna & white bean lettuce wraps", kcal: 380, ingredients: ["Olive-oil-packed tuna", "White beans", "Butter lettuce leaves", "Lemon-olive oil dressing"] },
        snackPm: { name: "Roasted chickpeas", kcal: 160, ingredients: ["1/2 cup roasted chickpeas, lightly salted"] },
        dinner: FRIDAY_TACO_NIGHT,
      },
    },
  },
  B: {
    title: "Week B — Peak Summer Garden",
    days: {
      Monday: {
        breakfast: { name: "Overnight oats with figs & flax", kcal: 330, ingredients: ["1/3 cup rolled oats", "2 fresh figs (or 1 plum), sliced", "1 tbsp ground flaxseed", "Almond milk", "Cinnamon"], note: "Combine and refrigerate overnight." },
        snackAm: { name: "Roasted almonds & dried apricots", kcal: 170, ingredients: ["Small handful roasted almonds", "2–3 dried apricots"] },
        lunch: { name: "Grilled eggplant & chickpea salad", kcal: 420, ingredients: ["Grilled eggplant", "Chickpeas", "Cherry tomatoes", "Tahini-lemon dressing", "Fresh parsley"] },
        snackPm: { name: "Cucumber with hummus", kcal: 150, ingredients: ["Cucumber slices", "3 tbsp hummus"] },
        dinner: { name: RECIPES.blackenedCod.name, kcal: 430, recipeId: "blackenedCod" },
      },
      Tuesday: {
        breakfast: { name: "Steel-cut oats with blackberries & pistachios", kcal: 340, ingredients: ["1/2 cup steel-cut oats", "3/4 cup blackberries", "Small handful pistachios", "Cinnamon"] },
        snackAm: { name: "Sliced plum", kcal: 70, ingredients: ["1 plum"] },
        lunch: { name: "Turkey & white bean lettuce wraps", kcal: 380, ingredients: ["Sliced deli turkey (low-sodium)", "White beans", "Butter lettuce leaves", "Mustard-vinaigrette"] },
        snackPm: { name: "Air-popped popcorn (plain)", kcal: 110, ingredients: ["3 cups air-popped popcorn", "Pinch of salt"] },
        dinner: { name: RECIPES.bulkMinestrone.name, kcal: 470, recipeId: "bulkMinestrone", bulk: true, bulkNote: "Cook the full batch tonight — repeats Thursday." },
      },
      Wednesday: {
        breakfast: { name: "Avocado toast with heirloom tomato", kcal: 320, ingredients: ["1 slice whole-grain toast", "1/2 avocado, mashed", "Sliced heirloom tomato", "Everything-bagel seasoning"] },
        snackAm: { name: "Roasted chickpeas", kcal: 160, ingredients: ["1/2 cup roasted chickpeas, lightly salted"] },
        lunch: { name: "Grilled chicken & corn chopped salad", kcal: 420, ingredients: ["Grilled chicken breast", "Corn, tomato", "Chopped romaine", "Lime vinaigrette"] },
        snackPm: { name: "Watermelon cubes", kcal: 90, ingredients: ["1.5 cups watermelon"] },
        dinner: WEDNESDAY_PASTA_NIGHT,
      },
      Thursday: {
        breakfast: { name: "Greek yogurt with peaches & granola", kcal: 330, ingredients: ["Plain low-fat Greek yogurt", "1 peach, sliced", "2 tbsp low-sugar granola"] },
        snackAm: { name: "Steamed edamame", kcal: 150, ingredients: ["3/4 cup edamame in pods", "Sea salt"] },
        lunch: { name: "White bean & roasted vegetable grain bowl", kcal: 420, ingredients: ["Cooked farro", "White beans", "Roasted zucchini & bell pepper", "Lemon-olive oil dressing"] },
        snackPm: { name: "Celery with almond butter", kcal: 170, ingredients: ["Celery sticks", "1 tbsp almond butter"] },
        dinner: { name: RECIPES.bulkMinestrone.name + " (leftovers)", kcal: 470, recipeId: "bulkMinestrone", bulk: true, bulkNote: "Reheat Tuesday's soup, cook fresh pasta shells — no sauce-making tonight." },
      },
      Friday: {
        breakfast: { name: "Whole-grain toast with avocado & radish", kcal: 310, ingredients: ["1 slice whole-grain toast", "1/2 avocado, mashed", "Sliced radish", "Chili flakes"] },
        snackAm: { name: "Orange", kcal: 80, ingredients: ["1 orange"] },
        lunch: { name: "Salmon salad on greens", kcal: 400, ingredients: ["Canned wild salmon", "Celery", "Light olive-oil mayo", "Mixed greens"] },
        snackPm: { name: "Bell pepper strips with guacamole", kcal: 150, ingredients: ["Bell pepper", "3 tbsp guacamole"] },
        dinner: FRIDAY_TACO_NIGHT,
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
