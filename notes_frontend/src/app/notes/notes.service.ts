import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private readonly KEY = 'notes-demo';
  private notes: Note[] = [];

  constructor() {
    this.load();
  }

  /** List all notes, ordered by updatedAt descending */
  // PUBLIC_INTERFACE
  list(): Note[] {
    return [...this.notes].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  /** Find a note by id */
  // PUBLIC_INTERFACE
  get(id: string): Note | undefined {
    return this.notes.find(n => n.id === id);
  }

  /** Create new note */
  // PUBLIC_INTERFACE
  create(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Note {
    const item: Note = {
      ...note,
      id: this._generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.notes.push(item);
    this.save();
    return item;
  }

  /** Update existing note */
  // PUBLIC_INTERFACE
  update(id: string, partial: Partial<Note>): boolean {
    const ix = this.notes.findIndex(n => n.id === id);
    if (ix < 0) return false;
    this.notes[ix] = { ...this.notes[ix], ...partial, updatedAt: new Date().toISOString() };
    this.save();
    return true;
  }

  /** Delete a note */
  // PUBLIC_INTERFACE
  delete(id: string): boolean {
    const prev = this.notes.length;
    this.notes = this.notes.filter(n => n.id !== id);
    if (this.notes.length < prev) {
      this.save();
      return true;
    } else {
      return false;
    }
  }

  /** Persist notes to localStorage */
  private save() {
    if (typeof globalThis !== 'undefined' && globalThis.window && globalThis.window.localStorage) {
      globalThis.window.localStorage.setItem(this.KEY, JSON.stringify(this.notes));
    }
  }

  /** Load notes from localStorage */
  private load() {
    if (typeof globalThis !== 'undefined' && globalThis.window && globalThis.window.localStorage) {
      try {
        const raw = globalThis.window.localStorage.getItem(this.KEY);
        this.notes = raw ? JSON.parse(raw) : [];
      } catch (e) {
        this.notes = [];
      }
    }
  }

  /** Generate a unique id for new notes */
  private _generateId(): string {
    return Math.random().toString(36).slice(2, 10) + String(Date.now()).slice(-5);
  }
}
