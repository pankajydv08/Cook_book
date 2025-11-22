import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { Tag } from './Tag';
import { Button } from './Button';
import { formatDuration } from '../../utils/format';

const fallbackImage =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80';

export const RecipeCard = ({ recipe, onView, onSave, secondaryLabel = 'Save', showActions = true }) => {
  const {
    title,
    description,
    image = fallbackImage,
    tags = [],
    totalTime,
    cuisine,
    source = 'local',
  } = recipe;

  return (
    <Tilt
      tiltMaxAngleX={6}
      tiltMaxAngleY={6}
      className="w-full"
      glareEnable
      glareMaxOpacity={0.2}
      glareColor="#ffffff"
      glarePosition="bottom"
    >
      <motion.div
        className="flex h-full flex-col rounded-3xl border border-white/60 bg-white/80 shadow-book backdrop-blur"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="relative overflow-hidden rounded-t-3xl">
          <img src={image} alt={title} className="h-48 w-full object-cover" />
          <span className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white">
            {source}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-5">
          <div>
            <h3 className="font-display text-xl text-espresso">{title}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-espresso/70">{description || 'Beautiful earthy recipe.'}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
            {cuisine && <Tag variant="outline">{cuisine}</Tag>}
          </div>

          <div className="flex items-center justify-between text-sm text-espresso/60">
            <span>{formatDuration(totalTime)}</span>
            <span>{recipe.servings ? `${recipe.servings} serves` : 'Chef-tested'}</span>
          </div>

          {showActions && (
            <div className="mt-auto flex gap-3">
              <Button className="w-full" onClick={onView}>
                View Recipe
              </Button>
              {onSave && (
                <Button variant="outline" className="w-full" onClick={onSave}>
                  {secondaryLabel}
                </Button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </Tilt>
  );
};

