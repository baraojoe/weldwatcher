
import { useState } from "react";
import { 
  Zap, 
  Wrench, 
  AlertCircle, 
  ListChecks,
  Clock,
  Settings
} from "lucide-react";
import { mockWeldingGuns, mockSpotCounts, mockMaintenanceRecords, mockPartReplacements } from "@/data/mockData";
import StatCard from "./StatCard";
import GunList from "./GunList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import MaintenanceHistory from "./MaintenanceHistory";

export default function Dashboard() {
  // Calculate total stats
  const totalGuns = mockWeldingGuns.length;
  const activeGuns = mockWeldingGuns.filter(gun => gun.status === 'active').length;
  const todaySpots = mockSpotCounts
    .filter(record => {
      // In a real app, you'd compare to today's date
      return record.date === '2023-09-22';
    })
    .reduce((sum, record) => sum + record.count, 0);
  
  const pendingMaintenance = mockWeldingGuns.filter(gun => gun.status === 'maintenance').length;
  
  // Get recent maintenance and part replacements
  const recentMaintenance = [...mockMaintenanceRecords].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const recentPartReplacements = [...mockPartReplacements].sort((a, b) => 
    new Date(b.replacementDate).getTime() - new Date(a.replacementDate).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Welding Guns" 
          value={totalGuns} 
          icon={<Settings className="h-4 w-4" />}
          description="Registered in system"
        />
        <StatCard 
          title="Active Guns" 
          value={activeGuns} 
          icon={<Zap className="h-4 w-4" />}
          description="Currently in operation"
          trend="up"
          trendValue="2 from last week"
        />
        <StatCard 
          title="Today's Spot Count" 
          value={todaySpots} 
          icon={<Clock className="h-4 w-4" />}
          description="Total spots welded today"
        />
        <StatCard 
          title="Pending Maintenance" 
          value={pendingMaintenance} 
          icon={<AlertCircle className="h-4 w-4" />}
          description="Guns requiring attention"
          trend={pendingMaintenance > 0 ? "up" : "down"}
          trendValue={pendingMaintenance > 0 ? `${pendingMaintenance} need attention` : "All guns maintained"}
        />
      </div>

      <Tabs defaultValue="guns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="guns">Welding Guns</TabsTrigger>
          <TabsTrigger value="maintenance">Recent Maintenance</TabsTrigger>
          <TabsTrigger value="parts">Part Replacements</TabsTrigger>
        </TabsList>
        <TabsContent value="guns" className="space-y-4">
          <GunList guns={mockWeldingGuns} />
        </TabsContent>
        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <MaintenanceHistory records={recentMaintenance.slice(0, 5)} guns={mockWeldingGuns} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="parts" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-md border">
                <div className="p-4">
                  <h3 className="text-lg font-medium">Recent Part Replacements</h3>
                </div>
                <div className="divide-y">
                  {recentPartReplacements.slice(0, 5).map(part => {
                    const gun = mockWeldingGuns.find(g => g.id === part.gunId);
                    return (
                      <div key={part.id} className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{part.partName}</p>
                          <p className="text-sm text-muted-foreground">
                            {gun?.name} - Part #: {part.partNumber}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Replaced by {part.performedBy} on {part.replacementDate}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">Previous Life</p>
                          <p className="text-sm text-muted-foreground">{part.previousLifetime.toLocaleString()} spots</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
