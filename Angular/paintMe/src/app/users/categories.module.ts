import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryFormComponent } from '../components/categories/add-category-form/add-category-form.component';
import { CategoriesListComponent } from '../components/categories/categories-list/categories-list/categories-list.component';
import { UpdateCategoryFormComponent } from '../components/categories/update-category-form/update-category-form/update-category-form.component';

const routes: Routes = [
  { path: 'categories', component: CategoriesListComponent },
  { path: 'categories/add', component: AddCategoryFormComponent },
  { path: 'categories/:id/update', component: UpdateCategoryFormComponent },
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CategoriesModule { }
