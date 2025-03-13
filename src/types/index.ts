
export type CheckpointStatus = 'OK' | 'NG' | 'NV';

export interface WeldingGun {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  location: string;
  totalSpotCount: number;
  lastMaintenance: string;
  status: 'active' | 'maintenance' | 'inactive';
}

export interface SpotCountRecord {
  id: string;
  gunId: string;
  date: string;
  jobName: string;
  count: number;
  operator: string;
}

export interface MaintenanceRecord {
  id: string;
  gunId: string;
  date: string;
  performedBy: string;
  notes: string;
  checkpoints: CheckpointItem[];
}

export interface CheckpointItem {
  id: string;
  name: string;
  status: CheckpointStatus;
  notes?: string;
}

export interface PartReplacement {
  id: string;
  gunId: string;
  partName: string;
  partNumber: string;
  replacementDate: string;
  previousLifetime: number; // in hours or spot count
  performedBy: string;
  notes?: string;
}
