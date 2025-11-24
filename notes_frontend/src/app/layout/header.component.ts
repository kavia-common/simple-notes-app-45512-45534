import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="header">
      <h1 class="logo">Ocean Notes</h1>
    </header>
  `,
  styles: [`
    .header {
      height: 64px;
      min-height: 64px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 0 2rem;
      background: var(--color-primary);
      color: #fff;
      box-shadow: var(--color-shadow);
    }
    .logo {
      font-weight: 700;
      font-size: 1.7rem;
      letter-spacing: -0.03rem;
      color: #fff;
      margin: 0;
    }
  `]
})
export class HeaderComponent {}
