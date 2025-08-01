import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANG, I18N_LANGUAGES } from '../config/language-config';
import { StorageService } from './storage.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLangSubject = new BehaviorSubject<string>(DEFAULT_LANG);
  public currentLang$: Observable<string> = this.currentLangSubject.asObservable();

  constructor(
    private translate: TranslateService,
    private storageService: StorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initLanguage();
  }

  /**
   * 初始化语言设置
   */
  private initLanguage(): void {
    let currentLang = DEFAULT_LANG;

    if (isPlatformBrowser(this.platformId)) {
      currentLang = this.storageService.getItem('lang') ||
                   window.navigator.language.toLowerCase() ||
                   DEFAULT_LANG;
    }

    this.translate.addLangs(I18N_LANGUAGES);
    this.translate.setDefaultLang(DEFAULT_LANG);
    this.setLanguage(currentLang);
  }

  /**
   * 设置当前语言
   * @param lang 语言代码
   */
  public setLanguage(lang: string): void {
    if (I18N_LANGUAGES.includes(lang)) {
      this.translate.use(lang);
      this.currentLangSubject.next(lang);

      if (isPlatformBrowser(this.platformId)) {
        this.storageService.setItem('lang', lang);
      }
    } else {
      this.translate.use(DEFAULT_LANG);
      this.currentLangSubject.next(DEFAULT_LANG);
    }
  }

  /**
   * 获取当前语言
   * @returns 当前语言代码
   */
  public getCurrentLang(): string {
    return this.currentLangSubject.value;
  }

  /**
   * 获取所有支持的语言
   * @returns 支持的语言代码数组
   */
  public getSupportedLanguages(): string[] {
    return I18N_LANGUAGES;
  }
}
