// angular import
import { Component, HostListener, output } from '@angular/core';

// project import

import { NavLeftComponent } from './nav-left/nav-left.component';
import { NavRightComponent } from './nav-right/nav-right.component';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [SharedModule, NavLeftComponent, NavRightComponent],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  // public props
  readonly NavCollapse = output();
  readonly NavCollapsedMob = output<void>();

  navCollapsed:any;
  windowWidth: number;
  navCollapsedMob;

  // Constructor
  constructor() {
    this.windowWidth = window.innerWidth;
    this.navCollapsedMob = false;
  }

  // public method
  navCollapse() {
    if (this.windowWidth >= 1025) {
      this.navCollapsed = !this.navCollapsed;
      this.NavCollapse.emit();
    }
  }

  @HostListener('window:resize', ['$event'])
  // eslint-disable-next-line
  onResize(event: any): void {
    this.windowWidth = event.target.innerWidth;
    this.navCollapseMob();
  }

  navCollapseMob(): void {
    if (this.windowWidth < 1025) {
      this.NavCollapsedMob.emit();
    }
  }
}
