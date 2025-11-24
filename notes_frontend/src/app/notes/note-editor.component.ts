import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from './notes.service';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Note } from './note.model';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <form #f="ngForm" (ngSubmit)="onSubmit(f)">
        <h2>{{ isEdit ? 'Edit Note' : 'Create Note' }}</h2>
        <div class="form-group">
          <label for="title">Title</label>
          <input name="title" id="title" required [(ngModel)]="note.title" />
        </div>
        <div class="form-group">
          <label for="content">Content</label>
          <textarea name="content" id="content" rows="8" required [(ngModel)]="note.content"></textarea>
        </div>
        <div class="form-actions">
          <button type="submit" [disabled]="!f.valid">
            {{ isEdit ? 'Update Note' : 'Create Note' }}
          </button>
          <button type="button" class="outline" (click)="cancel()">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-group {
      margin-bottom: 1.15rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    label {
      font-size: 1.04rem;
      font-weight: 600;
      color: var(--color-text);
    }
    input, textarea {
      width: 100%;
      padding: 0.65rem;
      font-size: 1.04rem;
      background: var(--color-background);
      border: 1.2px solid #c2d2f5;
      border-radius: var(--radius-sm);
      margin: 0.07rem 0;
      color: var(--color-text);
      box-shadow: none;
    }
    textarea { resize: vertical; min-height: 120px; }
    .form-actions {
      display: flex;
      gap: 1.8rem;
      margin-top: 1rem;
    }
    button[type="submit"] {
      background: var(--color-primary);
      color: #fff;
      font-size: 1.09rem;
      min-width: 120px;
    }
    button.outline {
      background: transparent;
      border: 1.4px solid var(--color-primary);
      color: var(--color-primary);
      font-weight: 500;
    }
  `]
})
export class NoteEditorComponent {
  isEdit = false;
  note: Partial<Note> = { title: '', content: '' };
  private noteId?: string;

  constructor(
    private svc: NotesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const n = svc.get(id);
        if (n) {
          this.isEdit = true;
          this.note = { ...n };
          this.noteId = n.id;
        }
      }
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    if (this.isEdit && this.noteId) {
      this.svc.update(this.noteId, {
        title: this.note.title || '',
        content: this.note.content || ''
      });
    } else {
      this.svc.create({
        title: this.note.title || '',
        content: this.note.content || ''
      });
    }
    this.router.navigate(['/']);
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
