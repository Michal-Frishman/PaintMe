// import { Routes } from '@angular/router';
// import { HomeComponent } from './components/home/home/home.component';
// import { UsersListComponent } from './components/users/users-list/users-list.component';
// import { AddUserFormComponent } from './components/users/add-user-form/add-user-form/add-user-form.component';
// import { UpdateUserFormComponent } from './components/users/update-user-form/update-user-form/update-user-form.component';
// import { FilesListComponent } from './components/files/files-list/files-list/files-list.component';
// import { AddFileFormComponent } from './components/files/add-file-form/add-file-form/add-file-form.component';
// import { UpdateFileFormComponent } from './components/files/update-file-form/update-file-form/update-file-form.component';
// import { SignInComponent } from './components/sign-in/sign-in/sign-in.component';
// import { CategoriesListComponent } from './components/categories/categories-list/categories-list/categories-list.component';
// import { AddCategoryFormComponent } from './components/categories/add-category-form/add-category-form.component';
// import { UpdateCategoryFormComponent } from './components/categories/update-category-form/update-category-form/update-category-form.component';
// import { HomePageComponent } from './components/home-page/home-page.component';
// import { StatsChartComponent } from './components/stats-chart/stats-chart.component';
// import { authGuard } from './guard/auth.guard';

// // // export const routes: Routes = [
    
// // //        { path: '', component: HomePageComponent, 
// // //         canActivate: [authGuard], 
// // //         children: [
// // //     //    },
// // //             { path: 'users', component: UsersListComponent },
// // //             { path: 'users/add', component: AddUserFormComponent },
// // //             { path: 'users/:id/update', component: UpdateUserFormComponent },
// // //             { path: 'files', component: FilesListComponent },
// // //             { path: 'files/add', component: AddFileFormComponent },
// // //             { path: 'files/:id/update', component: UpdateFileFormComponent },
// // //             { path: 'categories', component: CategoriesListComponent }, // נתיב לרשימת הקטגוריות
// // //             { path: 'categories/add', component: AddCategoryFormComponent }, // נתיב להוספת קטגוריה
// // //             { path: 'categories/:id/update', component: UpdateCategoryFormComponent },// נתיב לעדכון קטגוריה,
// // //             { path: 'stats', component: StatsChartComponent },

// // //         ]},
// // //         { path: 'login', component: SignInComponent }


// // // ];
// export const routes: Routes = [
//     {
//       path: '',
//       canMatch: [authGuard],
//       children: [
//         { path: '', component: HomePageComponent },
//         { path: 'users', component: UsersListComponent },
//         { path: 'users/add', component: AddUserFormComponent },
//         { path: 'users/:id/update', component: UpdateUserFormComponent },
//         { path: 'files', component: FilesListComponent },
//         { path: 'files/add', component: AddFileFormComponent },
//         { path: 'files/:id/update', component: UpdateFileFormComponent },
//         { path: 'categories', component: CategoriesListComponent },
//         { path: 'categories/add', component: AddCategoryFormComponent },
//         { path: 'categories/:id/update', component: UpdateCategoryFormComponent },
//         { path: 'stats', component: StatsChartComponent },
//       ]
//     },
//     { path: 'login', component: SignInComponent }
//   ];
  