"use client";

import { useFormStatus } from "react-dom";

export function LoginForm() {
    const { pending, data } = useFormStatus();
    return (
        <div className="grid gap-4 pt-16 w-full">
            <input
                type="text"
                name="username"
                className="input input-bordered "
                placeholder="Enter Username"
                required
            />
            {/* {data.error !== undefined && (
                <span className="text-red-500">{state.error}</span>
            )} */}

            <input
                type="password"
                name="password"
                className="input input-bordered "
                placeholder="Enter Password"
                required
            />
            {/* {state.error !== undefined && (
                <span className="text-red-500">{state.error}</span>
            )} */}
            <button
                type="submit"
                className="btn btn-primary"
                disabled={pending}
            >
                {pending ? "Loading..." : "Login"}
            </button>
            
        </div>
    );
}
