import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

const toggleItems = [
  { id: 'dark', label: 'Dark hearth mode' },
  { id: 'notifications', label: 'Recipe notifications' },
  { id: 'reminders', label: 'Cook mode reminders' },
];

const Settings = () => {
  const [toggles, setToggles] = useState({
    dark: false,
    notifications: true,
    reminders: true,
  });

  const toggle = (id) => setToggles((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-olive">Settings</p>
        <h1 className="font-display text-4xl text-espresso">Tune your experience</h1>
      </div>
      <div className="space-y-6 rounded-[2rem] border border-white/60 bg-white/80 p-8 shadow-book">
        {toggleItems.map((item) => (
          <motion.label
            key={item.id}
            className="flex items-center justify-between rounded-2xl border border-espresso/10 bg-parchment/60 p-4 shadow-inner"
            whileTap={{ scale: 0.98 }}
          >
            <div>
              <p className="font-semibold text-espresso">{item.label}</p>
              <p className="text-sm text-espresso/60">Keep your cooking flow personalized.</p>
            </div>
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className={`relative h-8 w-14 rounded-full transition ${toggles[item.id] ? 'bg-terracotta' : 'bg-espresso/30'}`}
            >
              <span
                className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${toggles[item.id] ? 'right-1' : 'left-1'}`}
              />
            </button>
          </motion.label>
        ))}
        <Button className="w-full">Save settings</Button>
      </div>
    </div>
  );
};

export default Settings;

