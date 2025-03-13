
import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { MaintenanceRecord, WeldingGun, CheckpointStatus } from "@/types";
import { Label } from "@/components/ui/label";

// Predefined checkpoints
const DEFAULT_CHECKPOINTS = [
  { id: "cp-1", name: "Electrode Condition" },
  { id: "cp-2", name: "Water Flow" },
  { id: "cp-3", name: "Cable Condition" },
  { id: "cp-4", name: "Pneumatic System" },
  { id: "cp-5", name: "Cooling System" },
  { id: "cp-6", name: "Controller Function" },
  { id: "cp-7", name: "Arm Alignment" },
];

const formSchema = z.object({
  date: z.string().min(1, "Date is required"),
  performedBy: z.string().min(1, "Technician name is required"),
  notes: z.string().optional(),
  checkpoints: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      status: z.enum(["OK", "NG", "NV"] as const),
      notes: z.string().optional(),
    })
  ),
});

interface MaintenanceLogFormProps {
  gun: WeldingGun;
  onSubmit?: (data: MaintenanceRecord) => void;
}

export default function MaintenanceLogForm({ gun, onSubmit }: MaintenanceLogFormProps) {
  const [checkpointNotes, setCheckpointNotes] = useState<Record<string, string>>({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      performedBy: "",
      notes: "",
      checkpoints: DEFAULT_CHECKPOINTS.map(cp => ({
        ...cp,
        status: "OK" as CheckpointStatus,
      })),
    },
  });

  const handleCheckpointNoteChange = (id: string, note: string) => {
    setCheckpointNotes(prev => ({
      ...prev,
      [id]: note,
    }));
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Update checkpoint notes from state
    const checkpointsWithNotes = values.checkpoints.map(cp => ({
      ...cp,
      notes: cp.status !== "OK" ? checkpointNotes[cp.id] || undefined : undefined,
    }));

    // Create a new maintenance record
    const newRecord: MaintenanceRecord = {
      id: `maint-${Date.now()}`,
      gunId: gun.id,
      date: values.date,
      performedBy: values.performedBy,
      notes: values.notes || "",
      checkpoints: checkpointsWithNotes,
    };

    // Call the onSubmit callback if provided
    onSubmit?.(newRecord);

    // Show success toast
    toast({
      title: "Maintenance recorded",
      description: `Maintenance log for ${gun.name} has been saved`,
    });

    // Reset form (except date and technician)
    form.reset({
      ...values,
      notes: "",
      checkpoints: DEFAULT_CHECKPOINTS.map(cp => ({
        ...cp,
        status: "OK" as CheckpointStatus,
      })),
    });
    setCheckpointNotes({});
  };

  const watchCheckpoints = form.watch("checkpoints");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
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
            name="performedBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technician</FormLabel>
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
              <FormLabel>General Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter general maintenance notes here"
                  className="min-h-24"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Checkpoints</h3>
          <div className="border rounded-md p-4 space-y-6">
            {watchCheckpoints.map((checkpoint, index) => (
              <div key={checkpoint.id} className="space-y-2 pb-4 border-b last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{checkpoint.name}</h4>
                  <FormField
                    control={form.control}
                    name={`checkpoints.${index}.status`}
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-2"
                          >
                            <div className="flex items-center space-x-1">
                              <RadioGroupItem
                                value="OK"
                                id={`${checkpoint.id}-ok`}
                              />
                              <Label
                                htmlFor={`${checkpoint.id}-ok`}
                                className="text-sm font-normal"
                              >
                                OK
                              </Label>
                            </div>
                            <div className="flex items-center space-x-1">
                              <RadioGroupItem
                                value="NG"
                                id={`${checkpoint.id}-ng`}
                              />
                              <Label
                                htmlFor={`${checkpoint.id}-ng`}
                                className="text-sm font-normal"
                              >
                                NG
                              </Label>
                            </div>
                            <div className="flex items-center space-x-1">
                              <RadioGroupItem
                                value="NV"
                                id={`${checkpoint.id}-nv`}
                              />
                              <Label
                                htmlFor={`${checkpoint.id}-nv`}
                                className="text-sm font-normal"
                              >
                                NV
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {watchCheckpoints[index].status !== "OK" && (
                  <div className="ml-6">
                    <Label htmlFor={`note-${checkpoint.id}`} className="text-sm">
                      Note
                    </Label>
                    <Textarea
                      id={`note-${checkpoint.id}`}
                      placeholder={`Notes about ${checkpoint.name}`}
                      className="mt-1 h-16 text-sm"
                      value={checkpointNotes[checkpoint.id] || ""}
                      onChange={(e) =>
                        handleCheckpointNoteChange(checkpoint.id, e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full">Record Maintenance</Button>
      </form>
    </Form>
  );
}
