import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { searchRemoteRecipes } from '../api/apiNinjaClient';
import { createLocalRecipe, fetchLocalRecipes } from '../api/jsonServerClient';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { RecipeCard } from '../components/ui/RecipeCard';
import { Tag } from '../components/ui/Tag';
import { Loader } from '../components/ui/Loader';
import { EmptyState } from '../components/ui/EmptyState';

const filters = ['Under 20 mins', 'Vegan', 'High Protein', 'Gluten-Free', 'One Pot'];

const Discover = () => {
  const navigate = useNavigate();
  const [ingredient, setIngredient] = useState('tomato');
  const [recipeName, setRecipeName] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [apiRecipes, setApiRecipes] = useState([]);
  const [localRecipes, setLocalRecipes] = useState([]);
  const [loadingRemote, setLoadingRemote] = useState(false);

  const loadLocal = async () => {
    try {
      const list = await fetchLocalRecipes();
      setLocalRecipes(list);
    } catch (error) {
      console.error(error);
      toast.error('Unable to load cookbook');
    }
  };

  useEffect(() => {
    loadLocal();
  }, []);

  const search = async (event) => {
    if (event) event.preventDefault();
    setLoadingRemote(true);
    try {
      if (!ingredient && !recipeName && !cuisine) {
        toast.error('Add an ingredient, recipe name, or cuisine to search.');
        setLoadingRemote(false);
        return;
      }

      const results = await searchRemoteRecipes({ ingredient, cuisine, recipeName });
      setApiRecipes(results);
    } catch (error) {
      console.error(error);
      toast.error('API Ninjas request failed');
    } finally {
      setLoadingRemote(false);
    }
  };

  useEffect(() => {
    search();
  }, []);

  const handleSave = async (recipe) => {
    try {
      const payload = { ...recipe, id: undefined, source: 'local' };
      await createLocalRecipe(payload);
      toast.success('Saved to cookbook');
      loadLocal();
    } catch (error) {
      toast.error('Failed to save recipe');
    }
  };

  const filteredApi = apiRecipes.filter((recipe) => {
    if (!selectedFilter) return true;
    const total = recipe.totalTime || recipe.prepTime + recipe.cookTime;
    switch (selectedFilter) {
      case 'Under 20 mins':
        return total <= 20;
      case 'Vegan':
        return recipe.tags?.some((tag) => tag?.toLowerCase().includes('vegan'));
      case 'High Protein':
        return recipe.tags?.some((tag) => tag?.toLowerCase().includes('protein'));
      case 'Gluten-Free':
        return recipe.tags?.some((tag) => tag?.toLowerCase().includes('gluten'));
      case 'One Pot':
        return recipe.description?.toLowerCase().includes('pot');
      default:
        return true;
    }
  });

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <header className="rounded-[2rem] border border-white/60 bg-white/80 p-8 shadow-book">
        <p className="text-sm uppercase tracking-[0.5em] text-olive">Discover</p>
        <h1 className="mt-2 font-display text-4xl text-espresso">Earthy recipes from API Ninjas</h1>
        <form className="mt-6 grid gap-4 md:grid-cols-[2fr_2fr_1fr_auto]" onSubmit={search}>
          <Input label="Ingredient" value={ingredient} onChange={(e) => setIngredient(e.target.value)} placeholder="chicken, tomato..." />
          <Input label="Recipe name" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} placeholder="lasagna, curry..." />
          <Input label="Cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)} placeholder="Italian, Thai" />
          <Button type="submit" className="self-end">
            Search
          </Button>
        </form>
        <div className="mt-6 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedFilter((prev) => (prev === filter ? '' : filter))}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide ${
                selectedFilter === filter ? 'bg-terracotta text-white' : 'bg-parchment text-espresso/70'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl text-espresso">API finds</h2>
          <Tag variant="solid">Live data</Tag>
        </div>
        {loadingRemote ? (
          <Loader label="Searching clay ovens..." />
        ) : filteredApi.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredApi.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onView={() => navigate(`/recipe/${recipe.id}`, { state: { recipe } })}
                onSave={() => handleSave(recipe)}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="No remote recipes yet" description="Try a different ingredient or cuisine." />
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl text-espresso">My cookbook</h2>
          <Button variant="secondary" onClick={() => navigate('/recipe/new')}>
            Add recipe
          </Button>
        </div>
        {localRecipes.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {localRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onView={() => navigate(`/recipe/${recipe.id}`)}
                showActions={false}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Your cookbook is still empty"
            description="Save an API recipe or craft your own."
            actionLabel="Start with a blank page"
            onAction={() => navigate('/recipe/new')}
          />
        )}
      </section>
    </div>
  );
};

export default Discover;

