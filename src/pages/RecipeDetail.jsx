import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FlipBook } from '../components/ui/FlipBook';
import { Button } from '../components/ui/Button';
import { Tag } from '../components/ui/Tag';
import { Loader } from '../components/ui/Loader';
import { createLocalRecipe, deleteLocalRecipe, fetchLocalRecipeById } from '../api/jsonServerClient';
import { formatDuration } from '../utils/format';

const RecipeDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(location.state?.recipe);
  const [loading, setLoading] = useState(!location.state?.recipe);
  const isApiRecipe = id.startsWith('api-');

  useEffect(() => {
    const load = async () => {
      if (recipe || isApiRecipe) {
        setLoading(false);
        return;
      }
      try {
        const data = await fetchLocalRecipeById(id);
        setRecipe(data);
      } catch (error) {
        toast.error('Recipe not found');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, isApiRecipe, recipe]);

  const addToCookbook = async () => {
    try {
      await createLocalRecipe({ ...recipe, id: undefined, source: 'local' });
      toast.success('Added to cookbook');
      navigate('/cookbook');
    } catch (error) {
      toast.error('Unable to save recipe');
    }
  };

  const deleteRecipe = async () => {
    if (!window.confirm('Delete this recipe?')) return;
    try {
      await deleteLocalRecipe(recipe.id);
      toast.success('Recipe removed');
      navigate('/cookbook');
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  if (loading) return <Loader label="Opening your book..." />;

  if (!recipe) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/60 bg-white/70 p-10 shadow-book text-center">
        <p className="text-xl font-display text-espresso">We couldn’t find that recipe.</p>
        <Button className="mt-4" onClick={() => navigate('/discover')}>
          Head back
        </Button>
      </div>
    );
  }

  const stats = [
    { label: 'Prep', value: formatDuration(recipe.prepTime) },
    { label: 'Cook', value: formatDuration(recipe.cookTime) },
    { label: 'Total', value: formatDuration(recipe.totalTime) },
    { label: 'Servings', value: recipe.servings || 2 },
    { label: 'Course', value: recipe.tags?.[0] || 'Chef special' },
    { label: 'Source', value: recipe.source },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-12">
      <section className="grid gap-8 lg:grid-cols-[3fr_2fr]">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-[#2b221e] shadow-book">
          {recipe.image && (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2b221e]/90 via-[#2b221e]/40 to-transparent" />
          <div className="relative flex h-full flex-col justify-end gap-4 p-10 text-parchment">
            <div className="flex flex-wrap gap-2">
              <Tag variant="solid">{recipe.cuisine || 'Cozy kitchen'}</Tag>
              {recipe.tags?.slice(0, 3).map((tag) => (
                <Tag key={tag} variant="ghost">
                  {tag}
                </Tag>
              ))}
            </div>
            <h1 className="font-display text-5xl leading-tight">{recipe.title}</h1>
            <p className="max-w-3xl text-parchment/80">{recipe.description}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              {isApiRecipe && (
                <Button onClick={addToCookbook} size="lg">
                  Add to My Cookbook
                </Button>
              )}
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate(`/cook/${recipe.id}`, { state: { recipe } })}
              >
                Start Cooking Mode
              </Button>
              {recipe.source !== 'api' && (
                <>
                  <Button variant="outline" onClick={() => navigate(`/recipe/${recipe.id}/edit`)}>
                    Edit
                  </Button>
                  <Button variant="ghost" onClick={deleteRecipe}>
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6 rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-book backdrop-blur">
          <p className="text-xs uppercase tracking-[0.4em] text-olive">Recipe snapshot</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-espresso/10 bg-parchment/40 p-4">
                <p className="text-espresso/50 uppercase tracking-wide text-xs">{stat.label}</p>
                <p className="text-lg font-semibold text-espresso">{stat.value || '—'}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-espresso/10 bg-parchment/60 p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-espresso/50">Chef’s Note</p>
            <p className="mt-3 text-espresso/80 leading-relaxed">
              {recipe.notes || 'Fold in your favorite herbs, tweak the spice level, and serve with pride.'}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-book">
          <h2 className="font-display text-3xl text-espresso">Ingredients</h2>
          <p className="text-espresso/60">Tap to check items off your pantry.</p>
          <div className="mt-6 grid gap-3">
            {recipe.ingredients?.length ? (
              recipe.ingredients.map((ingredient) => (
                <motion.label
                  key={ingredient.id || ingredient.item || ingredient}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 rounded-2xl bg-parchment/70 px-4 py-3 text-sm shadow-inner"
                >
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-espresso/20 text-terracotta focus:ring-terracotta"
                  />
                  <span className="text-espresso/90">
                    {ingredient.item || ingredient}
                  </span>
                </motion.label>
              ))
            ) : (
              <p className="rounded-2xl bg-parchment/60 p-4 text-espresso/60">
                No ingredients provided for this recipe.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-book">
          <h2 className="font-display text-3xl text-espresso">Steps</h2>
          <p className="text-espresso/60">Follow the flow or jump into cook mode.</p>
          <div className="mt-6 space-y-4">
            {recipe.steps?.length ? (
              recipe.steps.map((step, idx) => (
                <div key={step.id || idx} className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/15 text-terracotta font-semibold">
                    {idx + 1}
                  </div>
                  <div className="rounded-2xl border border-parchment bg-parchment/70 p-4">
                    <p className="text-sm font-semibold text-espresso">{step.title || `Step ${idx + 1}`}</p>
                    <p className="text-sm text-espresso/80 leading-relaxed mt-1">{step.text || step}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-2xl bg-parchment/60 p-4 text-espresso/60">Steps coming soon.</p>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-white/60 bg-white/80 p-6 shadow-book">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-olive">Flip-through mode</p>
            <h2 className="font-display text-3xl text-espresso">Recipe book view</h2>
          </div>
          <Button variant="ghost" onClick={() => navigate(-1)}>
            Back to list
          </Button>
        </div>
        <div className="mt-6">
          <FlipBook recipe={recipe} />
        </div>
      </section>
    </div>
  );
};

export default RecipeDetail;

