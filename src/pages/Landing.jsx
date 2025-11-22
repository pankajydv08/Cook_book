import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ThreeHeroScene } from '../components/ui/ThreeHeroScene';
import { RecipeCard } from '../components/ui/RecipeCard';
import { useAuth } from '../context/AuthContext';

const heroRecipes = [
  {
    id: 'hero-1',
    title: 'Smoky Clay Pot Chickpeas',
    description: 'Slow-cooked with paprika oil, charred lemon, and toasted cumin.',
    tags: ['high protein', 'vegan'],
    totalTime: 35,
    cuisine: 'Mediterranean',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'hero-2',
    title: 'Woodfired Herb Focaccia',
    description: 'Fermented overnight, finished with smoked sea salt and rosemary.',
    tags: ['baking', 'sharing'],
    totalTime: 95,
    cuisine: 'Italian',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=800&q=80',
  },
];

const stats = [
  { label: 'Flip-ready Recipes', value: '480+' },
  { label: 'Community Creations', value: '1.9k' },
  { label: 'Cook Mode Sessions', value: '12k' },
];

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleBrowse = () => {
    navigate(isAuthenticated ? '/discover' : '/login');
  };

  const handleRecipeView = (recipe) => {
    if (!isAuthenticated) {
      navigate('/signup');
      return;
    }
    navigate(`/recipe/${recipe.id}`, { state: { recipe } });
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16">
      <section className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <motion.p className="text-sm uppercase tracking-[0.5em] text-olive" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            Earthy kitchen OS
          </motion.p>
          <motion.h1
            className="font-display text-5xl leading-tight text-espresso"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Cook smarter with your own <span className="text-terracotta">flipping</span> cookbook.
          </motion.h1>
          <motion.p className="text-lg text-espresso/80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Discover recipes, save favorites, and glide through instructions in a realistic 3D book. Built for cozy kitchens and premium tastes.
          </motion.p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" onClick={() => navigate('/signup')}>
              Get Started
            </Button>
            <Button variant="outline" size="lg" onClick={handleBrowse}>
              Browse Recipes
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-6 rounded-3xl border border-white/60 bg-white/70 p-6 shadow-book">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl text-espresso">{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.4em] text-espresso/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <ThreeHeroScene />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-olive">Chef’s picks</p>
            <h2 className="font-display text-3xl text-espresso">Turn the page and dive in</h2>
          </div>
          <Button variant="ghost" onClick={handleBrowse}>
            Explore
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {heroRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onView={() => handleRecipeView(recipe)} showActions={false} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;

