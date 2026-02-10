"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const nav = [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 border-r bg-card md:block">
      <div className="flex h-dvh flex-col">
        <div className="flex items-center gap-2 px-4 py-5">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">Appify Analytics</div>
            <div className="text-xs text-muted-foreground">Dashboard</div>
          </div>
        </div>

        <Separator />

        <nav className="flex-1 p-2">
          <ul className="space-y-1">
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname?.startsWith(item.href + "/");
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
