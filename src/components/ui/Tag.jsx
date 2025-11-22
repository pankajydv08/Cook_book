import clsx from 'clsx';

export const Tag = ({ children, variant = 'default', className }) => {
  const styles = {
    default: 'bg-parchment text-espresso/80',
    solid: 'bg-terracotta text-white',
    outline: 'border border-espresso/20 text-espresso',
  };
  return <span className={clsx('rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide', styles[variant], className)}>{children}</span>;
};

