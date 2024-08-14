'use client'

import { School } from "lucide-react";
import React from "react";

const getDate = () => {
    const date = new Date();
    return date.toDateString();
};

const redirectToPreview = () => {
    window.location.href = "/hr/preview";
}

export default function page() {
    return (
        <div className="bg-gray-900 text-white">
            <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="max-w-xl">
                    <h2 className="text-lg font-bold sm:text-2xl">
                        PT. Puninar Yusen Logistics Indonesia
                    </h2>

                    <p className="mt-4 text-gray-300">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Repellat dolores iure fugit totam iste obcaecati.
                    </p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
                    <div className="flex items-start gap-4">
                        <div className="bg-base-100 w-96 shadow-xl rounded-xl">
                            <div className="card-body">
                                <h2 className="card-title">{getDate()}</h2>
                                <div className="grid grid-cols-2 py-6">
                                    <div className="flex flex-col items-center">
                                        <h2 className="text-4xl">--:--</h2>
                                        <p>Check-In</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <h2 className="text-4xl">--:--</h2>
                                        <p>Check-Out</p>
                                    </div>
                                </div>
                                <div className="card-actions justify-end">
                                    <button className="btn bg-violet-600" onClick={redirectToPreview}>
                                        Record Time
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                            <School />
                        </span>

                        <div>
                            <h2 className="text-lg font-bold">
                                Lorem, ipsum dolor.
                            </h2>

                            <p className="mt-1 text-sm text-gray-300">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Error cumque tempore est ab
                                possimus quisquam reiciendis tempora animi!
                                Quaerat, saepe?
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                            <School />
                        </span>

                        <div>
                            <h2 className="text-lg font-bold">
                                Lorem, ipsum dolor.
                            </h2>

                            <p className="mt-1 text-sm text-gray-300">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Error cumque tempore est ab
                                possimus quisquam reiciendis tempora animi!
                                Quaerat, saepe?
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                            <School />
                        </span>

                        <div>
                            <h2 className="text-lg font-bold">
                                Lorem, ipsum dolor.
                            </h2>

                            <p className="mt-1 text-sm text-gray-300">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Error cumque tempore est ab
                                possimus quisquam reiciendis tempora animi!
                                Quaerat, saepe?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
