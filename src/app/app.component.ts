import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {DevUIModule} from 'ng-devui';
import {TranslateModule} from '@ngx-translate/core';
import {LanguageService} from '../services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DevUIModule,
    TranslateModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  currentLang: string;

  constructor(private languageService: LanguageService) {
    this.currentLang = this.languageService.getCurrentLang();

    this.languageService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }
}
