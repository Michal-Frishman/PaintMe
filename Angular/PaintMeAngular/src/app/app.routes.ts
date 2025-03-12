import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { AddUserFormComponent } from './components/add-user-form/add-user-form/add-user-form.component';
import { UpdateUserFormComponent } from './components/update-user-form/update-user-form/update-user-form.component';
import { FilesListComponent } from './components/files-list/files-list/files-list.component';
import { AddFileFormComponent } from './components/add-file-form/add-file-form/add-file-form.component';
import { UpdateFileFormComponent } from './components/update-file-form/update-file-form/update-file-form.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent, children: [
            { path: 'users', component: UsersListComponent },
            { path: 'users/add', component: AddUserFormComponent },
            { path: 'users/:id/update', component: UpdateUserFormComponent },
            { path: 'files', component: FilesListComponent }, 
            { path: 'files/add', component: AddFileFormComponent }, 
            { path: 'files/:id/update', component: UpdateFileFormComponent }

        ]
    }
];
