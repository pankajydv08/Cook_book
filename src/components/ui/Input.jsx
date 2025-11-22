import clsx from 'clsx';

export const Input = ({ label, helper, className, ...props }) => (
  <label className="flex flex-col gap-2 text-sm font-medium text-espresso/80">
    {label && <span>{label}</span>}
    <input
      className={clsx(
        'rounded-2xl border border-espresso/10 bg-white/80 px-4 py-3 text-base text-espresso placeholder:text-espresso/40 shadow-inner focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30',
        className,
      )}
      {...props}
    />
    {helper && <span className="text-xs text-espresso/50">{helper}</span>}
  </label>
);

