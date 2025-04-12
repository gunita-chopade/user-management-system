// app.routes.ts
import { Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';

export const routes: Routes = [
  { path: 'add-user', component: UserFormComponent },
  { path: 'edit-user/:id', component: UserFormComponent },
  { path: 'users', component: UserListComponent },
  
];

