"use client";

// import { login } from "@/app/common/action";
// import { ActionState } from "@/app/lib/interfaces/action-state-type";
// import { startTransition, useActionState } from "react";
import toast from "react-hot-toast";
import { useFormState } from "react-dom";
import login from "./login";
import { useActionState, useEffect } from "react";
import { LoaderIcon, ShieldX } from "lucide-react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";

const initialState = {
  success: false,
  message: "",
  inputs: {
    username: "",
    password: "",
  },
};
export default function Login() {
  const router = useRouter();
  // const [state, formAction, isPending] = useActionState<ActionState, FormData>(
  //   login,
  //   initialState
  // );
  const [state, action, isPending] = useActionState(login, initialState);

  // Check if login is successful and redirect to dashboard
  useEffect(() => {
    if (state.success) {
      toast.success(state.message, {
        duration: 5000,
      });
      router.push("/hr");
    } else if (state.errors) {
      toast.error(state.message, {
        duration: 5000,
      });
    }
  }, [state.success, state.message, router, state.errors]);

  return (
    <section className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <div className="flex-1">
          <div className="avatar">
            <div className="w-32 rounded">
              <Image
                src="/images/Logo.png"
                alt="Avatar Tailwind CSS Component"
                width={512}
                height={512}
              />
            </div>
          </div>
        </div>
        <div className="text-2xl font-bold sm:text-3xl flex justify-center">
          <h2 className="mr-2">Welcome to</h2>
          <h2 className="bg-gradient-to-r from-polynesian  to-ceruline bg-clip-text text-transparent ">
            NiceDay ✨
          </h2>
        </div>

        <p className="mt-4 text-gray-500">Sign in to access your account</p>
      </div>

      <form action={action}>
        <div className="grid gap-4 pt-16 w-full">
          <input
            type="text"
            name="username"
            className="input input-bordered "
            placeholder="Enter Username"
            defaultValue={state.inputs?.username}
          />
          {state.errors?.username && (
            <span id="username-error" className="text-red-500 text-xs">
              {state.errors?.username[0]}
            </span>
          )}

          <input
            type="password"
            name="password"
            className="input input-bordered "
            placeholder="Enter Password"
          />
          {state.errors?.password && (
            <span id="password-error" className="text-red-500 text-xs">
              {state.errors?.password[0]}
            </span>
          )}
          {state.errors && (
            <Alert variant={"destructive"} className="mt-4">
              <ShieldX className="h-4 w-4" />
              <AlertTitle>Unauthorized!</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          <button className="btn btn-primary btn-block" disabled={isPending}>
            {isPending ? (
              <>
                <LoaderIcon className="h-4 w-4 animate-spin" />
                Signing In
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
