import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { AddUserFormComponent } from './components/add-user-form/add-user-form/add-user-form.component';
import { UpdateUserFormComponent } from './components/update-user-form/update-user-form/update-user-form.component';
import { FilesListComponent } from './components/files-list/files-list/files-list.component';
import { AddFileFormComponent } from './components/add-file-form/add-file-form/add-file-form.component';
import { UpdateFileFormComponent } from './components/update-file-form/update-file-form/update-file-form.component';
import { SignInComponent } from './components/sign-in/sign-in/sign-in.component';
import { CategoriesListComponent } from './components/categories-list/categories-list/categories-list.component';
import { AddCategoryFormComponent } from './components/add-category-form/add-category-form/add-category-form.component';
import { UpdateCategoryFormComponent } from './components/update-category-form/update-category-form/update-category-form.component';
// import { StatsChartComponent } from './components/stats-chart/stats-chart.component';
import { HomePageComponent } from './components/home-page/home-page.component';

export const routes: Routes = [
    
       { path: '', component: HomePageComponent}, 
        // // canActivate: [authGuard], 
        // children: [
            { path: 'users', component: UsersListComponent },
            { path: 'users/add', component: AddUserFormComponent },
            { path: 'users/:id/update', component: UpdateUserFormComponent },
            { path: 'files', component: FilesListComponent },
            { path: 'files/add', component: AddFileFormComponent },
            { path: 'files/:id/update', component: UpdateFileFormComponent },
            { path: 'categories', component: CategoriesListComponent }, // נתיב לרשימת הקטגוריות
            { path: 'categories/add', component: AddCategoryFormComponent }, // נתיב להוספת קטגוריה
            { path: 'categories/:id/update', component: UpdateCategoryFormComponent },// נתיב לעדכון קטגוריה,
            // { path: 'stats', component: StatsChartComponent },
            { path: 'login', component: SignInComponent }

        // ]
    

];
