"use client";

import React from "react";
import Link from "next/link";

const getDate = () => {
  const date = new Date();
  return date.toDateString();
};

const redirectToPreview = () => {
  window.location.href = "/hr/attendance/capture";
};

export default function page() {
  return (
    <div className="bg-base-100">
      <div className="max-w-xl">
        <h2 className="text-lg font-bold sm:text-2xl">
          PT. Puninar Yusen Logistics Indonesia
        </h2>

        <p className="mt-4 text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
        <div className="flex items-start gap-4">
          <div>
            <h2 className="text-lg font-bold">{getDate()}</h2>

            <p className="mt-1 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              cumque tempore est ab possimus quisquam reiciendis tempora animi!
              Quaerat, saepe?
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="border-primary border-2 w-96 shadow-xl rounded-xl">
            <div className="card-body">
              {/* <h2 className="card-title">{getDate()}</h2> */}
              <div className="grid grid-cols-2 py-6">
                <div className="flex flex-col items-center">
                  <h2 className="text-lg">--:--</h2>
                  <p>Check-In</p>
                </div>
                <div className="flex flex-col items-center">
                  <h2 className="text-lg">--:--</h2>
                  <p>Check-Out</p>
                </div>
              </div>
              <div className="card-actions justify-end"></div>

              <button className="btn btn-primary" onClick={redirectToPreview}>
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
