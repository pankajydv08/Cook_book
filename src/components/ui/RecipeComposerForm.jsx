import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Input } from './Input';

const randomId = () => (crypto?.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));
const emptyIngredient = () => ({ id: randomId(), quantity: '', unit: '', item: '' });
const emptyStep = () => ({ id: randomId(), title: '', text: '' });

export const RecipeComposerForm = ({ initialData, onSubmit, submitting, title, cta }) => {
  const [base, setBase] = useState({
    title: '',
    description: '',
    cuisine: '',
    category: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    tags: '',
  });
  const [ingredients, setIngredients] = useState([emptyIngredient()]);
  const [steps, setSteps] = useState([emptyStep()]);

  useEffect(() => {
    if (initialData) {
      setBase({
        title: initialData.title || '',
        description: initialData.description || '',
        cuisine: initialData.cuisine || '',
        category: initialData.category || '',
        prepTime: initialData.prepTime || '',
        cookTime: initialData.cookTime || '',
        servings: initialData.servings || '',
        tags: initialData.tags?.join(', ') || '',
      });
      setIngredients(initialData.ingredients?.length ? initialData.ingredients : [emptyIngredient()]);
      setSteps(initialData.steps?.length ? initialData.steps : [emptyStep()]);
    }
  }, [initialData]);

  const updateIngredient = (id, patch) =>
    setIngredients((prev) => prev.map((row) => (row.id === id ? { ...row, ...patch } : row)));

  const updateStep = (id, patch) => setSteps((prev) => prev.map((row) => (row.id === id ? { ...row, ...patch } : row)));

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      ...base,
      prepTime: Number(base.prepTime) || 0,
      cookTime: Number(base.cookTime) || 0,
      servings: Number(base.servings) || 0,
      tags: base.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      ingredients: ingredients.filter((ing) => ing.item || ing.quantity),
      steps: steps.filter((step) => step.text),
      totalTime: (Number(base.prepTime) || 0) + (Number(base.cookTime) || 0),
      source: 'local',
    };

    onSubmit(payload);
  };

  return (
    <motion.form
      layout
      onSubmit={handleSubmit}
      className="space-y-8 rounded-[2rem] border border-white/60 bg-white/80 p-8 shadow-book"
    >
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.5em] text-espresso/40">{title}</p>
        <h2 className="font-display text-3xl text-espresso">
          Craft your recipe <span className="text-terracotta">flow</span>
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Title"
          value={base.title}
          onChange={(e) => setBase((prev) => ({ ...prev, title: e.target.value }))}
          required
        />
        <Input label="Cuisine" value={base.cuisine} onChange={(e) => setBase((prev) => ({ ...prev, cuisine: e.target.value }))} />
        <Input label="Category" value={base.category} onChange={(e) => setBase((prev) => ({ ...prev, category: e.target.value }))} />
        <Input
          label="Tags"
          helper="Comma separated"
          value={base.tags}
          onChange={(e) => setBase((prev) => ({ ...prev, tags: e.target.value }))}
        />
        <Input
          label="Prep Time (min)"
          type="number"
          value={base.prepTime}
          onChange={(e) => setBase((prev) => ({ ...prev, prepTime: e.target.value }))}
        />
        <Input
          label="Cook Time (min)"
          type="number"
          value={base.cookTime}
          onChange={(e) => setBase((prev) => ({ ...prev, cookTime: e.target.value }))}
        />
        <Input
          label="Servings"
          type="number"
          value={base.servings}
          onChange={(e) => setBase((prev) => ({ ...prev, servings: e.target.value }))}
        />
      </div>

      <label className="flex flex-col gap-3 text-sm font-medium text-espresso/80">
        Description
        <textarea
          className="min-h-[120px] rounded-2xl border border-espresso/10 bg-white/80 p-4 text-base shadow-inner focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
          value={base.description}
          onChange={(e) => setBase((prev) => ({ ...prev, description: e.target.value }))}
        />
      </label>

      <section>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl text-espresso">Ingredients</h3>
          <Button type="button" variant="ghost" onClick={() => setIngredients((prev) => [...prev, emptyIngredient()])}>
            + Add
          </Button>
        </div>
        <div className="mt-4 space-y-4">
          {ingredients.map((ingredient) => (
            <motion.div
              key={ingredient.id}
              layout
              className="grid gap-3 rounded-2xl border border-espresso/10 bg-white/70 p-4 shadow-inner md:grid-cols-[120px_120px_1fr]"
            >
              <Input label="Qty" value={ingredient.quantity} onChange={(e) => updateIngredient(ingredient.id, { quantity: e.target.value })} />
              <Input label="Unit" value={ingredient.unit} onChange={(e) => updateIngredient(ingredient.id, { unit: e.target.value })} />
              <Input label="Ingredient" value={ingredient.item} onChange={(e) => updateIngredient(ingredient.id, { item: e.target.value })} />
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl text-espresso">Steps</h3>
          <Button type="button" variant="ghost" onClick={() => setSteps((prev) => [...prev, emptyStep()])}>
            + Add step
          </Button>
        </div>
        <div className="mt-4 space-y-4">
          {steps.map((step, idx) => (
            <motion.div key={step.id} layout className="rounded-2xl border border-espresso/10 bg-white/70 p-4 shadow-inner">
              <p className="text-xs uppercase tracking-[0.4em] text-espresso/40 mb-2">Step {idx + 1}</p>
              <Input label="Title" value={step.title} onChange={(e) => updateStep(step.id, { title: e.target.value })} />
              <label className="mt-3 flex flex-col gap-2 text-sm">
                Instruction
                <textarea
                  className="min-h-[100px] rounded-2xl border border-espresso/10 bg-white/80 p-3 shadow-inner focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                  value={step.text}
                  onChange={(e) => updateStep(step.id, { text: e.target.value })}
                />
              </label>
            </motion.div>
          ))}
        </div>
      </section>

      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? 'Saving...' : cta}
      </Button>
    </motion.form>
  );
};

