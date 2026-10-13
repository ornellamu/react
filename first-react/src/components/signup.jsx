import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-5 py-12 text-slate-900">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          navigate("/");
        }}
        className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm sm:p-10"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-700">Get started</p>
        <h1 className="mb-2 text-3xl font-bold">Create your account</h1>
        <p className="mb-8 text-slate-600">Enter your details to sign up.</p>
        <label className="mb-2 block text-sm font-medium" htmlFor="full-name">Full name</label>
        <input id="full-name" name="name" type="text" autoComplete="name" required placeholder="Your full name" className="mb-5 w-full rounded-md border border-slate-300 px-3 py-2.5 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" />
        <label className="mb-2 block text-sm font-medium" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" className="mb-5 w-full rounded-md border border-slate-300 px-3 py-2.5 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" />
        <label className="mb-2 block text-sm font-medium" htmlFor="username">Username</label>
        <input id="username" name="username" type="text" autoComplete="username" required placeholder="Choose a username" className="mb-5 w-full rounded-md border border-slate-300 px-3 py-2.5 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" />
        <label className="mb-2 block text-sm font-medium" htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="new-password" required placeholder="Create a password" className="mb-6 w-full rounded-md border border-slate-300 px-3 py-2.5 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" />
        <button type="submit" className="w-full rounded-md bg-emerald-800 px-4 py-3 font-semibold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2">
          Sign Up
        </button>
        <p className="mt-6 text-center text-sm text-slate-600">Already have an account? <Link to="/" className="font-semibold text-emerald-800 underline underline-offset-4">Login here</Link></p>
      </form>
    </div>
  );
};

export default Signup;