import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  const update = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    login({ email: form.email });
    const next = location.state?.from || '/discover';
    navigate(next, { replace: true });
  };

  return (
    <div className="grid min-h-[70vh] gap-8 rounded-[2rem] border border-white/60 bg-white/60 p-4 shadow-book lg:grid-cols-2">
      <div className="hidden rounded-[1.5rem] bg-[radial-gradient(circle_at_top,#C9713D,#2B221E)] text-white lg:flex flex-col justify-between p-10">
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-white/60">Welcome back</p>
          <h1 className="mt-4 font-display text-4xl">Let’s cook something soulful.</h1>
          <p className="mt-3 text-white/80">Slide into your personal cookbook, resume cook mode sessions, and keep your pantry synced.</p>
        </div>
      </div>
      <motion.form layout className="flex flex-col gap-6 rounded-[1.5rem] bg-white/80 p-10" onSubmit={submit}>
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-olive">Login</p>
          <h2 className="font-display text-3xl text-espresso">Back in the kitchen</h2>
        </div>
        <Input label="Email" type="email" value={form.email} onChange={update('email')} required />
        <Input label="Password" type="password" value={form.password} onChange={update('password')} required />
        <label className="flex items-center gap-2 text-sm text-espresso/70">
          <input type="checkbox" className="rounded border-espresso/30 text-terracotta focus:ring-terracotta" /> Remember me
        </label>
        <Button type="submit" size="lg">
          Login
        </Button>
        <p className="text-sm text-espresso/70">
          Need an account?{' '}
          <button type="button" className="text-terracotta underline" onClick={() => navigate('/signup')}>
            Sign up
          </button>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;

