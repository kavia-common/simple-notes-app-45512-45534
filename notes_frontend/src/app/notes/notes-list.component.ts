import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from './notes.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Note } from './note.model';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <div class="card">
      <div class="header-row">
        <h2>Notes</h2>
        <button (click)="create()" class="secondary" title="Create a new note">+ New Note</button>
      </div>
      <div *ngIf="notes.length === 0" class="empty-state">
        <span>No notes yet. Click 'New Note' to get started!</span>
      </div>
      <ul class="notes-list" *ngIf="notes.length">
        <li *ngFor="let note of notes" [class.selected]="false">
          <h3>{{ note.title }}</h3>
          <div class="controls">
            <button class="outline" (click)="view(note.id)">View</button>
            <button class="outline" (click)="edit(note.id)">Edit</button>
            <button class="outline" (click)="remove(note.id)">Delete</button>
          </div>
          <div class="meta">
            <em>{{ note.updatedAt | date:'short' }}</em>
          </div>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .card { margin-top: 0; }
    .header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.2rem;
    }
    .empty-state {
      color: #64748b;
      text-align: center;
      padding: 2.1rem;
      font-size: 1.13rem;
      font-style: italic;
      opacity: 0.83;
    }
    .notes-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .notes-list li {
      padding: 1.08rem 1.26rem 0.8rem 0.85rem;
      border-radius: var(--radius-sm);
      box-shadow: 0 1px 4px 0 rgba(20, 86, 185, 0.065);
      margin-bottom: 0.85rem;
      background: var(--color-surface);
      display: flex;
      flex-direction: column;
      position: relative;
      transition: box-shadow 0.15s;
    }
    .notes-list li.selected {
      outline: 2px solid var(--color-primary);
      background: #e8f0fd;
    }
    .meta {
      font-size: 0.92rem;
      color: #718096;
      margin-top: 0.21rem;
      margin-left: 0.3rem;
    }
    .controls {
      display: flex;
      gap: 0.6rem;
      margin: 0.45rem 0 0.2rem 0;
    }
    button.outline {
      font-size: 1rem;
      padding: 0.3rem 1rem;
      border-radius: 0.4rem;
      border-width: 1.1px;
      background: transparent;
      color: var(--color-primary);
      border: 1.2px solid var(--color-primary);
      font-weight: 500;
    }
    button.outline:hover {
      background: var(--color-primary);
      color: #fff;
      box-shadow: var(--color-shadow);
    }
  `]
})
export class NotesListComponent {
  notes: Note[] = [];

  constructor(
    private svc: NotesService,
    private router: Router
  ) {
    this.notes = this.svc.list();
  }

  create() {
    this.router.navigate(['/create']);
  }

  view(id: string) {
    this.router.navigate(['/view', id]);
  }

  edit(id: string) {
    this.router.navigate(['/edit', id]);
  }

  remove(id: string) {
    if (typeof globalThis !== 'undefined' && globalThis.confirm &&
      globalThis.confirm('Are you sure you want to delete this note?')) {
      this.svc.delete(id);
      this.notes = this.svc.list(); // refresh list
    }
  }
}
