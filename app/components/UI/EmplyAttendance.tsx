import Image from "next/image";

export default function EmplyAttendance() {
    return (
        <div className="text-center text-gray-400">
            {/*
    Graphic from https://www.opendoodles.com/
*/}
            <div className="flex items-center justify-center pt-32 w-full bg-white px-4">
                <div className="text-center">
                    <div className="flex justify-center">
                        <Image src="/images/No_data.png" alt="no_data" width={200} height={200} />
                    </div>

                    <h1 className="mt-6 text-3xl font-bold tracking-tight text-orange-600 sm:text-4xl">
                        Uh-oh!
                    </h1>

                    <p className="mt-4 text-neutral-content">
                        No attendance records found
                    </p>
                </div>
            </div>
        </div>
    );
}
