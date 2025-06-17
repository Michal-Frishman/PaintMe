import { Routes } from '@angular/router';
import { AddUserFormComponent } from './components/users/add-user-form/add-user-form/add-user-form.component';
import { UpdateUserFormComponent } from './components/users/update-user-form/update-user-form/update-user-form.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { AddCategoryFormComponent } from './components/categories/add-category-form/add-category-form.component';
import { CategoriesListComponent } from './components/categories/categories-list/categories-list/categories-list.component';
import { UpdateCategoryFormComponent } from './components/categories/update-category-form/update-category-form/update-category-form.component';
import { AddFileFormComponent } from './components/files/add-file-form/add-file-form/add-file-form.component';
import { FilesListComponent } from './components/files/files-list/files-list/files-list.component';
import { UpdateFileFormComponent } from './components/files/update-file-form/update-file-form/update-file-form.component';
import { authGuard } from './guard/auth.guard';
import { StatsChartComponent } from './components/stats-chart/stats-chart.component';
import { SignInComponent } from './components/sign-in/sign-in/sign-in.component';
import { HomePageComponent } from './components/home-page/home-page.component';
export const routes: Routes = [
    {
        path: '',
         canActivate: [authGuard],
        children: [
            { path: '', component: HomePageComponent },
            { path: 'users', component: UsersListComponent },
            { path: 'users/add', component: AddUserFormComponent },
            { path: 'users/:id/update', component: UpdateUserFormComponent },
            { path: 'files', component: FilesListComponent },
            { path: 'files/add', component: AddFileFormComponent },
            { path: 'files/:id/update', component: UpdateFileFormComponent },
            { path: 'categories', component: CategoriesListComponent },
            { path: 'categories/add', component: AddCategoryFormComponent },
            { path: 'categories/:id/update', component: UpdateCategoryFormComponent },
            { path: 'stats', component: StatsChartComponent },
        ]
    },
    { path: 'login', component: SignInComponent }
];
