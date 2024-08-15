import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

export default function page() {
    return (
        <section className="bg-base-100">
            <div className="">
                <h2 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
                    Profile
                </h2>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
                    <blockquote className="rounded-lg bg-base-100 p-4 shadow-sm sm:p-6">
                        <div className="flex items-center gap-4">
                            <Image
                                alt=""
                                src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                                className="size-14 rounded-full object-cover"
                                width={56}
                                height={56}
                            />

                            <div>
                                <div className="flex justify-center gap-0.5 text-green-500">
                                    {/* Repeat start icon five time */}
                                    {/* {Array(5).fill(<Star size={16} />)} */}
                                </div>

                                <p className="mt-0.5 text-lg font-medium text-accent">
                                    John Doe
                                </p>
                            </div>
                        </div>

                        <p className="mt-4 ">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Culpa sit rerum incidunt, a consequuntur
                            recusandae ab saepe illo est quia obcaecati neque
                            quibusdam eius accusamus error officiis atque
                            voluptates magnam!
                        </p>
                    </blockquote>
                </div>
            </div>
        </section>
    );
}
