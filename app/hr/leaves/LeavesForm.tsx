"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { API_URL } from "@/app/lib/constants/api";
import { createLeaves } from "./actions";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageUplaod from "./ImageUplaod";

interface IFormData {
  startDate: string;
  endDate: string;
  reason: string;
  leaveType: string;
  image: FileList;
}

const FormSchema = z.object({
  startDate: z.string({
    required_error: "Start date is required",
  }),
  endDate: z.string({
    required_error: "End date is required",
  }),
  reason: z
    .string({
      required_error: "Reason is required",
    })
    .min(8, {
      message: "Reason must be at least 8 characters.",
    }),
  leaveType: z.string({
    required_error: "Leave type is required",
  }),
  image: z.any(),
});

export function InputForm() {
  const router = useRouter();
  const handleImageUpload = (file: File) => {
    console.log("File Uplaod", file);
  };

  const form = useForm<IFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      reason: "",
      // startDate: new Date(),
      // endDate: new Date(),
      leaveType: "",
      // image: undefined,
    },
  });

  async function onSubmit(data: IFormData) {
    console.log(data);
    const formData = new FormData();
    formData.append("startDate", data?.startDate);
    formData.append("endDate", data?.endDate);
    formData.append("reason", data.reason);
    formData.append("leaveType", data.leaveType);
    formData.append("image", data.image[0]);

    console.log("image : ", formData.get("image"));

    // console.log("Form Data RAW : ", JSON.stringify(Object.fromEntries(formData)));

    const res = await createLeaves(formData);

    if (res.error) {
      return { error: res.error, success: "" };
    } else {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">Success!</p>
                <p className="mt-1 text-sm text-gray-500">
                  ✅ Leave has been created successfully
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));

      router.push("/hr/leaves");
    }

    console.log("res", res);
  }

  return (
    <Form {...form}>
      <form
        className="space-y-2"
        onSubmit={form.handleSubmit(onSubmit)}
        // action={async (formData) => {
        //   console.log("form data raw: ", formData);
        //   const res = await createLeaves(formData);

        //   if (res.error) {
        //     return { error: res.error, success: "" };
        //   }
        //   return res.data;

        // }}
      >
        {/* <FormField
          control={form.control}
          name="leaveType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leave Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Leave Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {LeaveType.map((leaveType) => (
                      <SelectItem key={leaveType} value={leaveType}>
                        {field.value === leaveType ? (
                          <strong>{leaveType}</strong>
                        ) : (
                          leaveType
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="grid">Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        "flex-grow"
                      )}
                    >
                      {field.value ? (
                        format(
                          new Date(parseInt(field.value as string)),
                          "dd MMM yyyy"
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Calendar
                    mode="single"
                    selected={
                      field.value
                        ? new Date(parseInt(field.value as string))
                        : undefined
                    }
                    onSelect={(date) =>
                      field.onChange(date?.getTime().toString())
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="grid">End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        "flex-grow"
                      )}
                    >
                      {field.value ? (
                        format(
                          new Date(parseInt(field.value as string)),
                          "dd MMM yyyy"
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      field.value
                        ? new Date(parseInt(field.value as string))
                        : undefined
                    }
                    onSelect={(date) =>
                      field.onChange(date?.getTime().toString())
                    }
                    // disabled={(date) => (startDate ? date < startDate : false)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Textarea placeholder="Please enter your reason" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  // value={value?.name}
                  onChange={(e) => {
                    const file = e.target.files;
                    onChange(file);
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <ImageUplaod onUpload={handleImageUpload} /> */}

        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
