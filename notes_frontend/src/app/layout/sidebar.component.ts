import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <aside class="sidebar">
      <nav>
        <ul>
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Notes List</a></li>
          <li><a routerLink="/create" routerLinkActive="active">Create Note</a></li>
        </ul>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 220px;
      min-width: 220px;
      background: var(--color-surface);
      height: 100svh;
      box-shadow: 1px 0 6px 0 rgba(0,0,0,0.03);
      display: flex;
      flex-direction: column;
      padding: 1.5rem 0.9rem 1.5rem 1.7rem;
    }
    nav ul { list-style: none; }
    nav li {
      margin: 1.2rem 0;
      font-size: 1.08rem;
      font-weight: 500;
    }
    a {
      color: var(--color-text);
      transition: color 0.14s;
    }
    a.active, a:focus, a:hover {
      color: var(--color-primary);
      font-weight: 700;
    }
  `]
})
export class SidebarComponent {}
