import React from 'react';
import { Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-8 text-slate-300">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm">© {new Date().getFullYear()} UIsc Forge — Build beautiful UIs faster.</p>
        <div className="flex items-center gap-3">
          <a href="#" className="inline-flex items-center gap-2 rounded-md border border-slate-800 px-3 py-1.5 text-sm hover:border-slate-700">
            <Github className="h-4 w-4" /> GitHub
          </a>
          <a href="#" className="inline-flex items-center gap-2 rounded-md border border-slate-800 px-3 py-1.5 text-sm hover:border-slate-700">
            <Twitter className="h-4 w-4" /> Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
