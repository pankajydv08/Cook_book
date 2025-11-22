import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const update = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    signup({ name: form.name, email: form.email });
    const next = location.state?.from || '/discover';
    navigate(next, { replace: true });
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-8 rounded-[2rem] border border-white/60 bg-white/60 p-4 shadow-book lg:grid-cols-2">
      <motion.form layout className="flex flex-col gap-6 rounded-[1.5rem] bg-white/80 p-10" onSubmit={submit}>
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-olive">Signup</p>
          <h2 className="font-display text-3xl text-espresso">Create your hearth login</h2>
        </div>
        <Input label="Full name" value={form.name} onChange={update('name')} required />
        <Input label="Email" type="email" value={form.email} onChange={update('email')} required />
        <Input label="Password" type="password" value={form.password} onChange={update('password')} required />
        <Button type="submit" size="lg">
          Start cooking
        </Button>
      </motion.form>
      <div className="rounded-[1.5rem] bg-[radial-gradient(circle_at_top,#6C7A45,#2B221E)] p-10 text-white flex flex-col justify-between">
        <div>
          <h3 className="font-display text-3xl">Why join?</h3>
          <ul className="mt-4 space-y-3 text-white/80">
            <li>• Save every flipbook recipe</li>
            <li>• Sync cook mode progress</li>
            <li>• Unlock earthy 3D hero scenes</li>
          </ul>
        </div>
        <p className="text-sm text-white/60">Already with us? <button className="underline" onClick={() => navigate('/login')}>Login</button></p>
      </div>
    </div>
  );
};

export default Signup;

