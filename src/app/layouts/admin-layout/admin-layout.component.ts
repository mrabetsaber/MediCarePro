import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  private _router!: Subscription;
  private lastPoppedUrl!: string;
  private yScrollStack: number[] = [];

  constructor(public location: Location, private router: Router) {}

  ngOnInit() {
    const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

    if (isWindows) {
      document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
    }

    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url!;
    });

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url !== this.lastPoppedUrl) {
          const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
          this.yScrollStack.push(scrollY);
        }
      } else if (event instanceof NavigationEnd) {
        if (event.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = '';
          const scrollY = this.yScrollStack.pop();
          if (scrollY !== undefined) {
            window.scrollTo(0, scrollY);
          }
        } else {
          window.scrollTo(0, 0);
        }
      }
    });

    this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const elemMainPanel = document.querySelector('.main-panel') as HTMLElement;
      const elemSidebar = document.querySelector('.sidebar .sidebar-wrapper') as HTMLElement;
      elemMainPanel.scrollTop = 0;
      elemSidebar.scrollTop = 0;
    });

    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemMainPanel = document.querySelector('.main-panel') as HTMLElement;
      const elemSidebar = document.querySelector('.sidebar .sidebar-wrapper') as HTMLElement;
      const psMainPanel = new PerfectScrollbar(elemMainPanel);
      const psSidebar = new PerfectScrollbar(elemSidebar);
    }
  }

  ngOnDestroy() {
    if (this._router) {
      this._router.unsubscribe();
    }
  }

  isMap(path: string) {
    const titlee = this.location.prepareExternalUrl(this.location.path())!;
    return path !== titlee;
  }

  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemMainPanel = document.querySelector('.main-panel') as HTMLElement;
      const ps = new PerfectScrollbar(elemMainPanel);
      ps.update();
    }
  }

  isMac(): boolean {
    return navigator.platform.toUpperCase().includes('MAC') || navigator.platform.toUpperCase().includes('IPAD');
  }
}
