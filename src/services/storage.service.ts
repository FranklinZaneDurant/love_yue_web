import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * 获取本地存储中的值
   * @param key 存储键名
   * @param defaultValue 默认值（当键不存在时返回）
   * @returns 存储的值或默认值
   */
  getItem(key: string, defaultValue: any = null): any {
    if (isPlatformBrowser(this.platformId)) {
      const item = localStorage.getItem(key);
      return item !== null ? item : defaultValue;
    }
    return defaultValue;
  }

  /**
   * 设置本地存储的值
   * @param key 存储键名
   * @param value 要存储的值
   */
  setItem(key: string, value: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  /**
   * 移除本地存储中的键值对
   * @param key 要移除的键名
   */
  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  /**
   * 清空所有本地存储
   */
  clear(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }
}