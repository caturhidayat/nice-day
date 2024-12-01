import { InputForm } from "./LeavesForm";

export default function Leaves() {
  return (
    <div className="grid gap-4 m-auto p-4">
      <div className="text-2xl font-bold">Leave Request Form</div>
      {/* <div className="grid"> */}
        <InputForm />
      {/* </div> */}
    </div>
  );
}
