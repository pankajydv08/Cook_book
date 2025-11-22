import clsx from 'clsx';

const baseStyles =
  'inline-flex items-center justify-center rounded-2xl font-semibold tracking-tight transition focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/60 disabled:opacity-50 disabled:cursor-not-allowed';

const variants = {
  primary: 'bg-clay-gradient text-white shadow-book hover:scale-[1.02]',
  secondary: 'bg-olive-gradient text-white shadow hover:scale-[1.02]',
  ghost: 'bg-transparent text-espresso hover:text-terracotta',
  outline: 'border border-espresso/20 text-espresso hover:border-terracotta hover:text-terracotta',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-base',
  lg: 'px-6 py-4 text-lg',
};

export const Button = ({ variant = 'primary', size = 'md', className, children, icon: Icon, ...props }) => (
  <button className={clsx(baseStyles, variants[variant], sizes[size], className)} {...props}>
    {Icon && <Icon className="mr-2 h-4 w-4" />}
    {children}
  </button>
);

