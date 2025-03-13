
import { WeldingGun, SpotCountRecord, MaintenanceRecord, PartReplacement } from '../types';

// Mock Welding Guns
export const mockWeldingGuns: WeldingGun[] = [
  {
    id: 'gun-001',
    name: 'Weld Gun A1',
    model: 'ARO XP20',
    serialNumber: 'ARO-2023-1234',
    location: 'Assembly Line 1',
    totalSpotCount: 24560,
    lastMaintenance: '2023-08-15',
    status: 'active'
  },
  {
    id: 'gun-002',
    name: 'Weld Gun B2',
    model: 'OBARA MCG-900',
    serialNumber: 'OB-2022-5678',
    location: 'Assembly Line 2',
    totalSpotCount: 18750,
    lastMaintenance: '2023-09-05',
    status: 'active'
  },
  {
    id: 'gun-003',
    name: 'Weld Gun C3',
    model: 'ARO XP25',
    serialNumber: 'ARO-2023-2468',
    location: 'Assembly Line 1',
    totalSpotCount: 32150,
    lastMaintenance: '2023-07-22',
    status: 'maintenance'
  },
  {
    id: 'gun-004',
    name: 'Weld Gun D4',
    model: 'OBARA MCG-1200',
    serialNumber: 'OB-2022-9012',
    location: 'Assembly Line 3',
    totalSpotCount: 8920,
    lastMaintenance: '2023-09-18',
    status: 'active'
  },
  {
    id: 'gun-005',
    name: 'Weld Gun E5',
    model: 'ARO XP30',
    serialNumber: 'ARO-2022-3690',
    location: 'Assembly Line 2',
    totalSpotCount: 45780,
    lastMaintenance: '2023-06-30',
    status: 'inactive'
  }
];

// Mock Spot Count Records
export const mockSpotCounts: SpotCountRecord[] = [
  {
    id: 'spot-001',
    gunId: 'gun-001',
    date: '2023-09-20',
    jobName: 'Door Panel Assembly',
    count: 580,
    operator: 'John Smith'
  },
  {
    id: 'spot-002',
    gunId: 'gun-001',
    date: '2023-09-21',
    jobName: 'Door Panel Assembly',
    count: 620,
    operator: 'John Smith'
  },
  {
    id: 'spot-003',
    gunId: 'gun-002',
    date: '2023-09-20',
    jobName: 'Roof Panel Welding',
    count: 430,
    operator: 'Maria Rodriguez'
  },
  {
    id: 'spot-004',
    gunId: 'gun-004',
    date: '2023-09-21',
    jobName: 'Side Panel Assembly',
    count: 310,
    operator: 'David Johnson'
  },
  {
    id: 'spot-005',
    gunId: 'gun-001',
    date: '2023-09-22',
    jobName: 'Door Panel Assembly',
    count: 590,
    operator: 'Sarah Lee'
  }
];

// Mock Maintenance Records
export const mockMaintenanceRecords: MaintenanceRecord[] = [
  {
    id: 'maint-001',
    gunId: 'gun-001',
    date: '2023-08-15',
    performedBy: 'Mike Chen',
    notes: 'Regular preventive maintenance',
    checkpoints: [
      { id: 'cp-001', name: 'Electrode Condition', status: 'OK' },
      { id: 'cp-002', name: 'Water Flow', status: 'OK' },
      { id: 'cp-003', name: 'Cable Condition', status: 'OK' },
      { id: 'cp-004', name: 'Pneumatic System', status: 'NG', notes: 'Pressure lower than normal' },
      { id: 'cp-005', name: 'Cooling System', status: 'OK' }
    ]
  },
  {
    id: 'maint-002',
    gunId: 'gun-002',
    date: '2023-09-05',
    performedBy: 'Jessica Brown',
    notes: 'Scheduled maintenance after 15,000 spot welds',
    checkpoints: [
      { id: 'cp-006', name: 'Electrode Condition', status: 'NG', notes: 'Electrodes worn, replaced' },
      { id: 'cp-007', name: 'Water Flow', status: 'OK' },
      { id: 'cp-008', name: 'Cable Condition', status: 'OK' },
      { id: 'cp-009', name: 'Pneumatic System', status: 'OK' },
      { id: 'cp-010', name: 'Cooling System', status: 'NV', notes: 'Access panel jammed' }
    ]
  },
  {
    id: 'maint-003',
    gunId: 'gun-003',
    date: '2023-07-22',
    performedBy: 'Mike Chen',
    notes: 'Preventive maintenance before model change',
    checkpoints: [
      { id: 'cp-011', name: 'Electrode Condition', status: 'OK' },
      { id: 'cp-012', name: 'Water Flow', status: 'OK' },
      { id: 'cp-013', name: 'Cable Condition', status: 'NG', notes: 'Cable insulation damaged, replaced' },
      { id: 'cp-014', name: 'Pneumatic System', status: 'OK' },
      { id: 'cp-015', name: 'Cooling System', status: 'OK' }
    ]
  }
];

// Mock Part Replacements
export const mockPartReplacements: PartReplacement[] = [
  {
    id: 'part-001',
    gunId: 'gun-001',
    partName: 'Electrode Caps',
    partNumber: 'EC-ARO-20',
    replacementDate: '2023-08-15',
    previousLifetime: 12000,
    performedBy: 'Mike Chen',
    notes: 'Replaced due to wear'
  },
  {
    id: 'part-002',
    gunId: 'gun-002',
    partName: 'Electrode Arms',
    partNumber: 'EA-OBA-15',
    replacementDate: '2023-09-05',
    previousLifetime: 15000,
    performedBy: 'Jessica Brown',
    notes: 'Scheduled replacement'
  },
  {
    id: 'part-003',
    gunId: 'gun-003',
    partName: 'Power Cable',
    partNumber: 'PC-ARO-30',
    replacementDate: '2023-07-22',
    previousLifetime: 30000,
    performedBy: 'Mike Chen',
    notes: 'Insulation damage observed'
  },
  {
    id: 'part-004',
    gunId: 'gun-001',
    partName: 'Water Cooling Hose',
    partNumber: 'WCH-A20',
    replacementDate: '2023-06-10',
    previousLifetime: 22000,
    performedBy: 'Jessica Brown',
    notes: 'Preventive replacement'
  }
];
