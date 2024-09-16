"use client";

import { useFormState, useFormStatus } from "react-dom";
import login from "./login";

const initialState = {
  error: "",
};

export default function Login() {
  const [state, formAction] = useFormState(login, initialState);
  const { pending } = useFormStatus();
  return (
    <section className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Welcome to NiceDay ✨
        </h1>

        <p className="mt-4 text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
          nulla eaque error neque ipsa culpa autem, at itaque nostrum!
        </p>
      </div>

      <form action={formAction}>
        <div className="grid gap-4 pt-16 w-full">
          <input
            type="text"
            name="username"
            className="input input-bordered "
            placeholder="Enter Username"
            required
          />
          {state.error !== undefined && (
            <span className="text-red-500">{state.error}</span>
          )}

          <input
            type="password"
            name="password"
            className="input input-bordered "
            placeholder="Enter Password"
            required
          />
          {state.error !== undefined && (
            <span className="text-red-500">{state.error}</span>
          )}
          <button type="submit" className="btn btn-primary" disabled={pending}>
            Login
          </button>
        </div>
      </form>
    </section>
  );
}
