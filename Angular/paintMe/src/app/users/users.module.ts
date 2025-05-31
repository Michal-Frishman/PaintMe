import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';  
import { AddUserFormComponent } from '../components/users/add-user-form/add-user-form/add-user-form.component';
import { UpdateUserFormComponent } from '../components/users/update-user-form/update-user-form/update-user-form.component';
import { UsersListComponent } from '../components/users/users-list/users-list.component';

const routes: Routes = [
  { path: '', component: UsersListComponent },
  { path: 'add', component: AddUserFormComponent },
  { path: ':id/update', component: UpdateUserFormComponent }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)   
  ]
})
export class UsersModule { }
