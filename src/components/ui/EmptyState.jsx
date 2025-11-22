import { Button } from './Button';

export const EmptyState = ({ title, description, actionLabel, onAction }) => (
  <div className="flex flex-col items-center justify-center gap-4 rounded-[2rem] border border-dashed border-espresso/30 bg-white/60 p-10 text-center text-espresso/70">
    <h3 className="text-2xl font-display text-espresso">{title}</h3>
    <p className="max-w-md">{description}</p>
    {actionLabel && (
      <Button onClick={onAction} variant="secondary">
        {actionLabel}
      </Button>
    )}
  </div>
);

