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

const weeklyPlan = [
  { day: 'Mon', meal: 'Protein Oat Bowl', time: '8 min', calories: '420 kcal' },
  { day: 'Tue', meal: 'Chicken Rice Power Bowl', time: '18 min', calories: '540 kcal' },
  { day: 'Wed', meal: 'Egg & Veg Wrap', time: '10 min', calories: '470 kcal' },
  { day: 'Thu', meal: 'Tuna Lentil Bowl', time: '15 min', calories: '560 kcal' },
  { day: 'Fri', meal: 'Pasta + Chicken + Greens', time: '20 min', calories: '610 kcal' },
  { day: 'Sat', meal: 'Recovery Smoothie + Toast', time: '7 min', calories: '350 kcal' },
  { day: 'Sun', meal: 'Meal Prep Chili', time: '25 min', calories: '590 kcal' }
];

const recipes = [
  {
    id: 1,
    name: 'Protein Oatmeal Power Bowl',
    time: '8 min',
    cost: '$2.40',
    protein: '28g',
    calories: '420',
    tags: ['budget', 'fast', 'high-protein'],
    ingredients: ['Oats', 'Greek Yogurt', 'Bananas', 'Peanut Butter'],
    highlight: 'Great before practice or on rushed mornings.'
  },
  {
    id: 2,
    name: 'Chicken Rice Recovery Bowl',
    time: '18 min',
    cost: '$4.85',
    protein: '42g',
    calories: '550',
    tags: ['high-protein', 'meal-prep'],
    ingredients: ['Chicken Breast', 'Rice', 'Spinach', 'Broccoli', 'Tomatoes'],
    highlight: 'Balances carbs, lean protein, and volume for recovery.'
  },
  {
    id: 3,
    name: 'Egg & Veggie Breakfast Wrap',
    time: '10 min',
    cost: '$3.10',
    protein: '24g',
    calories: '390',
    tags: ['fast', 'budget'],
    ingredients: ['Eggs', 'Tortillas', 'Spinach', 'Bell Peppers', 'Avocado'],
    highlight: 'Easy, portable, and filling on busier training days.'
  },
  {
    id: 4,
    name: 'Tuna Lentil Protein Bowl',
    time: '15 min',
    cost: '$3.75',
    protein: '35g',
    calories: '500',
    tags: ['budget', 'high-protein'],
    ingredients: ['Canned Tuna', 'Lentils', 'Tomatoes', 'Spinach', 'Rice'],
    highlight: 'Cheap pantry-friendly protein that stretches far.'
  },
  {
    id: 5,
    name: 'Sweet Potato Chicken Plate',
    time: '20 min',
    cost: '$5.25',
    protein: '40g',
    calories: '600',
    tags: ['meal-prep', 'high-protein'],
    ingredients: ['Chicken Breast', 'Sweet Potatoes', 'Broccoli', 'Avocado'],
    highlight: 'Ideal for post-workout energy and recovery.'
  },
  {
    id: 6,
    name: 'Red Lentil Veggie Chili',
    time: '25 min',
    cost: '$4.20',
    protein: '30g',
    calories: '520',
    tags: ['budget', 'meal-prep'],
    ingredients: ['Lentils', 'Tomatoes', 'Beans', 'Frozen Veggies', 'Onion'],
    highlight: 'Big batch recipe that keeps well in the fridge.'
  }
];

const quickSnacks = [
  { name: 'Greek Yogurt + Banana', protein: '20g', time: '2 min', cost: '$1.50' },
  { name: 'Cottage Cheese + Fruit', protein: '18g', time: '3 min', cost: '$1.80' },
  { name: 'Trail Mix + Apple', protein: '12g', time: '1 min', cost: '$1.60' },
  { name: 'PB Toast + Milk', protein: '16g', time: '4 min', cost: '$2.10' }
];

const mealGoalStats = [
  { label: 'Calories', value: '2,700', detail: '/ day' },
  { label: 'Protein', value: '145g', detail: 'target' },
  { label: 'Budget', value: '$38', detail: 'weekly' },
  { label: 'Prep Time', value: '12 min', detail: 'avg meal' }
];

function App() {
  const [selectedIngredients, setSelectedIngredients] = React.useState([
    'Oats',
    'Greek Yogurt',
    'Chicken Breast',
    'Rice',
    'Spinach',
    'Broccoli'
  ]);
  const [selectedFilter, setSelectedFilter] = React.useState('all');

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((current) =>
      current.includes(ingredient)
        ? current.filter((item) => item !== ingredient)
        : [...current, ingredient]
    );
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const hasIngredientMatch =
      selectedIngredients.length === 0 ||
      selectedIngredients.some((ingredient) => recipe.ingredients.includes(ingredient));

    const matchesFilter =
      selectedFilter === 'all' || recipe.tags.includes(selectedFilter);

    return hasIngredientMatch && matchesFilter;
  });

  const totalBudget = filteredRecipes.reduce((sum, recipe) => {
    return sum + Number.parseFloat(recipe.cost.replace('$', ''));
  }, 0);

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">F</div>
          <div>
            <p className="eyebrow">Student athlete fuel</p>
            <h1>FuelFit</h1>
          </div>
        </div>
        <nav className="main-nav">
          <a href="#dashboard">Dashboard</a>
          <a href="#recipes">Recipes</a>
          <a href="#shopping">Shopping</a>
        </nav>
      </header>

      <main>
        <section id="dashboard" className="hero-card">
          <div className="hero-copy">
            <p className="status-pill">Game day ready</p>
            <h2>Eat healthy, stay fueled, and save money without overthinking meals.</h2>
            <p className="subtext">
              Smart meal prep for student athletes who need steady energy, quick prep,
              and recipes built around what they already have at home.
            </p>
            <div className="cta-row">
              <button className="primary-btn">Plan this week</button>
              <button className="secondary-btn">Use pantry mode</button>
            </div>
          </div>

          <div className="stats-grid">
            {mealGoalStats.map((stat) => (
              <div key={stat.label} className="stat-box">
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <small>{stat.detail}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="content-grid">
          <div className="panel ingredients-panel">
            <div className="panel-header">
              <h3>What’s in my kitchen?</h3>
              <span>{selectedIngredients.length} selected</span>
            </div>

            <div className="ingredient-list">
              {pantryOptions.map((ingredient) => (
                <button
                  key={ingredient}
                  className={selectedIngredients.includes(ingredient) ? 'chip active' : 'chip'}
                  onClick={() => toggleIngredient(ingredient)}
                >
                  {ingredient}
                </button>
              ))}
            </div>
          </div>

          <div className="panel mini-panel">
            <div className="panel-header">
              <h3>Meal match</h3>
              <span>{filteredRecipes.length} recipes</span>
            </div>
            <div className="match-summary">
              <div>
                <p>Total recipe cost</p>
                <strong>${totalBudget.toFixed(2)}</strong>
              </div>
              <div>
                <p>Avg prep</p>
                <strong>15 min</strong>
              </div>
            </div>
            <ul className="summary-list">
              <li>Budget-first ingredients</li>
              <li>High-protein recovery options</li>
              <li>Minimal prep and no waste</li>
            </ul>
          </div>
        </section>

        <section id="recipes" className="panel recipe-panel">
          <div className="panel-header recipe-header">
            <div>
              <p className="eyebrow">Ingredient-based suggestions</p>
              <h3>Smart picks for your week</h3>
            </div>
            <div className="filter-row">
              {['all', 'budget', 'fast', 'high-protein', 'meal-prep'].map((filter) => (
                <button
                  key={filter}
                  className={selectedFilter === filter ? 'filter-btn active' : 'filter-btn'}
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter === 'all' ? 'All' : filter.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="recipe-grid">
            {filteredRecipes.map((recipe) => (
              <article key={recipe.id} className="recipe-card">
                <div className="recipe-topline">
                  <span className="meal-tag">{recipe.tags[0]}</span>
                  <span>{recipe.time}</span>
                </div>
                <h4>{recipe.name}</h4>
                <p className="recipe-highlight">{recipe.highlight}</p>
                <div className="recipe-meta">
                  <div>
                    <label>Protein</label>
                    <strong>{recipe.protein}</strong>
                  </div>
                  <div>
                    <label>Cost</label>
                    <strong>{recipe.cost}</strong>
                  </div>
                  <div>
                    <label>Calories</label>
                    <strong>{recipe.calories}</strong>
                  </div>
                </div>
                <div className="ingredient-pill-row">
                  {recipe.ingredients.map((item) => (
                    <span key={item} className="ingredient-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="panel snack-panel">
          <div className="panel-header">
            <h3>Fast recovery snacks</h3>
            <span>Under 5 min</span>
          </div>
          <div className="snack-grid">
            {quickSnacks.map((snack) => (
              <div key={snack.name} className="snack-card">
                <h4>{snack.name}</h4>
                <div>
                  <span>{snack.protein}</span>
                  <small>{snack.time}</small>
                </div>
                <strong>{snack.cost}</strong>
              </div>
            ))}
          </div>
        </section>

        <section id="shopping" className="shopping-layout">
          <div className="panel plan-panel">
            <div className="panel-header">
              <h3>Weekly meal plan</h3>
              <span>Budget optimized</span>
            </div>
            <div className="plan-list">
              {weeklyPlan.map((day) => (
                <div key={day.day} className="plan-item">
                  <span className="day-pill">{day.day}</span>
                  <div>
                    <strong>{day.meal}</strong>
                    <small>{day.time}</small>
                  </div>
                  <span className="kcals">{day.calories}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel list-panel">
            <div className="panel-header">
              <h3>Budget shopping list</h3>
              <span>From pantry match</span>
            </div>
            <ul className="shopping-list">
              <li>Chicken breast <span>$6.50</span></li>
              <li>Rice <span>$2.75</span></li>
              <li>Greek yogurt <span>$4.25</span></li>
              <li>Spinach <span>$2.30</span></li>
              <li>Eggs <span>$3.10</span></li>
              <li>Bananas <span>$1.80</span></li>
              <li>Sweet potatoes <span>$2.40</span></li>
              <li>Beans <span>$1.95</span></li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
