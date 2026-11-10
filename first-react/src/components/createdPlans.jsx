import React from "react";
import { Link } from "react-router-dom";
import { getPlans } from "../plans";

const CreatedPlans = () => {
  const plans = getPlans();

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/home" className="text-lg font-bold tracking-wide text-emerald-900">FIELDNOTES</Link>
          <Link to="/" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:bg-slate-50">Log out</Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <section>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-emerald-700">Your workspace</p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Created plans</h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">Your plans will appear here.</p>
          {plans.length > 0 ? (
            <ul className="mt-8 space-y-4">
              {plans.map((plan, index) => (
                <li key={`${index}-${plan}`} className="whitespace-pre-wrap rounded-md border border-slate-200 bg-white p-6 text-slate-700">
                  {plan}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 rounded-md border border-slate-200 bg-white p-6 text-slate-600">
              No plans have been created yet.
            </p>
          )}
          <Link to="/home" className="mt-6 inline-block text-sm font-semibold text-emerald-800 hover:text-emerald-900">
            Back to home
          </Link>
        </section>
      </main>
    </div>
  );
};

export default CreatedPlans;
