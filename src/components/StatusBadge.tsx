
import { CheckpointStatus } from "@/types";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: CheckpointStatus | 'active' | 'maintenance' | 'inactive';
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'OK':
      case 'active':
        return "bg-weldapp-green text-white";
      case 'NG':
      case 'maintenance':
        return "bg-weldapp-red text-white";
      case 'NV':
        return "bg-weldapp-yellow text-white";
      case 'inactive':
        return "bg-gray-400 text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const getStatusText = () => {
    return status;
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      getStatusStyles(),
      className
    )}>
      {getStatusText()}
    </span>
  );
}
