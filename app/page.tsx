import React from "react";

export default function page() {
    return (
        <section className=" ">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
                        Welcome to NiceDay ✨
                        {/* <span className="sm:block"> Increase Conversion. </span> */}
                    </h1>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                            className="btn btn-primary btn-md w-full sm:w-auto"
                            href="/hr"
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
