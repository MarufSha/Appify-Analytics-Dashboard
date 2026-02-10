"use client";

import type { DateRangeKey } from "@/types/dashboard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DateRangeSelect({
  value,
  onChange,
}: {
  value: DateRangeKey;
  onChange: (v: DateRangeKey) => void;
}) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as DateRangeKey)}>
      <SelectTrigger className="w-40 cursor-pointer">
        <SelectValue placeholder="Date range" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="7d">Last 7 days</SelectItem>
        <SelectItem value="30d">Last 30 days</SelectItem>
        <SelectItem value="12m">Last 12 months</SelectItem>
      </SelectContent>
    </Select>
  );
}
