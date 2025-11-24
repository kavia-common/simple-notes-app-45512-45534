import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  template: `
    <div class="layout-root">
      <app-header></app-header>
      <div class="content-wrapper">
        <app-sidebar></app-sidebar>
        <main class="layout-main">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout-root {
      height: 100vh;
      width: 100vw;
      background: var(--color-background);
      display: flex;
      flex-direction: column;
    }
    .content-wrapper {
      display: flex;
      flex-direction: row;
      height: calc(100vh - 64px);
      width: 100vw;
    }
    .layout-main {
      flex: 1;
      margin: 0 auto;
      width: 100vw;
      max-width: 740px;
      padding: 2.25rem 2.1rem 2.5rem 2.6rem;
      background: var(--color-background);
      min-height: calc(100vh - 64px);
      overflow-y: auto;
      border-radius: var(--radius-md) 0 0 0;
      box-shadow: none;
      transition: box-shadow var(--transition);
    }
    @media (max-width: 800px) {
      .content-wrapper {
        flex-direction: column;
      }
      .layout-main {
        max-width: 100vw;
        padding: 1.1rem 0.7rem;
      }
      .sidebar {
        width: 100vw;
        min-width: unset;
        height: auto;
        flex-direction: row;
        padding: 1rem 0.6rem;
      }
    }
  `]
})
export class LayoutComponent {}
