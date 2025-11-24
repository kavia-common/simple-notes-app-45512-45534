import { Routes } from '@angular/router';

/**
 * Application routes for Notes CRUD flows
 */
export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule)
  },
  // fallback: redirect to notes list
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
