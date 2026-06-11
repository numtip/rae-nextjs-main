/**
 * Simple in-memory cache with TTL support.
 */

interface CacheEntry<T> {
  data: T;
  expiry: number;
}

export class DataCache {
  private store = new Map<string, CacheEntry<unknown>>();

  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiry) {
      this.store.delete(key);
      return null;
    }
    return entry.data as T;
  }

  set<T>(key: string, data: T, ttlMs: number): void {
    this.store.set(key, { data, expiry: Date.now() + ttlMs });
  }

  invalidate(pattern: string): void {
    const keys = Array.from(this.store.keys());
    for (const key of keys) {
      if (key.startsWith(pattern)) {
        this.store.delete(key);
      }
    }
  }

  clear(): void {
    this.store.clear();
  }
}

/** Singleton instance. */
export const dataCache = new DataCache();
