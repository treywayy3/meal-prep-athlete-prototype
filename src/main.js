const pantryOptions = [
  'Oats',
  'Greek Yogurt',
  'Rice',
  'Chicken Breast',
  'Eggs',
  'Spinach',
  'Beans',
  'Peanut Butter',
  'Bananas',
  'Tortillas',
  'Sweet Potatoes',
  'Pasta',
  'Canned Tuna',
  'Tomatoes',
  'Bell Peppers',
  'Broccoli',
  'Avocado',
  'Cottage Cheese',
  'Lentils',
  'Potatoes',
  'Frozen Veggies',
  'Whole Wheat Bread',
  'Salmon',
  'Brown Rice',
  'Apple',
  'Trail Mix'
];

const recipes = [
  {
    name: 'Protein Oatmeal Power Bowl',
    time: '8 min',
    cost: 2.4,
    protein: '28g',
    calories: '420',
    tags: ['budget', 'fast', 'high-protein'],
    ingredients: ['Oats', 'Greek Yogurt', 'Bananas', 'Peanut Butter'],
    highlight: 'Great before practice or on rushed mornings.'
  },
  {
    name: 'Chicken Rice Recovery Bowl',
    time: '18 min',
    cost: 4.85,
    protein: '42g',
    calories: '550',
    tags: ['high-protein', 'meal-prep'],
    ingredients: ['Chicken Breast', 'Rice', 'Spinach', 'Broccoli', 'Tomatoes'],
    highlight: 'Balances carbs, lean protein, and volume for recovery.'
  },
  {
    name: 'Egg & Veggie Breakfast Wrap',
    time: '10 min',
    cost: 3.1,
    protein: '24g',
    calories: '390',
    tags: ['fast', 'budget'],
    ingredients: ['Eggs', 'Tortillas', 'Spinach', 'Bell Peppers', 'Avocado'],
    highlight: 'Easy, portable, and filling on busy training days.'
  },
  {
    name: 'Tuna Lentil Protein Bowl',
    time: '15 min',
    cost: 3.75,
    protein: '35g',
    calories: '500',
    tags: ['budget', 'high-protein'],
    ingredients: ['Canned Tuna', 'Lentils', 'Tomatoes', 'Spinach', 'Rice'],
    highlight: 'Cheap pantry-friendly protein that stretches far.'
  },
  {
    name: 'Sweet Potato Chicken Plate',
    time: '20 min',
    cost: 5.25,
    protein: '40g',
    calories: '600',
    tags: ['meal-prep', 'high-protein'],
    ingredients: ['Chicken Breast', 'Sweet Potatoes', 'Broccoli', 'Avocado'],
    highlight: 'Ideal for post-workout energy and recovery.'
  },
  {
    name: 'Red Lentil Veggie Chili',
    time: '25 min',
    cost: 4.2,
    protein: '30g',
    calories: '520',
    tags: ['budget', 'meal-prep'],
    ingredients: ['Lentils', 'Tomatoes', 'Beans', 'Frozen Veggies'],
    highlight: 'Big batch recipe that keeps well in the fridge.'
  }
];

const weeklyPlan = [
  { day: 'Mon', meal: 'Protein Oat Bowl', time: '8 min', calories: '420 kcal' },
  { day: 'Tue', meal: 'Chicken Rice Power Bowl', time: '18 min', calories: '540 kcal' },
  { day: 'Wed', meal: 'Egg & Veg Wrap', time: '10 min', calories: '470 kcal' },
  { day: 'Thu', meal: 'Tuna Lentil Bowl', time: '15 min', calories: '560 kcal' },
  { day: 'Fri', meal: 'Pasta + Chicken + Greens', time: '20 min', calories: '610 kcal' },
  { day: 'Sat', meal: 'Recovery Smoothie + Toast', time: '7 min', calories: '350 kcal' },
  { day: 'Sun', meal: 'Meal Prep Chili', time: '25 min', calories: '590 kcal' }
];

const snackOptions = [
  { name: 'Greek Yogurt + Banana', protein: '20g', time: '2 min', cost: '$1.50' },
  { name: 'Cottage Cheese + Fruit', protein: '18g', time: '3 min', cost: '$1.80' },
  { name: 'Trail Mix + Apple', protein: '12g', time: '1 min', cost: '$1.60' },
  { name: 'PB Toast + Milk', protein: '16g', time: '4 min', cost: '$2.10' }
];

const budgetItems = [
  { name: 'Chicken breast', price: '$6.50' },
  { name: 'Rice', price: '$2.75' },
  { name: 'Greek yogurt', price: '$4.25' },
  { name: 'Spinach', price: '$2.30' },
  { name: 'Eggs', price: '$3.10' },
  { name: 'Bananas', price: '$1.80' },
  { name: 'Sweet potatoes', price: '$2.40' },
  { name: 'Beans', price: '$1.95' }
];

const mealStats = [
  { label: 'Calories', value: '2,700', detail: '/ day' },
  { label: 'Protein', value: '145g', detail: 'target' },
  { label: 'Budget', value: '$38', detail: 'weekly' },
  { label: 'Prep Time', value: '12 min', detail: 'avg meal' }
];

const app = document.querySelector('#app');

const state = {
  selectedIngredients: ['Oats', 'Greek Yogurt', 'Chicken Breast', 'Rice', 'Spinach', 'Broccoli'],
  activeFilter: 'all'
};

function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

function getFilteredRecipes() {
  return recipes.filter((recipe) => {
    const hasIngredientMatch =
      state.selectedIngredients.length === 0 ||
      state.selectedIngredients.some((ingredient) => recipe.ingredients.includes(ingredient));

    const matchesFilter =
      state.activeFilter === 'all' || recipe.tags.includes(state.activeFilter);

    return hasIngredientMatch && matchesFilter;
  });
}

function renderIngredientChips() {
  return pantryOptions
    .map(
      (ingredient) => `
        <button class="chip ${state.selectedIngredients.includes(ingredient) ? 'active' : ''}" data-ingredient="${ingredient}">
          ${ingredient}
        </button>
      `
    )
    .join('');
}

function renderFilterButtons() {
  const filters = ['all', 'budget', 'fast', 'high-protein', 'meal-prep'];

  return filters
    .map(
      (filter) => `
        <button class="filter-btn ${state.activeFilter === filter ? 'active' : ''}" data-filter="${filter}">
          ${filter === 'all' ? 'All' : filter.replace('-', ' ')}
        </button>
      `
    )
    .join('');
}

function renderRecipeCards() {
  const filteredRecipes = getFilteredRecipes();
  const totalBudget = filteredRecipes.reduce((sum, recipe) => sum + recipe.cost, 0);

  return `
    <section class="panel recipe-panel">
      <div class="panel-header recipe-header">
        <div>
          <p class="eyebrow">Ingredient-based suggestions</p>
          <h3>Smart picks for your week</h3>
        </div>
        <div class="filter-row">${renderFilterButtons()}</div>
      </div>

      <div class="recipe-grid">
        ${filteredRecipes
          .map(
            (recipe) => `
              <article class="recipe-card">
                <div class="recipe-topline">
                  <span class="meal-tag">${recipe.tags[0]}</span>
                  <span>${recipe.time}</span>
                </div>
                <h4>${recipe.name}</h4>
                <p class="recipe-highlight">${recipe.highlight}</p>
                <div class="recipe-meta">
                  <div>
                    <label>Protein</label>
                    <strong>${recipe.protein}</strong>
                  </div>
                  <div>
                    <label>Cost</label>
                    <strong>${formatCurrency(recipe.cost)}</strong>
                  </div>
                  <div>
                    <label>Calories</label>
                    <strong>${recipe.calories}</strong>
                  </div>
                </div>
                <div class="ingredient-pill-row">
                  ${recipe.ingredients
                    .map((item) => `<span class="ingredient-pill">${item}</span>`)
                    .join('')}
                </div>
              </article>
            `
          )
          .join('')}
      </div>

      <div class="budget-footnote">
        <span>Estimated recipe cost:</span>
        <strong>${formatCurrency(totalBudget)}</strong>
      </div>
    </section>
  `;
}

function renderApp() {
  const recipeCards = renderRecipeCards();

  app.innerHTML = `
    <div class="page-shell">
      <header class="topbar">
        <div class="brand-block">
          <div class="brand-mark">F</div>
          <div>
            <p class="eyebrow">Student athlete fuel</p>
            <h1>FuelFit</h1>
          </div>
        </div>
        <nav class="main-nav">
          <a href="#dashboard">Dashboard</a>
          <a href="#recipes">Recipes</a>
          <a href="#shopping">Shopping</a>
        </nav>
      </header>

      <main>
        <section id="dashboard" class="hero-card">
          <div class="hero-copy">
            <p class="status-pill">Game day ready</p>
            <h2>Eat healthy, stay fueled, and save money without overthinking meals.</h2>
            <p class="subtext">
              Smart meal prep for student athletes who need steady energy, quick prep,
              and recipes built around what they already have at home.
            </p>
            <div class="cta-row">
              <button class="primary-btn">Plan this week</button>
              <button class="secondary-btn">Use pantry mode</button>
            </div>
          </div>

          <div class="stats-grid">
            ${mealStats
              .map(
                (stat) => `
                  <div class="stat-box">
                    <span>${stat.label}</span>
                    <strong>${stat.value}</strong>
                    <small>${stat.detail}</small>
                  </div>
                `
              )
              .join('')}
          </div>
        </section>

        <section class="content-grid">
          <div class="panel ingredients-panel">
            <div class="panel-header">
              <h3>What’s in my kitchen?</h3>
              <span>${state.selectedIngredients.length} selected</span>
            </div>
            <div class="ingredient-list">
              ${renderIngredientChips()}
            </div>
          </div>

          <div class="panel mini-panel">
            <div class="panel-header">
              <h3>Meal match</h3>
              <span>${getFilteredRecipes().length} recipes</span>
            </div>
            <div class="match-summary">
              <div>
                <p>Total recipe cost</p>
                <strong>${formatCurrency(getFilteredRecipes().reduce((sum, recipe) => sum + recipe.cost, 0))}</strong>
              </div>
              <div>
                <p>Avg prep</p>
                <strong>15 min</strong>
              </div>
            </div>
            <ul class="summary-list">
              <li>Budget-first ingredients</li>
              <li>High-protein recovery options</li>
              <li>Minimal prep and no waste</li>
            </ul>
          </div>
        </section>

        ${recipeCards}

        <section class="panel snack-panel">
          <div class="panel-header">
            <h3>Fast recovery snacks</h3>
            <span>Under 5 min</span>
          </div>
          <div class="snack-grid">
            ${snackOptions
              .map(
                (snack) => `
                  <div class="snack-card">
                    <h4>${snack.name}</h4>
                    <div>
                      <span>${snack.protein}</span>
                      <small>${snack.time}</small>
                    </div>
                    <strong>${snack.cost}</strong>
                  </div>
                `
              )
              .join('')}
          </div>
        </section>

        <section id="shopping" class="shopping-layout">
          <div class="panel plan-panel">
            <div class="panel-header">
              <h3>Weekly meal plan</h3>
              <span>Budget optimized</span>
            </div>
            <div class="plan-list">
              ${weeklyPlan
                .map(
                  (day) => `
                    <div class="plan-item">
                      <span class="day-pill">${day.day}</span>
                      <div>
                        <strong>${day.meal}</strong>
                        <small>${day.time}</small>
                      </div>
                      <span class="kcals">${day.calories}</span>
                    </div>
                  `
                )
                .join('')}
            </div>
          </div>

          <div class="panel list-panel">
            <div class="panel-header">
              <h3>Budget shopping list</h3>
              <span>From pantry match</span>
            </div>
            <ul class="shopping-list">
              ${budgetItems
                .map((item) => `<li>${item.name} <span>${item.price}</span></li>`)
                .join('')}
            </ul>
          </div>
        </section>
      </main>
    </div>
  `;

  attachEvents();
}

function attachEvents() {
  document.querySelectorAll('.chip').forEach((button) => {
    button.addEventListener('click', () => {
      const ingredient = button.dataset.ingredient;
      const selected = state.selectedIngredients.includes(ingredient);

      state.selectedIngredients = selected
        ? state.selectedIngredients.filter((item) => item !== ingredient)
        : [...state.selectedIngredients, ingredient];

      renderApp();
    });
  });

  document.querySelectorAll('.filter-btn').forEach((button) => {
    button.addEventListener('click', () => {
      state.activeFilter = button.dataset.filter;
      renderApp();
    });
  });
}

renderApp();
