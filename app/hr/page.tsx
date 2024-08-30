"use client";

import React from "react";

const getDate = () => {
    const date = new Date();
    return date.toDateString();
};

const redirectToPreview = () => {
    window.location.href = "/hr/preview";
};

export default function page() {
    return (
        <div className="bg-base-100">
            <div className="max-w-xl">
                <h2 className="text-lg font-bold sm:text-2xl">
                    PT. Puninar Yusen Logistics Indonesia
                </h2>

                <p className="mt-4 text-base-content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-2">
                <div className="flex items-start gap-4">
                    <div>
                        <h2 className="text-lg font-bold">{getDate()}</h2>

                        <p className="mt-1 text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="border-primary border-2 w-96 shadow-xl rounded-xl">
                        <div className="card-body">
                            <div className="grid grid-cols-2 py-6 border border-secondary border-dashed rounded-lg">
                                <div className="flex flex-col gap-2 items-center">
                                    <h2 className="text-lg text-success font-bold">--:--</h2>
                                    <p>Start Time</p>
                                </div>
                                <div className="flex flex-col gap-2 items-center">
                                    <h2 className="text-lg text-error font-bold">--:--</h2>
                                    <p>End Time</p>
                                </div>
                            </div>
                            <div className="card-actions justify-end"></div>

                            <button
                                className="btn btn-primary"
                                onClick={redirectToPreview}
                            >
                                {/* <Link href="/hr/preview">Preview</Link> */}
                                Record Attendance
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
