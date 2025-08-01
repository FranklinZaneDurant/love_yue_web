import {Component, HostBinding, Input, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {LayoutConfig} from './layout.type';
import {LayoutService} from './layout.service';
import {LayoutModule} from 'ng-devui';
import {NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  styleUrl: './layout.scss',
  imports: [
    LayoutModule,
    NgIf,
    NgStyle
  ],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnDestroy {

  @HostBinding('class.layout') default = true;

  private destroy$ = new Subject<void>();

  @Input() config: LayoutConfig | undefined;

  getSidebarWidth(): string {
    let width = 0;

    if (this.config?.sidebar.hidden) {
      return width + 'px';
    }

    if (!this.config!.sidebar!.firSidebar!.hidden) {
      width += this.config!.sidebar!.firSidebar!.width!;
    }

    if (!this.config!.sidebar!.secSidebar!.hidden) {
      width += this.config!.sidebar!.secSidebar!.width!;
    }

    return width + 'px';
  }

  getHeaderHeight(): string {
    let height = 0;

    if (this.config!.header!.hidden) {
      return height + 'px';
    }

    if (!this.config!.header!.firHeader!.hidden) {
      height += this.config!.header!.firHeader!.height!;
    }

    if (!this.config!.header!.secHeader!.hidden) {
      height += this.config!.header!.secHeader!.height!;
    }

    return height + 'px';
  }

  constructor(
    private layoutService: LayoutService
  ) {
    this.layoutService
      .getLayoutConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: LayoutConfig) => {
        this.config = config;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

@Component({
  selector: 'layout-header',
  template: '<ng-content></ng-content>',
  standalone: true
})
export class LayoutHeaderComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  @HostBinding('class.layout-header') default = true;
  @HostBinding('style.height')
  get height() {
    return this?.config?.["height"] + 'px';
  }

  @HostBinding('style.z-index')
  get zIndex() {
    return this?.config?.zIndex;
  }

  @HostBinding('style.display')
  get display() {
    return this?.config?.hidden ? 'none' : null;
  }

  @Input() config: LayoutConfig['header'];

  constructor(private layoutService: LayoutService) {
    this.layoutService
      .getLayoutConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: LayoutConfig) => {
        this.config = config!.header!.firHeader;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

@Component({
  selector: 'layout-sec-header',
  template: '<ng-content></ng-content>',
  standalone: true
})
export class LayoutSecHeaderComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  @HostBinding('class.layout-sec-header') default = true;
  @HostBinding('style.height')
  get height() {
    return this?.config?.["height"] + 'px';
  }

  @HostBinding('style.z-index')
  get zIndex() {
    return this?.config?.zIndex;
  }

  @HostBinding('style.display')
  get display() {
    return this?.config?.hidden ? 'none' : null;
  }

  @Input() config: LayoutConfig['header'];

  constructor(private layoutService: LayoutService) {
    this.layoutService
      .getLayoutConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: LayoutConfig) => {
        this.config = config!.header!.secHeader;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

@Component({
  selector: 'layout-sidebar',
  template: '<ng-content></ng-content>',
  standalone: true
})
export class LayoutSidebarComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  @HostBinding('class.layout-sidebar') default = true;
  @HostBinding('style.width')
  get width() {
    return this?.config?.width + 'px';
  }

  @HostBinding('style.z-index')
  get zIndex() {
    return this?.config?.zIndex;
  }

  @HostBinding('style.display')
  get display() {
    return this?.config?.hidden ? 'none' : null;
  }

  @Input() config: LayoutConfig['sidebar']['firSidebar'];

  constructor(private layoutService: LayoutService) {
    this.layoutService
      .getLayoutConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: LayoutConfig) => {
        this.config = config.sidebar.firSidebar;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

@Component({
  selector: 'layout-sec-sidebar',
  template: '<ng-content></ng-content>',
  standalone: true
})
export class LayoutSecSidebarComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  @HostBinding('class.layout-sec-sidebar') default = true;
  @HostBinding('style.width')
  get width() {
    return this?.config?.width + 'px';
  }

  @HostBinding('style.z-index')
  get zIndex() {
    return this?.config?.zIndex;
  }

  @HostBinding('style.display')
  get display() {
    return this?.config?.hidden ? 'none' : null;
  }

  @Input() config: LayoutConfig['sidebar']['secSidebar'];

  constructor(private layoutService: LayoutService) {
    this.layoutService
      .getLayoutConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: LayoutConfig) => {
        this.config = config.sidebar.secSidebar;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

@Component({
  selector: 'layout-footer',
  template: '<ng-content></ng-content>',
  standalone: true
})
export class LayoutFooterComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  @HostBinding('class.layout-footer') default = true;
  @HostBinding('style.width')
  get height() {
    return this?.config?.height + 'px';
  }

  @HostBinding('style.display')
  get display() {
    return this?.config?.hidden ? 'none' : null;
  }

  @Input() config: LayoutConfig['footer'];

  constructor(private layoutService: LayoutService) {
    this.layoutService
      .getLayoutConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: LayoutConfig) => {
        this.config = config.footer;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
