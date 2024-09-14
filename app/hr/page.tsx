"use client";

import React from "react";
import { getDate } from "../common/utils/get-date";

const redirectToPreview = () => {
  window.location.href = "/hr/preview";
};

export default function page() {
  return (
    <div className="bg-base-100">
      <div className="grid justify-center max-w-xl px-4">
        <h2 className="text-xl font-bold sm:text-2xl ">Hello 👋 "Name"</h2>
        <p className="mt-4 text-base-content">Semangat Kerja ya!</p>
      </div>

      <div className="bg-slate-100 px-6 mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-2 rounded-t-xl py-6 h-dvh">
        <div className="bg-base-100 flex items-start gap-4 border rounded-xl h-fit">
          <div className="w-96">
            <div className="card-body">
              <h2 className="text-md font-bold">{getDate()}</h2>
              <h2 className="text-xs text-gray-400">
                Jam kerja Kamu pukul 08:00 - 17:00
              </h2>
              <div className="grid grid-cols-2 py-6 gap-1">
                <div className="flex flex-col gap-2 items-center">
                  <h2 className="text-lg text-success font-bold">--:--</h2>
                  <button className="btn btn-block btn-sm btn-primary">
                    Masuk
                  </button>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <h2 className="text-lg text-error font-bold">--:--</h2>
                  <button className="btn btn-block btn-sm btn-outline btn-primary">
                    Pulang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
