export const formatDuration = (minutes) => {
  if (!minutes || Number.isNaN(minutes)) return 'Flexible time';
  if (minutes < 60) return `${minutes} mins`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}h ${mins ? `${mins}m` : ''}`.trim();
};

export const slugify = (text) =>
  text
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export const mapApiRecipe = (entry, index = 0) => {
  const slug = slugify(entry.title || `recipe-${index}`);

  const prep = Number(entry.prep_time) || 0;
  const cook = Number(entry.cook_time) || 0;
  const ninjasTotal = prep + cook;

  const readyInMinutes = Number(entry.readyInMinutes) || Number(entry.total_time) || ninjasTotal;
  const total = readyInMinutes || ninjasTotal || undefined;

  const stripHtml = (text) => text?.replace(/<[^>]+>/g, '').trim();

  const ingredients = entry.ingredients
    ? entry.ingredients.split('|').map((item, idx) => ({ id: `api-ing-${idx}`, item: item.trim() }))
    : entry.extendedIngredients
        ? entry.extendedIngredients.map((ing, idx) => ({
            id: `api-ing-${ing.id || idx}`,
            item: ing.original || `${ing.amount || ''} ${ing.unit || ''} ${ing.name}`.trim(),
          }))
        : [];

  const stepsFromString = entry.instructions
    ? entry.instructions
        .split('.')
        .filter(Boolean)
        .map((text, idx) => ({ id: `api-step-${idx}`, text: text.trim(), title: `Step ${idx + 1}` }))
    : [];

  const stepsFromAnalyzed = entry.analyzedInstructions?.[0]?.steps?.map((step) => ({
    id: `api-step-${step.number}`,
    text: step.step.trim(),
    title: `Step ${step.number}`,
  }));

  const steps = stepsFromAnalyzed?.length ? stepsFromAnalyzed : stepsFromString;

  const description =
    stripHtml(entry.summary) ||
    entry.description ||
    (entry.servings ? `Serves ${entry.servings}` : 'API recipe');

  const cuisine =
    entry.cuisine ||
    entry.cuisines?.[0] ||
    (entry.dishTypes?.length ? entry.dishTypes[0] : undefined);

  const tags = [
    entry.course,
    entry.cuisine,
    ...(entry.dishTypes || []),
    ...(entry.diets || []),
  ].filter(Boolean);

  return {
    id: `api-${slug}`,
    title: entry.title,
    description,
    cuisine,
    tags,
    prepTime: prep || undefined,
    cookTime: cook || undefined,
    totalTime: total,
    servings: entry.servings,
    ingredients,
    steps,
    notes: stripHtml(entry.instructions)?.slice(-120),
    source: 'api',
    image:
      entry.image ||
      `https://source.unsplash.com/featured/?food,${encodeURIComponent(entry.title || 'recipe')}`,
  };
};

