export function toCsv<T extends Record<string, unknown>>(
  rows: T[],
  columns?: { key: keyof T; header: string }[],
) {
  if (rows.length === 0) return "";

  const cols =
    columns ??
    (Object.keys(rows[0]).map((k) => ({ key: k as keyof T, header: k })) as {
      key: keyof T;
      header: string;
    }[]);

  const escape = (v: unknown) => {
    const s = String(v ?? "");
    const needsQuotes = /[",\n]/.test(s);
    const escaped = s.replace(/"/g, '""');
    return needsQuotes ? `"${escaped}"` : escaped;
  };

  const header = cols.map((c) => escape(c.header)).join(",");
  const lines = rows.map((r) => cols.map((c) => escape(r[c.key])).join(","));

  return [header, ...lines].join("\n");
}

export function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}
