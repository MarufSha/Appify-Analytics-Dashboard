"use client";

import type { UserTypeKey } from "@/types/dashboard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserTypeSelect({
  value,
  onChange,
}: {
  value: UserTypeKey;
  onChange: (v: UserTypeKey) => void;
}) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as UserTypeKey)}>
      <SelectTrigger className="w-40 cursor-pointer">
        <SelectValue placeholder="User type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All users</SelectItem>
        <SelectItem value="new">New</SelectItem>
        <SelectItem value="returning">Returning</SelectItem>
      </SelectContent>
    </Select>
  );
}
