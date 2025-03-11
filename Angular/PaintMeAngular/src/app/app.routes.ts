import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { AddUserFormComponent } from './components/add-user-form/add-user-form/add-user-form.component';
import { UpdateUserFormComponent } from './components/update-user-form/update-user-form/update-user-form.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent, children: [
            { path: 'users', component: UsersListComponent },
            { path: 'users/add', component: AddUserFormComponent },
            { path: 'users/update/:id', component: UpdateUserFormComponent },
        ]
    }
];
