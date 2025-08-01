import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {ThemeServiceInit} from 'ng-devui/theme';
import {deepTheme, infinityTheme, provenceTheme, sweetTheme} from 'ng-devui/theme-collection';

ThemeServiceInit({
  'infinity-theme': infinityTheme,
  'provence-theme': provenceTheme,
  'sweet-theme': sweetTheme,
  'deep-theme': deepTheme
}, 'infinity-theme');

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
