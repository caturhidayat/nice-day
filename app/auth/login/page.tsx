"use client";

// import { login } from "@/app/common/action";
// import { ActionState } from "@/app/lib/interfaces/action-state-type";
// import { startTransition, useActionState } from "react";
import toast from "react-hot-toast";
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

  if (state.error) {
    toast.custom(
      (t) => (
        (t.duration = 3000),
        (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-red-100 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-red-600">
                    There is an error!
                  </p>
                  <p className="mt-1 text-sm text-red-600">❌ {state.error}</p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Close
              </button>
            </div>
          </div>
        )
      )
    );
  }

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
