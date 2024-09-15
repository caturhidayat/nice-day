import React from "react";

export default function page() {
  return (
    <section className="mx-auto max-w-screen-xl px-6 justify-center lg:flex  lg:items-center">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
        <div className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
          <div className="mt-2">
            <dl>
              <div>
                <dt className="sr-only">Name</dt>

                <dd className="font-medium">Catur Hidayat</dd>
              </div>
              <div className="grid grid-cols-1 py-2 gap-2">
                <div className="">Date:</div>
                <div className="grid grid-cols-2">
                  <div className="items-center">Start Time</div>
                  <div className="items-center">End Time</div>
                </div>
                <div className="">Remark</div>
              </div>
            </dl>
          </div>
        </div>
        <div className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
          <div className="mt-2">
            <dl>
              <div>
                <dt className="sr-only">Name</dt>

                <dd className="font-medium">Catur Hidayat</dd>
              </div>
              <div className="grid grid-cols-1 py-2 gap-2">
                <div className="">Date:</div>
                <div className="grid grid-cols-2">
                  <div className="items-center">Start Time</div>
                  <div className="items-center">End Time</div>
                </div>
                <div className="">Remark</div>
              </div>
            </dl>
          </div>
        </div>
        <div className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
          <div className="mt-2">
            <dl>
              <div>
                <dt className="sr-only">Name</dt>

                <dd className="font-medium">Catur Hidayat</dd>
              </div>
              <div className="grid grid-cols-1 py-2 gap-2">
                <div className="">Date:</div>
                <div className="grid grid-cols-2">
                  <div className="items-center">Start Time</div>
                  <div className="items-center">End Time</div>
                </div>
                <div className="">Remark</div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
