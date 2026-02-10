import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";
import { Suspense } from "react";
export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-background">
      <div className="flex">
        <Sidebar />

        <div className="flex min-h-dvh flex-1 flex-col">
          <Suspense fallback={null}>
            <Topbar />
          </Suspense>
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
