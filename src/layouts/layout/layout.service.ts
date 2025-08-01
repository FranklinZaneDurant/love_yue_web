import {Injectable} from '@angular/core';
import {LayoutConfig} from './layout.type';
import {DEFAULT_LAYOUT_CONFIG} from './default-layout.confg';
import {ReplaySubject} from 'rxjs';
import {StorageService} from '../../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private readonly _config: LayoutConfig = DEFAULT_LAYOUT_CONFIG;
  private layoutSubject = new ReplaySubject<LayoutConfig>();

  constructor(
    private storageService: StorageService
  ) {
    const layoutConfig = storageService.getItem('layout');
    if (layoutConfig) {
      this._config = JSON.parse(layoutConfig);
    }
    this.layoutSubject.next(this._config);
  }

  getLayoutConfig() {
    return this.layoutSubject.asObservable();
  }

  updateLayoutConfig(config: LayoutConfig) {
    this.storageService.setItem('layout', JSON.stringify(config));
    this.layoutSubject.next(config);
  }
}
