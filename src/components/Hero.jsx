import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Wand2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/9a3r1a2HcB0m0U7j/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-16 sm:pt-28">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-800/40 px-3 py-1 text-xs text-slate-300 backdrop-blur">
            <Wand2 className="h-3.5 w-3.5" />
            Craft stunning UI instantly
          </span>
          <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
            Custom UI Style & Component Generator
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Generate beautiful, production-ready styles and components in seconds. Tune colors, radii, shadows, and typography — then export with one click.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="#generator"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-medium text-slate-900 shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Rocket className="h-5 w-5" />
              Start Generating
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700/70 bg-slate-800/40 px-5 py-3 font-medium text-slate-200 backdrop-blur transition hover:-translate-y-0.5"
            >
              Explore Features
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
