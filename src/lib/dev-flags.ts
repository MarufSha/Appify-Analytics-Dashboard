export function getDevFlag(name: string): string | null {
  if (typeof window === "undefined") return null;

  const sp = new URLSearchParams(window.location.search);
  const q = sp.get(name);
  if (q !== null) return q;

  return window.localStorage.getItem(`dev:${name}`);
}

export function setDevFlag(name: string, value: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(`dev:${name}`, value);
}

export function clearDevFlag(name: string) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(`dev:${name}`);
}
