
import { WeldingGun } from "@/types";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface GunListProps {
  guns: WeldingGun[];
}

export default function GunList({ guns }: GunListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Total Spots</TableHead>
            <TableHead>Last Maintenance</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guns.map((gun) => (
            <TableRow key={gun.id}>
              <TableCell className="font-medium">{gun.name}</TableCell>
              <TableCell>{gun.model}</TableCell>
              <TableCell>{gun.location}</TableCell>
              <TableCell>{gun.totalSpotCount.toLocaleString()}</TableCell>
              <TableCell>{gun.lastMaintenance}</TableCell>
              <TableCell>
                <StatusBadge status={gun.status} />
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                >
                  <Link to={`/guns/${gun.id}`}>
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">View details</span>
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
