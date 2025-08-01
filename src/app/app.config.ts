import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { I18N } from '../config/language-config';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

class I18NLoader implements TranslateLoader {
  getTranslation(lang: 'zh-cn' | 'en-us'): Observable<Object> {
    return of(I18N[lang]);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: I18NLoader
        }
      })
    )
  ]
};
