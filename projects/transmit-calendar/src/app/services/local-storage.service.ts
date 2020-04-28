import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(key: string): string {
    return this.isLocalStorage() ? localStorage.getItem(key) : undefined;
  }

  setItem(key: string, value: string | object): void {
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : value;
    if (this.isLocalStorage()) {
      localStorage.setItem(key, stringValue);
    }
  }

  removeItem(key: string): void {
    if (this.isLocalStorage()) {
      localStorage.removeItem(key);
    }
  }

  collectionGet<T>(key: string): Array<T> {
    if (!this.isLocalStorage()) {
      return undefined;
    }
    try {
      const value = localStorage.getItem(key);
      const collection: Array<T> = JSON.parse(value);
      return collection;
    } catch (ex) {
      throw new Error(`Error reading collection from key ${key}`);
    }
  }

  collectionPush<T>(key: string, value: T) {
    if (!this.isLocalStorage()) {
      return null;
    }
    try {
      const collection = this.collectionGet<T>(key) || [];
      const isExists = collection.filter(c => c === value);
      if (isExists.length > 0) {
        throw new Error('item already exists');
      }
      collection.push(value);
      this.setItem(key, collection);
      return value;
    } catch (ex) {
      throw new Error(`Error ${ex} adding to collection on key ${key}`);
    }
  }

  private isLocalStorage() {
    return typeof window !== 'undefined' && window && typeof window.localStorage !== 'undefined' && localStorage;
  }
}
