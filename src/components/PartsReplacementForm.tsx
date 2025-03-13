
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { PartReplacement, WeldingGun } from "@/types";

const formSchema = z.object({
  partName: z.string().min(1, "Part name is required"),
  partNumber: z.string().min(1, "Part number is required"),
  replacementDate: z.string().min(1, "Replacement date is required"),
  previousLifetime: z.string().min(1, "Previous lifetime is required").refine(
    (val) => !isNaN(Number(val)) && Number(val) >= 0,
    { message: "Previous lifetime must be a non-negative number" }
  ),
  performedBy: z.string().min(1, "Technician name is required"),
  notes: z.string().optional(),
});

interface PartsReplacementFormProps {
  gun: WeldingGun;
  onSubmit?: (data: PartReplacement) => void;
}

export default function PartsReplacementForm({ gun, onSubmit }: PartsReplacementFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      partName: "",
      partNumber: "",
      replacementDate: new Date().toISOString().split("T")[0],
      previousLifetime: "",
      performedBy: "",
      notes: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Create a new part replacement record
    const newRecord: PartReplacement = {
      id: `part-${Date.now()}`,
      gunId: gun.id,
      partName: values.partName,
      partNumber: values.partNumber,
      replacementDate: values.replacementDate,
      previousLifetime: Number(values.previousLifetime),
      performedBy: values.performedBy,
      notes: values.notes,
    };

    // Call the onSubmit callback if provided
    onSubmit?.(newRecord);

    // Show success toast
    toast({
      title: "Part replacement recorded",
      description: `${values.partName} replacement for ${gun.name} has been saved`,
    });

    // Reset form (except date and technician)
    form.reset({
      partName: "",
      partNumber: "",
      replacementDate: values.replacementDate,
      previousLifetime: "",
      performedBy: values.performedBy,
      notes: "",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <FormField
            control={form.control}
            name="partName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Part Name</FormLabel>
                <FormControl>
                  <Input placeholder="E.g., Electrode Caps" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="partNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Part Number</FormLabel>
                <FormControl>
                  <Input placeholder="E.g., EC-ARO-20" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <FormField
            control={form.control}
            name="replacementDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Replacement Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="previousLifetime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Previous Lifetime</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Spots or hours" {...field} />
                </FormControl>
                <FormDescription>
                  Number of spots or hours before replacement
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="performedBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Replaced By</FormLabel>
                <FormControl>
                  <Input placeholder="Technician name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Additional notes about the replacement"
                  className="min-h-20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Record Part Replacement</Button>
      </form>
    </Form>
  );
}
