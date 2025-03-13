
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { 
  mockWeldingGuns, 
  mockSpotCounts,
  mockMaintenanceRecords,
  mockPartReplacements
} from "@/data/mockData";
import StatusBadge from "@/components/StatusBadge";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SpotCountForm from "@/components/SpotCountForm";
import MaintenanceLogForm from "@/components/MaintenanceLogForm";
import PartsReplacementForm from "@/components/PartsReplacementForm";
import MaintenanceHistory from "@/components/MaintenanceHistory";
import { PartReplacement, SpotCountRecord, MaintenanceRecord, WeldingGun } from "@/types";

const GunDetails = () => {
  const { gunId } = useParams<{ gunId: string }>();
  const navigate = useNavigate();
  const [gun, setGun] = useState<WeldingGun | null>(null);
  const [spotCounts, setSpotCounts] = useState<SpotCountRecord[]>([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([]);
  const [partReplacements, setPartReplacements] = useState<PartReplacement[]>([]);

  // Load gun data based on ID param
  useEffect(() => {
    const foundGun = mockWeldingGuns.find(g => g.id === gunId);
    if (foundGun) {
      setGun(foundGun);
      // Load related data
      setSpotCounts(mockSpotCounts.filter(s => s.gunId === gunId));
      setMaintenanceRecords(mockMaintenanceRecords.filter(m => m.gunId === gunId));
      setPartReplacements(mockPartReplacements.filter(p => p.gunId === gunId));
    }
  }, [gunId]);

  // Handle spot count submission
  const handleSpotCountSubmit = (data: SpotCountRecord) => {
    setSpotCounts(prev => [data, ...prev]);
    // In a real app, you would also update the gun's total spot count
    if (gun) {
      const updatedGun = { ...gun, totalSpotCount: gun.totalSpotCount + data.count };
      setGun(updatedGun);
    }
  };

  // Handle maintenance log submission
  const handleMaintenanceSubmit = (data: MaintenanceRecord) => {
    setMaintenanceRecords(prev => [data, ...prev]);
    // In a real app, you would also update the gun's last maintenance date
    if (gun) {
      const updatedGun = { ...gun, lastMaintenance: data.date };
      setGun(updatedGun);
    }
  };

  // Handle part replacement submission
  const handlePartReplacementSubmit = (data: PartReplacement) => {
    setPartReplacements(prev => [data, ...prev]);
  };

  if (!gun) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold">Welding gun not found</h2>
            <Button 
              variant="link" 
              onClick={() => navigate('/')}
              className="mt-4"
            >
              Return to Dashboard
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => navigate('/')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold">{gun.name}</h1>
            <StatusBadge status={gun.status} className="ml-2" />
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Model</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{gun.model}</p>
                <p className="text-xs text-muted-foreground">Serial: {gun.serialNumber}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Location</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{gun.location}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Spot Count</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{gun.totalSpotCount.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Last maintenance: {gun.lastMaintenance}</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="spotCount" className="space-y-4">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="spotCount">Record Spots</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="parts">Parts Replacement</TabsTrigger>
            </TabsList>
            <TabsContent value="spotCount" className="space-y-4">
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Record Daily Spot Count</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SpotCountForm gun={gun} onSubmit={handleSpotCountSubmit} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Spot Counts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="p-4">
                        <h3 className="text-lg font-medium">Spot Count History</h3>
                      </div>
                      <div className="divide-y">
                        {spotCounts.length === 0 ? (
                          <div className="p-4 text-center text-muted-foreground">
                            No spot count records found
                          </div>
                        ) : (
                          spotCounts.map(record => (
                            <div key={record.id} className="p-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">{record.jobName}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Date: {record.date}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-xl font-bold">{record.count}</p>
                                  <p className="text-xs text-muted-foreground">spots</p>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                Operator: {record.operator}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="maintenance" className="space-y-4">
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Record Maintenance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MaintenanceLogForm gun={gun} onSubmit={handleMaintenanceSubmit} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Maintenance History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MaintenanceHistory records={maintenanceRecords} guns={[gun]} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="parts" className="space-y-4">
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Record Part Replacement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PartsReplacementForm gun={gun} onSubmit={handlePartReplacementSubmit} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Replacement History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="p-4">
                        <h3 className="text-lg font-medium">Part Replacement History</h3>
                      </div>
                      <div className="divide-y">
                        {partReplacements.length === 0 ? (
                          <div className="p-4 text-center text-muted-foreground">
                            No part replacement records found
                          </div>
                        ) : (
                          partReplacements.map(part => (
                            <div key={part.id} className="p-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">{part.partName}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Part #: {part.partNumber}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium">Previous Life</p>
                                  <p className="text-sm text-muted-foreground">
                                    {part.previousLifetime.toLocaleString()} spots
                                  </p>
                                </div>
                              </div>
                              <Separator className="my-2" />
                              <div className="flex justify-between items-center">
                                <p className="text-sm text-muted-foreground">
                                  Replaced by {part.performedBy}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {part.replacementDate}
                                </p>
                              </div>
                              {part.notes && (
                                <p className="text-sm text-muted-foreground mt-2 italic">
                                  Note: {part.notes}
                                </p>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default GunDetails;
