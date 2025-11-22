import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { deleteLocalRecipe, fetchLocalRecipes } from '../api/jsonServerClient';
import { Button } from '../components/ui/Button';
import { RecipeCard } from '../components/ui/RecipeCard';
import { EmptyState } from '../components/ui/EmptyState';

const MyCookbook = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [view, setView] = useState('grid');

  const load = async () => {
    try {
      const list = await fetchLocalRecipes();
      setRecipes(list);
    } catch (error) {
      toast.error('Failed to load cookbook');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (recipeId) => {
    if (!window.confirm('Delete this recipe?')) return;
    try {
      await deleteLocalRecipe(recipeId);
      toast.success('Recipe deleted');
      load();
    } catch (error) {
      toast.error('Unable to delete');
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-olive">My cookbook</p>
          <h1 className="font-display text-4xl text-espresso">Your saved earthy dishes</h1>
        </div>
        <div className="flex gap-3">
          <Button variant={view === 'grid' ? 'secondary' : 'ghost'} onClick={() => setView('grid')}>
            Grid
          </Button>
          <Button variant={view === 'shelf' ? 'secondary' : 'ghost'} onClick={() => setView('shelf')}>
            Bookshelf
          </Button>
          <Button onClick={() => navigate('/recipe/new')}>Add recipe</Button>
        </div>
      </header>

      {recipes.length === 0 ? (
        <EmptyState
          title="Your cookbook is still empty."
          description="Save a recipe from Discover or craft your own."
          actionLabel="Find recipes"
          onAction={() => navigate('/discover')}
        />
      ) : view === 'grid' ? (
        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onView={() => navigate(`/recipe/${recipe.id}`)}
              onSave={() => remove(recipe.id)}
              secondaryLabel="Delete"
            />
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-wrap gap-4 rounded-[2rem] border border-white/60 bg-white/80 p-8 shadow-book">
          {recipes.map((recipe) => (
            <motion.button
              key={recipe.id}
              whileHover={{ y: -6 }}
              className="flex h-48 w-16 flex-col items-center justify-between rounded-xl bg-gradient-to-b from-terracotta to-espresso/90 px-2 py-4 text-white shadow-lg"
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            >
              <span className="text-xs font-semibold rotate-90 whitespace-nowrap">{recipe.title}</span>
              <span className="text-[10px] uppercase tracking-[0.4em]">{recipe.cuisine?.slice(0, 6)}</span>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCookbook;

