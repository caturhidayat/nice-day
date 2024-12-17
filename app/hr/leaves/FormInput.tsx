"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";

interface FormData {
  startDate: string;
  endDate: string;
  reason: string;
  leaveType: string;
  image: FileList;
}

const FormInput: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid space-y-2">
      <div>
        <Label htmlFor="startDate">Start Date:</Label>
        <Input
          type="date"
          {...register("startDate", {
            required: true,
            // valueAsNumber: true,
            // valueAsDate: true,
            setValueAs: (value) => new Date(value).getTime().toString(),
          })}
        />
      </div>
      <div>
        <Label htmlFor="endDate">End Date:</Label>
        <Input
          type="date"
          {...register("endDate", {
            required: true,
            // valueAsNumber: true,
            // valueAsDate: true,
            setValueAs: (value) => new Date(value).getTime().toString(),
          })}
        />
      </div>
      <div>
        <Label htmlFor="reason">Reason:</Label>
        <Input type="text" {...register("reason", { required: true })} />
      </div>
      <div>
        <Label htmlFor="leaveType">Leave Type:</Label>
        <Input type="text" {...register("leaveType", { required: true })} />
      </div>
      <div>
        <Label htmlFor="image">Image:</Label>
        <Input
          type="file"
          accept="image/jpeg"
          {...register("image", { required: true })}
        />
      </div>
      <Button className="w-full" type="submit">Submit</Button>
    </form>
  );
};

export default FormInput;
