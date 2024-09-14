"use client";

import React from "react";
import { getDate } from "../common/utils/get-date";

const redirectToPreview = () => {
  window.location.href = "/hr/preview";
};

export default function page() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex justify-center">
        <div className="grid justify-center max-w-xl px-4">
          <h2 className="text-xl font-bold sm:text-2xl ">Hello 👋 "Name"</h2>
          <p className="mt-4 text-base-content">Semangat Kerja ya!</p>
        </div>
      </div>
      <div className="p-4 bg-slate-50 rounded-xl min-h-max pb-16">
        <div className="relative block overflow-hidden rounded-xl bg-base-100 border-gray-100 p-4 sm:p-6 lg:p-8 shadow-lg">
          <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

          <div className="sm:flex sm:justify-between sm:gap-4">
            <div>
              <h2 className="text-md font-bold">{getDate()}</h2>

              <p className="mt-1 text-xs font-medium text-gray-600">
                Jam kerja Kamu pukul 08:00 - 17:00
              </p>
            </div>
          </div>

          <div className="mt-4">
            <div className="grid grid-cols-2 py-2 gap-1">
              <div className="flex flex-col gap-2 items-center">
                <h2 className="text-lg text-success font-bold py-4">--:--</h2>
                <button
                  className="btn btn-block btn-primary"
                  onClick={redirectToPreview}
                >
                  Masuk
                </button>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <h2 className="text-lg text-error font-bold py-4">--:--</h2>
                <button className="btn btn-block btn-outline btn-primary">
                  Pulang
                </button>
              </div>
            </div>
          </div>

          {/* <dl className="mt-6 flex gap-4 sm:gap-6">
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Published</dt>
            <dd className="text-xs text-gray-500">31st June, 2021</dd>
          </div>

          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Reading time</dt>
            <dd className="text-xs text-gray-500">3 minute</dd>
          </div>
        </dl> */}
        </div>
      </div>
    </div>
  );
}
