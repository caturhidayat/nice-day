import OvertimeCard from "@/app/components/UI/OvertimeCard";

export default async function Page() {
  return (
    <div className="grid gap-4 p-4">
      <h1 className="py-4 font-semibold text-xl">List of Overtime</h1>
      <div>
        <OvertimeCard />
      </div>
    </div>
  );
}
