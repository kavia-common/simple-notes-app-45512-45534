import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesListComponent } from './notes-list.component';
import { NoteEditorComponent } from './note-editor.component';
import { NoteViewComponent } from './note-view.component';

const routes: Routes = [
  { path: '', component: NotesListComponent },
  { path: 'create', component: NoteEditorComponent },
  { path: 'edit/:id', component: NoteEditorComponent },
  { path: 'view/:id', component: NoteViewComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    NotesListComponent,
    NoteEditorComponent,
    NoteViewComponent,
  ]
})
export class NotesModule {}
