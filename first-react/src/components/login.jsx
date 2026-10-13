import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-5 py-12 text-slate-900">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          navigate("/home");
        }}
        className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm sm:p-10"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-700">Welcome back</p>
        <h1 className="mb-2 text-3xl font-bold">Login to your account</h1>
        <p className="mb-8 text-slate-600">Enter your details to continue.</p>
        <label className="mb-2 block text-sm font-medium" htmlFor="username">Username</label>
        <input id="username" name="username" type="text" autoComplete="username" required placeholder="Your username" className="mb-5 w-full rounded-md border border-slate-300 px-3 py-2.5 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" />
        <label className="mb-2 block text-sm font-medium" htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required placeholder="Your password" className="mb-6 w-full rounded-md border border-slate-300 px-3 py-2.5 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" />
        <button type="submit" className="w-full rounded-md bg-emerald-800 px-4 py-3 font-semibold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2">
          Login
        </button>
        <p className="mt-6 text-center text-sm text-slate-600">Don't have an account? <Link to="/signup" className="font-semibold text-emerald-800 underline underline-offset-4">Sign up</Link></p>
      </form>
    </div>
  );
};

export default Login;