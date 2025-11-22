import { useEffect, useMemo, useState } from 'react';

const chunkArray = (arr = [], size = 4) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const normalizeStep = (step) => {
  if (!step) return '';
  if (typeof step === 'string') return step;
  return step.text || step.title || '';
};

const formatIngredient = (ing) => {
  if (!ing) return 'Ingredient';
  if (typeof ing === 'string') return ing;
  const { quantity, unit, item, name } = ing;
  return [quantity, unit, item || name].filter(Boolean).join(' ').trim() || 'Ingredient';
};

const BookPage = ({ children, className = '' }) => (
  <div className={`bg-[#F7EFE6] border border-[#E0D0C2] shadow-lg rounded-md px-6 py-4 flex flex-col ${className}`}>
    {children}
  </div>
);

export const FlipBook = ({ recipe, onAddToCookbook, onStartCooking, className = '' }) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(0);
  }, [recipe]);

  if (!recipe) {
    return <div className="w-full py-16 text-center text-sm text-neutral-600">No recipe selected.</div>;
  }

  const {
    title = 'Untitled Recipe',
    description = '',
    cuisine = '',
    difficulty = '',
    totalTime,
    servings,
    tags = [],
    ingredients = [],
    steps = [],
    notes = '',
  } = recipe;

  const safeTags = Array.isArray(tags) ? tags : [];
  const safeIngredients = Array.isArray(ingredients) ? ingredients : [];
  const safeSteps = Array.isArray(steps) ? steps : [];

  const normalizedSteps = useMemo(() => safeSteps.map(normalizeStep).filter(Boolean), [safeSteps]);
  const stepChunks = useMemo(() => chunkArray(normalizedSteps, 4), [normalizedSteps]);
  const normalizedNotes = typeof notes === 'string' ? notes.trim() : notes ? String(notes) : '';
  const hasNotes = normalizedNotes.length > 0;

  const pages = useMemo(() => {
    const list = [];

    list.push({
      key: 'cover',
      label: 'Cover',
      content: (
        <BookPage>
          <div className="flex h-full flex-col justify-between">
            <div>
              <p className="mb-3 text-[0.7rem] uppercase tracking-[0.2em] text-[#8A5A3D]/80">Signature Dish</p>
              <h1 className="text-3xl font-semibold text-[#2C1B16] leading-tight">{title}</h1>
              {description && <p className="mt-4 text-sm text-[#5B4635] line-clamp-5">{description}</p>}
            </div>
            <div className="space-y-3 text-xs text-[#6C5340]">
              <div className="flex flex-wrap gap-2">
                {cuisine && <span className="rounded-full bg-[#E5D5C6] px-3 py-1">Cuisine: {cuisine}</span>}
                {difficulty && <span className="rounded-full bg-[#E5D5C6] px-3 py-1">Difficulty: {difficulty}</span>}
                {typeof totalTime !== 'undefined' && (
                  <span className="rounded-full bg-[#E5D5C6] px-3 py-1">Time: {totalTime} mins</span>
                )}
                {typeof servings !== 'undefined' && (
                  <span className="rounded-full bg-[#E5D5C6] px-3 py-1">Serves: {servings}</span>
                )}
              </div>
              <div className="flex items-center justify-between border-t border-[#E0D0C2] pt-3 text-[#7A5A43]">
                <span>Use the controls below to flip pages.</span>
                <span className="italic">Cover</span>
              </div>
            </div>
          </div>
        </BookPage>
      ),
    });

    list.push({
      key: 'overview',
      label: 'Overview',
      content: (
        <BookPage>
          <div className="flex h-full flex-col">
            <h2 className="mb-2 text-xl font-semibold text-[#2C1B16]">Overview</h2>
            <div className="mb-4 h-1 w-12 rounded-full bg-[#C96A3D]" />
            <div className="flex-1 space-y-3 text-sm text-[#5B4635]">
              {description && <p className="leading-relaxed">{description}</p>}
              <div className="mt-2 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg bg-[#F1E3D2] p-3">
                  <span className="text-[0.65rem] uppercase tracking-wide text-[#8A5A3D]/80">Cuisine</span>
                  <span className="font-medium">{cuisine || 'Not specified'}</span>
                </div>
                <div className="rounded-lg bg-[#F1E3D2] p-3">
                  <span className="text-[0.65rem] uppercase tracking-wide text-[#8A5A3D]/80">Difficulty</span>
                  <span className="font-medium">{difficulty || 'Unknown'}</span>
                </div>
                <div className="rounded-lg bg-[#F1E3D2] p-3">
                  <span className="text-[0.65rem] uppercase tracking-wide text-[#8A5A3D]/80">Total Time</span>
                  <span className="font-medium">
                    {typeof totalTime !== 'undefined' ? `${totalTime} mins` : 'N/A'}
                  </span>
                </div>
                <div className="rounded-lg bg-[#F1E3D2] p-3">
                  <span className="text-[0.65rem] uppercase tracking-wide text-[#8A5A3D]/80">Servings</span>
                  <span className="font-medium">{typeof servings !== 'undefined' ? servings : 'N/A'}</span>
                </div>
              </div>
              {safeTags.length > 0 && (
                <div className="mt-3">
                  <p className="mb-1 text-xs font-semibold text-[#7A5A43]">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {safeTags.map((tag) => (
                      <span key={tag} className="rounded-full bg-[#E7D5C3] px-3 py-1 text-[0.7rem] text-[#4B3525]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 text-right text-[0.7rem] text-[#8A5A3D]">Page 2 · Overview</div>
          </div>
        </BookPage>
      ),
    });

    list.push({
      key: 'ingredients',
      label: 'Ingredients',
      content: (
        <BookPage>
          <div className="flex h-full flex-col">
            <h2 className="mb-2 text-xl font-semibold text-[#2C1B16]">Ingredients</h2>
            <div className="mb-4 h-1 w-12 rounded-full bg-[#556B2F]" />
            <div className="flex-1 overflow-y-auto pr-1 text-sm">
              {safeIngredients.length ? (
                <ul className="space-y-2">
                  {safeIngredients.map((ing, idx) => (
                    <li
                      key={`${formatIngredient(ing)}-${idx}`}
                      className="flex items-start gap-2 rounded-lg bg-[#F2E4D5] px-3 py-2 text-[#4B3525]"
                    >
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-[#C59A7D] text-[#C96A3D] focus:ring-[#C96A3D]"
                      />
                      <span>{formatIngredient(ing)}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#7A5A43]">No ingredients listed.</p>
              )}
            </div>
            <div className="mt-3 text-right text-[0.7rem] text-[#8A5A3D]">Page 3 · Ingredients</div>
          </div>
        </BookPage>
      ),
    });

    stepChunks.forEach((chunk, pageIndex) => {
      list.push({
        key: `steps-${pageIndex}`,
        label: `Steps ${pageIndex + 1}`,
        content: (
          <BookPage>
            <div className="flex h-full flex-col">
              <h2 className="mb-2 text-xl font-semibold text-[#2C1B16]">
                Steps {stepChunks.length > 1 ? `(${pageIndex + 1})` : ''}
              </h2>
              <div className="mb-4 h-1 w-12 rounded-full bg-[#C96A3D]" />
              <div className="flex-1 overflow-y-auto pr-1">
                <ol className="space-y-3 text-sm">
                  {chunk.map((step, idx) => {
                    const stepNumber = pageIndex * 4 + idx + 1;
                    return (
                      <li key={`${stepNumber}-${step}`} className="rounded-lg border border-[#E0D0C2] bg-[#F4E4D4] p-3">
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#C96A3D]/90 text-[0.7rem] font-semibold text-white">
                            {stepNumber}
                          </div>
                          <p className="leading-relaxed text-[#4B3525]">{step}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
              <div className="mt-3 text-right text-[0.7rem] text-[#8A5A3D]">Page {4 + pageIndex} · Steps</div>
            </div>
          </BookPage>
        ),
      });
    });

    if (hasNotes) {
      list.push({
        key: 'notes',
        label: 'Notes & Tips',
        content: (
          <BookPage>
            <div className="flex h-full flex-col">
              <h2 className="mb-2 text-xl font-semibold text-[#2C1B16]">Notes & Tips</h2>
              <div className="mb-4 h-1 w-12 rounded-full bg-[#8A5A3D]" />
              <div className="flex-1 overflow-y-auto pr-1">
                <p className="whitespace-pre-line text-sm leading-relaxed text-[#4B3525]">{normalizedNotes}</p>
              </div>
              <div className="mt-3 text-right text-[0.7rem] text-[#8A5A3D]">Final Page · Notes</div>
            </div>
          </BookPage>
        ),
      });
    }

    return list;
  }, [
    title,
    description,
    cuisine,
    difficulty,
    totalTime,
    servings,
    safeTags,
    safeIngredients,
    stepChunks,
    hasNotes,
    normalizedNotes,
  ]);

  const totalPages = pages.length;

  useEffect(() => {
    if (!totalPages) return;
    setCurrentPage((prev) => Math.min(prev, totalPages - 1));
  }, [totalPages]);

  const current = pages[currentPage] ?? null;

  const goToPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 0));
  const goToNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));

  const progressPercent = totalPages > 0 ? ((currentPage + 1) / totalPages) * 100 : 0;

  return (
    <div className={`w-full flex flex-col gap-8 items-start justify-center lg:flex-row ${className}`}>
      <div className="flex w-full flex-col items-center gap-4 lg:w-[60%]">
        <div className="relative w-full max-w-[480px]">
          <div className="absolute -inset-4 -z-10 blur-2xl bg-gradient-to-br from-[#D6B89B]/30 via-transparent to-[#8A5A3D]/20" />
          <div className="rounded-xl bg-[#FDF8F3] p-4 shadow-2xl">
            {current ? (
              <div key={current.key} className="transition-all duration-300">
                {current.content}
              </div>
            ) : (
              <div className="flex h-[520px] items-center justify-center rounded-md border border-dashed border-[#E0D0C2] text-sm text-[#8A5A3D]">
                No pages available for this recipe.
              </div>
            )}
          </div>
        </div>

        <div className="w-full max-w-[480px] space-y-3 rounded-2xl border border-[#E0D0C2] bg-white/70 p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#5B4635]">
            <button
              type="button"
              onClick={goToPrev}
              disabled={currentPage === 0}
              className="rounded-full border border-[#D2B8A1] bg-[#F4E4D4] px-4 py-2 transition hover:bg-[#EAD3BF] disabled:cursor-not-allowed disabled:opacity-50"
            >
              ← Previous
            </button>
            <span className="text-[0.75rem] font-medium">
              Page {totalPages ? currentPage + 1 : 0} / {totalPages || 0}
            </span>
            <button
              type="button"
              onClick={goToNext}
              disabled={currentPage >= totalPages - 1}
              className="rounded-full border border-[#C77A4C] bg-[#C96A3D] px-4 py-2 text-white transition hover:bg-[#b85f2e] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next →
            </button>
          </div>
          <div className="h-1 w-full rounded-full bg-[#EAD3BF]">
            <div
              className="h-full rounded-full bg-[#C96A3D] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {current && (
            <div className="text-center text-xs text-[#7A5A43]">
              Viewing <span className="font-semibold">{current.label}</span>
            </div>
          )}
        </div>
      </div>

      <div className="w-full rounded-2xl border border-[#E0D0C2] bg-[#F7EFE6]/80 p-5 shadow-md backdrop-blur-md lg:w-[35%]">
        <p className="mb-1 text-[0.7rem] uppercase tracking-[0.18em] text-[#8A5A3D]/80">Recipe</p>
        <h2 className="mb-2 text-2xl font-semibold text-[#2C1B16]">{title}</h2>
        {description && <p className="mb-4 text-sm text-[#5B4635]">{description}</p>}
        <div className="mb-4 grid grid-cols-2 gap-3 text-xs">
          {cuisine && (
            <div className="rounded-lg bg-[#F1E3D2] p-3">
              <span className="text-[0.65rem] uppercase tracking-wide text-[#8A5A3D]/80">Cuisine</span>
              <span className="font-medium text-[#3A2416]">{cuisine}</span>
            </div>
          )}
          {difficulty && (
            <div className="rounded-lg bg-[#F1E3D2] p-3">
              <span className="text-[0.65rem] uppercase tracking-wide text-[#8A5A3D]/80">Difficulty</span>
              <span className="font-medium text-[#3A2416]">{difficulty}</span>
            </div>
          )}
          {typeof totalTime !== 'undefined' && (
            <div className="rounded-lg bg-[#F1E3D2] p-3">
              <span className="text-[0.65rem] uppercase tracking-wide text-[#8A5A3D]/80">Total Time</span>
              <span className="font-medium text-[#3A2416]">{totalTime} mins</span>
            </div>
          )}
          {typeof servings !== 'undefined' && (
            <div className="rounded-lg bg-[#F1E3D2] p-3">
              <span className="text-[0.65rem] uppercase tracking-wide text-[#8A5A3D]/80">Servings</span>
              <span className="font-medium text-[#3A2416]">{servings}</span>
            </div>
          )}
        </div>
        {safeTags.length > 0 && (
          <div className="mb-4">
            <p className="mb-1 text-xs font-semibold text-[#7A5A43]">Tags</p>
            <div className="flex flex-wrap gap-2">
              {safeTags.map((tag) => (
                <span key={tag} className="rounded-full bg-[#E7D5C3] px-3 py-1 text-[0.7rem] text-[#4B3525]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          {onAddToCookbook && (
            <button
              type="button"
              onClick={onAddToCookbook}
              className="flex-1 rounded-full bg-[#C96A3D] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#b85f2e]"
            >
              Save to My Cookbook
            </button>
          )}
          {onStartCooking && (
            <button
              type="button"
              onClick={onStartCooking}
              className="flex-1 rounded-full border border-[#C96A3D] px-4 py-2 text-sm font-medium text-[#C96A3D] transition hover:bg-[#F8E7D7]"
            >
              Start Cooking Mode
            </button>
          )}
        </div>
        <p className="mt-4 text-[0.7rem] text-[#8A5A3D]/80">
          Tip: Use the buttons above or swipe on touch devices to move between pages.
        </p>
      </div>
    </div>
  );
};

