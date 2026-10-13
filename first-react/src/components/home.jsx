import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/home" className="text-lg font-bold tracking-wide text-emerald-900">FIELDNOTES</Link>
          <Link to="/" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:bg-slate-50">Log out</Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <section className="border-b border-slate-200 pb-12 sm:pb-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-emerald-700">Your workspace</p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">Good to have you here.</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">You are signed in. This is your home base for keeping ideas, plans, and the next steps in one place.</p>
        </section>

        <section className="py-10 sm:py-12" aria-labelledby="plans-heading">
          <h2 id="plans-heading" className="mb-3 text-2xl font-bold">My plans</h2>
          <p className="mb-5 text-slate-600">Write down what you want to get done.</p>
          <label htmlFor="plans" className="sr-only">Your plans</label>
          <textarea
            id="plans"
            name="plans"
            rows="12"
            placeholder="Write your plans here..."
            className="block w-full resize-y rounded-md border border-slate-300 bg-white p-4 leading-relaxed text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
          />
        </section>
      </main>
    </div>
  );
};

export default Home;