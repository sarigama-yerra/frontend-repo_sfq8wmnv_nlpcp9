import React from 'react';
import { Palette, Sparkles, Layout, Copy } from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: 'Theme Designer',
    desc: 'Set brand colors, gradients, radii, and typography with live preview.'
  },
  {
    icon: Sparkles,
    title: 'Smart Tokens',
    desc: 'Autogenerates semantic color tokens and a11y-friendly variants.'
  },
  {
    icon: Layout,
    title: 'Component Kits',
    desc: 'Instantly craft cards, navbars, buttons, inputs, and more.'
  },
  {
    icon: Copy,
    title: 'One-click Export',
    desc: 'Copy Tailwind config, CSS variables, and React snippets.'
  }
];

export default function FeatureGrid() {
  return (
    <section id="features" className="relative bg-slate-950 py-16 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-semibold sm:text-4xl">Everything you need to ship styled UIs</h2>
        <p className="mt-3 text-center text-slate-300">Designed for designers and developers to move fast with confidence.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition hover:-translate-y-1 hover:border-slate-700">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/30">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-slate-300">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
