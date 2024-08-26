import { AtSign, KeyRound } from "lucide-react";
import React from "react";

export default function LoginPage() {
    return (
        <section className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">
                    Welcome to NiceDay ✨
                </h1>

                <p className="mt-4 text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                    libero nulla eaque error neque ipsa culpa autem, at itaque
                    nostrum!
                </p>
            </div>

            <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                <div>
                    <label htmlFor="email" className="sr-only">
                        Email
                    </label>

                    <div className="relative">
                        <input
                            type="email"
                            className="input input-bordered w-full max-w-xs"
                            placeholder="Enter Username"
                        />

                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                            <AtSign className="size-4 text-gray-400" />
                        </span>
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>

                    <div className="relative">
                        <input
                            type="password"
                            className="input input-bordered w-full max-w-xs"
                            placeholder="Enter password"
                        />

                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                            <KeyRound className="size-4 text-gray-400" />
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </section>
    );
}
