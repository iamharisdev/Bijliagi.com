/**
 * Quote list store: a tiny external store persisted to localStorage,
 * read with useSyncExternalStore so server and client render without mismatch.
 */
export type QuoteLine = { key: string; qty: number };

const STORAGE_KEY = "bijliagi-quote-v1";
const EMPTY: QuoteLine[] = [];
const listeners = new Set<() => void>();
let cache: QuoteLine[] | null = null;

function sanitize(value: unknown): QuoteLine[] {
  if (!Array.isArray(value)) return EMPTY;
  return value
    .filter(
      (l): l is QuoteLine =>
        typeof l === "object" && l !== null && typeof l.key === "string" && Number.isInteger(l.qty),
    )
    .map((l) => ({ key: l.key, qty: Math.min(Math.max(l.qty, 1), 999) }));
}

function read(): QuoteLine[] {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    cache = raw ? sanitize(JSON.parse(raw)) : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(next: QuoteLine[]) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage blocked (private mode etc.): keep in memory only.
  }
  listeners.forEach((l) => l());
}

export const quoteStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        cache = null;
        listener();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  },
  getSnapshot: read,
  getServerSnapshot: () => EMPTY,

  add(key: string, qty = 1) {
    const lines = read();
    const existing = lines.find((l) => l.key === key);
    write(
      existing
        ? lines.map((l) => (l.key === key ? { ...l, qty: Math.min(l.qty + qty, 999) } : l))
        : [...lines, { key, qty }],
    );
  },
  setQty(key: string, qty: number) {
    if (qty < 1) return quoteStore.remove(key);
    write(read().map((l) => (l.key === key ? { ...l, qty: Math.min(qty, 999) } : l)));
  },
  remove(key: string) {
    write(read().filter((l) => l.key !== key));
  },
  clear() {
    write(EMPTY);
  },
};
