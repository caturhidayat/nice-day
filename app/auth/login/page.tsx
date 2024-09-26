"use client";

// import { login } from "@/app/common/action";
import { ActionState } from "@/app/common/interfaces/action-state-type";
import { startTransition, useActionState } from "react";
import { useFormState } from "react-dom";
import login from "./login";

const initialState = {
  error: "",
  success: "",
};

export default function Login() {
  // const [state, formAction, isPending] = useActionState<ActionState, FormData>(
  //   login,
  //   initialState
  // );
  const [state, formAction] = useFormState(login, initialState);

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

          <input
            type="password"
            name="password"
            className="input input-bordered "
            placeholder="Enter Password"
            required
          />
          {state.error !== undefined && (
            <span className="text-error">{state.error}</span>
          )}

          <button className="btn btn-primary btn-block">login</button>
        </div>
      </form>
    </section>
  );
}
