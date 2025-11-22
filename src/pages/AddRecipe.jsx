import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { RecipeComposerForm } from '../components/ui/RecipeComposerForm';
import { createLocalRecipe } from '../api/jsonServerClient';

const AddRecipe = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      const created = await createLocalRecipe(payload);
      toast.success('Recipe added to cookbook');
      navigate(`/recipe/${created.id}`);
    } catch (error) {
      toast.error('Failed to create recipe');
    } finally {
      setSubmitting(false);
    }
  };

  return <RecipeComposerForm onSubmit={handleSubmit} submitting={submitting} title="Add recipe" cta="Save recipe" />;
};

export default AddRecipe;

