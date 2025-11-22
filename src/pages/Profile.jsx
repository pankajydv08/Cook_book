import { motion } from 'framer-motion';
import { Tag } from '../components/ui/Tag';

const stats = [
  { label: 'Recipes created', value: 12 },
  { label: 'Cook mode streak', value: '7 days' },
  { label: 'Saved favorites', value: 34 },
];

const Profile = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="flex flex-wrap gap-6 rounded-[2rem] border border-white/60 bg-white/80 p-8 shadow-book">
        <div className="h-24 w-24 rounded-3xl bg-terracotta text-3xl font-display text-white flex items-center justify-center shadow-book">
          JS
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-olive">Profile</p>
          <h1 className="font-display text-4xl text-espresso">Juniper Sage</h1>
          <p className="text-espresso/70">juniper@hearthbook.com</p>
          <div className="flex gap-2">
            <Tag variant="solid">Earthy home cook</Tag>
            <Tag>Glassware collector</Tag>
          </div>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <motion.div key={stat.label} className="rounded-2xl border border-white/60 bg-parchment/80 p-6 text-center shadow-inner" whileHover={{ y: -4 }}>
            <p className="font-display text-3xl text-espresso">{stat.value}</p>
            <p className="text-xs uppercase tracking-[0.4em] text-espresso/40">{stat.label}</p>
          </motion.div>
        ))}
      </section>
      <section className="rounded-[2rem] border border-white/60 bg-white/70 p-8 shadow-book">
        <p className="text-xs uppercase tracking-[0.4em] text-olive">Activity</p>
        <ul className="mt-4 space-y-3 text-espresso/70">
          <li>• Saved “Smoky Clay Pot Chickpeas” to cookbook</li>
          <li>• Completed cook mode for “Woodfired Herb Focaccia”</li>
          <li>• Added new recipe “Garden Herb Pesto”</li>
        </ul>
      </section>
    </div>
  );
};

export default Profile;

