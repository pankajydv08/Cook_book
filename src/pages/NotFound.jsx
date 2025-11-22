import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-[2rem] border border-white/60 bg-white/80 p-10 text-center shadow-book">
      <p className="text-6xl">🥣</p>
      <h1 className="font-display text-4xl text-espresso">We couldn’t find that recipe.</h1>
      <p className="text-espresso/70">Maybe it spilled over? Let’s head back to the kitchen and find another dish.</p>
      <Button onClick={() => navigate('/')}>Back to Kitchen</Button>
    </div>
  );
};

export default NotFound;

