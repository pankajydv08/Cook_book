import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { RecipeComposerForm } from '../components/ui/RecipeComposerForm';
import { fetchLocalRecipeById, updateLocalRecipe } from '../api/jsonServerClient';
import { Loader } from '../components/ui/Loader';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchLocalRecipeById(id);
        setRecipe(data);
      } catch (error) {
        toast.error('Recipe not found');
        navigate('/cookbook');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  const handleSubmit = async (payload) => {
    setSaving(true);
    try {
      await updateLocalRecipe(id, payload);
      toast.success('Recipe updated');
      navigate(`/recipe/${id}`);
    } catch (error) {
      toast.error('Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader label="Fetching recipe..." />;

  return (
    <RecipeComposerForm
      initialData={recipe}
      onSubmit={handleSubmit}
      submitting={saving}
      title="Edit recipe"
      cta="Update recipe"
    />
  );
};

export default EditRecipe;

