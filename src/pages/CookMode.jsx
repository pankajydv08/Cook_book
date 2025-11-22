import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { fetchLocalRecipeById } from '../api/jsonServerClient';
import { Loader } from '../components/ui/Loader';
import { Button } from '../components/ui/Button';

const CookMode = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(location.state?.recipe);
  const [loading, setLoading] = useState(!location.state?.recipe);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const load = async () => {
      if (recipe) {
        setLoading(false);
        return;
      }
      try {
        const data = await fetchLocalRecipeById(id);
        setRecipe(data);
      } catch (error) {
        toast.error('Unable to load recipe');
        navigate(`/recipe/${id}`);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate, recipe]);

  if (loading) return <Loader label="Preparing cook mode..." />;

  if (!recipe) return null;

  const steps = recipe.steps || [];
  const stepsCount = steps.length;
  const progressPercent = stepsCount ? ((stepIndex + 1) / stepsCount) * 100 : 0;
  const currentStep = steps[stepIndex];

  const goNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      toast.success('You’re done! Enjoy the dish.');
    }
  };

  const goPrev = () => setStepIndex((prev) => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#F7E4CF] to-[#EACCA8] text-[#2B1C13]">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-[#8A5B3B]">Cook mode</p>
            <h1 className="font-display text-3xl text-[#4B2E1C]">{recipe.title}</h1>
          </div>
          <Button
            variant="ghost"
            className="text-[#8F3B21] hover:text-[#B84F2B]"
            onClick={() => navigate(`/recipe/${recipe.id}`)}
          >
            Exit
          </Button>
        </div>

        <div className="h-2 rounded-full bg-[#E0C5AD]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#C86936] to-[#9F3E1F] transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-sm text-[#805D42]">
          Step {stepsCount ? stepIndex + 1 : 0} / {stepsCount}
        </p>

        <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] border border-[#E4C8AD] bg-white/80 p-8 shadow-[0_25px_60px_rgba(137,96,60,0.25)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep?.id || stepIndex}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 text-[#2B1C13]"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-[#B0512A]">Step {stepIndex + 1}</p>
              <h2 className="font-display text-2xl text-[#3D2618]">
                {currentStep?.title || `Instruction ${stepIndex + 1}`}
              </h2>
              <p className="text-lg leading-relaxed text-[#4B2E1C]/80">
                {currentStep?.text || 'Follow the next instruction in your own style.'}
              </p>
            </motion.div>
          </AnimatePresence>
          {stepIndex === steps.length - 1 && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center text-4xl font-display text-[#C86936]/50"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
            >
              🍽️
            </motion.div>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 border-[#D6B495] bg-[#F8E8D7] text-[#5A3A27] hover:bg-[#F3DBC4]"
            onClick={goPrev}
            disabled={stepIndex === 0}
          >
            Previous
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-[#C86936] to-[#9F3E1F] text-[#FEF4EC] hover:brightness-110"
            onClick={goNext}
          >
            {stepIndex === steps.length - 1 ? 'Finish' : 'Next step'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookMode;

