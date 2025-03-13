
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">Welding Gun Maintenance Dashboard</h1>
        <Dashboard />
      </main>
    </div>
  );
};

export default Index;
