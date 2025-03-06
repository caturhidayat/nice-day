"use client";

// import { login } from "@/app/common/action";
// import { ActionState } from "@/app/lib/interfaces/action-state-type";
// import { startTransition, useActionState } from "react";
import toast from "react-hot-toast";
import { useFormState } from "react-dom";
import login from "./login";
import { useActionState, useEffect, useState } from "react";
import { Eye, EyeOff, LoaderIcon, ShieldX } from "lucide-react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InstallPromptButton from "@/app/install-prompt";

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
  const [state, action, isPending] = useActionState(login, initialState);
  const [seePassword, setSeePassword] = useState(false);

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
    <section className="mx-auto max-w-(--breakpoint-xl) px-4 py-16 sm:px-6 lg:px-8">
      <InstallPromptButton />
      <div className="mx-auto max-w-lg text-center">
        <div className="flex-1">
          <div className="avatar">
            <div className="w-36 rounded">
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
          <h2 className="bg-linear-to-r from-polynesian  to-ceruline bg-clip-text text-transparent ">
            NiceDay ✨
          </h2>
        </div>
        <h1 className="text-xl font-extrabold sm:text-5xl">
          Understand User Flow.
          <strong className="font-extrabold text-rose-700 sm:block">
            {" "}
            Increase Conversion.{" "}
          </strong>
        </h1>
        <p className="mt-4 text-gray-500">Sign in to access your account</p>
      </div>

      <form action={action}>
        <div className="grid gap-4 pt-16 w-full">
          <Input
            type="text"
            name="username"
            // className="input input-bordered "
            placeholder="Enter Username"
            defaultValue={state.inputs?.username}
          />
          {state.errors?.username && (
            <span id="username-error" className="text-red-500 text-xs">
              {state.errors?.username[0]}
            </span>
          )}

          <div className="flex w-full gap-2">
            <Input
              type={seePassword ? "text" : "password"}
              name="password"
              // className="input input-bordered "
              placeholder="Enter Password"
            />
            <Button
              type="button"
              variant={"ghost"}
              onClick={() => setSeePassword(!seePassword)}
            >
              {seePassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>

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

          <Button className="bg-sky-700 hover:bg-sky-800 " disabled={isPending}>
            {isPending ? (
              <>
                <LoaderIcon className="h-4 w-4 animate-spin" />
                Signing In
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
      </form>
    </section>
  );
}
