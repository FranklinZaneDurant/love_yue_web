import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {DevUIModule} from 'ng-devui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DevUIModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'love-yue-web';
}
