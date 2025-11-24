import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from './notes.service';
import { Note } from './note.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-note-view',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <div class="card" *ngIf="note; else notFound">
      <div class="header-row">
        <h2>{{ note?.title }}</h2>
        <div class="actions">
          <button class="outline" (click)="back()">Back</button>
          <button (click)="edit()">Edit</button>
          <button class="outline" (click)="remove()">Delete</button>
        </div>
      </div>
      <p class="date"><em>Last updated: {{ note?.updatedAt | date:'short' }}</em></p>
      <div class="content-view" [innerText]="note?.content"></div>
    </div>
    <ng-template #notFound>
      <div class="card">
        <p>Note not found. <a (click)="back()" style="cursor:pointer;">Back to list</a></p>
      </div>
    </ng-template>
  `,
  styles: [`
    .card { margin-top: 0; }
    .header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.1rem;
    }
    .actions { display: flex; gap: 0.9rem; }
    button, .outline {
      min-width: 70px;
      font-size: 1rem;
      padding: 0.27rem 1rem;
      border-radius: 0.36rem;
    }
    .content-view {
      margin-top: 1.3rem;
      font-size: 1.11rem;
      line-height: 1.55;
      color: #303030;
      white-space: pre-wrap;
      min-height: 60px;
      border-radius: var(--radius-sm);
      background: #f4f9ff;
      padding: 1rem 1.2rem;
      box-shadow: 0 0.5px 3px 0 rgba(37,99,235,0.045);
    }
    .date {
      color: #5c70a9;
      font-size: 0.96rem;
      margin-bottom: 0.55rem;
    }
  `]
})
export class NoteViewComponent {
  note?: Note;

  constructor(
    private svc: NotesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.note = svc.get(id);
      }
    });
  }

  edit() {
    if (this.note?.id) {
      this.router.navigate(['/edit', this.note.id]);
    }
  }

  remove() {
    if (
      this.note?.id &&
      typeof globalThis !== 'undefined' &&
      globalThis.confirm &&
      globalThis.confirm('Delete this note?')
    ) {
      this.svc.delete(this.note.id);
      this.router.navigate(['/']);
    }
  }

  back() {
    this.router.navigate(['/']);
  }
}
