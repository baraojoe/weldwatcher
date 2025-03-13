
import { MaintenanceRecord, WeldingGun } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import StatusBadge from "./StatusBadge";

interface MaintenanceHistoryProps {
  records: MaintenanceRecord[];
  guns: WeldingGun[];
}

export default function MaintenanceHistory({ records, guns }: MaintenanceHistoryProps) {
  return (
    <div className="rounded-md border">
      <div className="p-4">
        <h3 className="text-lg font-medium">Maintenance History</h3>
      </div>
      <div className="divide-y">
        {records.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No maintenance records found
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {records.map((record, index) => {
              const gun = guns.find(g => g.id === record.gunId);
              return (
                <AccordionItem key={record.id} value={`item-${index}`}>
                  <AccordionTrigger className="px-4">
                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{gun?.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {record.date}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        By {record.performedBy}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Notes</h4>
                        <p className="text-sm text-muted-foreground">{record.notes}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Checkpoints</h4>
                        <div className="space-y-2">
                          {record.checkpoints.map(checkpoint => (
                            <div key={checkpoint.id} className="flex items-center justify-between">
                              <span className="text-sm">{checkpoint.name}</span>
                              <div className="flex items-center gap-2">
                                <StatusBadge status={checkpoint.status} />
                                {checkpoint.notes && (
                                  <span className="text-xs italic text-muted-foreground">
                                    {checkpoint.notes}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </div>
    </div>
  );
}
