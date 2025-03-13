
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { SpotCountRecord, WeldingGun } from "@/types";

const formSchema = z.object({
  date: z.string().min(1, "Date is required"),
  jobName: z.string().min(1, "Job name is required"),
  count: z.string().min(1, "Spot count is required").refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    { message: "Spot count must be a positive number" }
  ),
  operator: z.string().min(1, "Operator name is required"),
});

interface SpotCountFormProps {
  gun: WeldingGun;
  onSubmit?: (data: SpotCountRecord) => void;
}

export default function SpotCountForm({ gun, onSubmit }: SpotCountFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      jobName: "",
      count: "",
      operator: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Create a new spot count record
    const newRecord: SpotCountRecord = {
      id: `spot-${Date.now()}`,
      gunId: gun.id,
      date: values.date,
      jobName: values.jobName,
      count: Number(values.count),
      operator: values.operator,
    };

    // Call the onSubmit callback if provided
    onSubmit?.(newRecord);

    // Show success toast
    toast({
      title: "Spot count recorded",
      description: `Recorded ${values.count} spots for ${gun.name}`,
    });

    // Reset form
    form.reset({
      date: new Date().toISOString().split("T")[0],
      jobName: "",
      count: "",
      operator: values.operator,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jobName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Name</FormLabel>
              <FormControl>
                <Input placeholder="E.g., Door Panel Assembly" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Spot Count</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Number of spots welded" {...field} />
              </FormControl>
              <FormDescription>
                Enter the total number of spots welded for this job
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="operator"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Operator</FormLabel>
              <FormControl>
                <Input placeholder="Operator name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Record Spot Count</Button>
      </form>
    </Form>
  );
}
