export const Loader = ({ label = 'Loading...' }) => (
  <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/60 bg-white/60 px-6 py-4 text-espresso/70 shadow-inner">
    <span className="h-3 w-3 animate-ping rounded-full bg-terracotta"></span>
    <p>{label}</p>
  </div>
);

