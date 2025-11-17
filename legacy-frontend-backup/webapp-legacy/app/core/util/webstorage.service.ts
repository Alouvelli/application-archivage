import { Injectable } from '@angular/core';

abstract class BaseWebStorageService {
  protected abstract readonly storage: Storage | null;

  store(key: string, value: unknown): void {
    const target = this.storage;
    if (!target) {
      return;
    }
    try {
      const payload = typeof value === 'string' ? value : JSON.stringify(value);
      target.setItem(key, payload);
    } catch (error) {
      console.warn(`Unable to write ${key} to storage`, error);
    }
  }

  retrieve<T = unknown>(key: string): T | null {
    const target = this.storage;
    if (!target) {
      return null;
    }
    const raw = target.getItem(key);
    if (raw === null) {
      return null;
    }
    try {
      return (JSON.parse(raw) as T) ?? null;
    } catch {
      return raw as unknown as T;
    }
  }

  clear(key?: string): void {
    const target = this.storage;
    if (!target) {
      return;
    }
    try {
      if (key) {
        target.removeItem(key);
      } else {
        target.clear();
      }
    } catch (error) {
      console.warn(`Unable to clear ${key ?? 'storage'}`, error);
    }
  }
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService extends BaseWebStorageService {
  protected get storage(): Storage | null {
    return typeof window !== 'undefined' ? window.localStorage : null;
  }
}

@Injectable({ providedIn: 'root' })
export class SessionStorageService extends BaseWebStorageService {
  protected get storage(): Storage | null {
    return typeof window !== 'undefined' ? window.sessionStorage : null;
  }
}
