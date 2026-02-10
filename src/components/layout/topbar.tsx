"use client";

import { Menu, Search, User } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/layout/sidebar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import dynamic from "next/dynamic";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUiStore } from "@/store/ui-store";
import type { RoleKey } from "@/types/dashboard";
const ThemeToggle = dynamic(() => import("@/components/common/theme-toggle"), {
  ssr: false,
});

export default function Topbar() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const role = useUiStore((s) => s.role);
  const setRole = useUiStore((s) => s.setRole);

  useEffect(() => {
    const q = sp.get("role");
    if (q === "admin" || q === "manager") {
      setRole(q as RoleKey);
    }
  }, [sp, setRole]);

  function onRoleChange(v: string) {
    const next = v as RoleKey;
    setRole(next);

    const params = new URLSearchParams(sp.toString());
    params.set("role", next);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-3 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <Sidebar mode="mobile" />
          </SheetContent>
        </Sheet>

        <div className="flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search (bonus feature later)"
              className="pl-9"
              disabled
            />
          </div>
        </div>

        <div className="hidden md:block">
          <Select value={role} onValueChange={onRoleChange}>
            <SelectTrigger className="w-[150px] cursor-pointer">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin" className="cursor-pointer">
                Admin
              </SelectItem>
              <SelectItem value="manager" className="cursor-pointer">
                Manager
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 cursor-pointer">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-xs">U</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm md:inline">User</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="gap-2" disabled>
              <User className="h-4 w-4" />
              Profile
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
