
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-56">
              <nav className="flex flex-col gap-4 pt-16">
                <Link
                  to="/"
                  className="text-md font-medium transition-colors hover:text-primary"
                >
                  Dashboard
                </Link>
                <Link
                  to="/guns/gun-001"
                  className="text-md font-medium transition-colors hover:text-primary"
                >
                  Gun Details
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">WeldWatcher</span>
          </Link>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link
            to="/"
            className="text-md font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            to="/guns/gun-001"
            className="text-md font-medium transition-colors hover:text-primary"
          >
            Gun Details
          </Link>
        </nav>
      </div>
    </header>
  );
}
