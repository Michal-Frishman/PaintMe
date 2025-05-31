import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';  
import { AddFileFormComponent } from '../components/files/add-file-form/add-file-form/add-file-form.component';
import { FilesListComponent } from '../components/files/files-list/files-list/files-list.component';
import { UpdateFileFormComponent } from '../components/files/update-file-form/update-file-form/update-file-form.component';


const routes: Routes = [
   { path: 'files', component: FilesListComponent },
            { path: 'files/add', component: AddFileFormComponent },
            { path: 'files/:id/update', component: UpdateFileFormComponent },
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)   
  ]
})
export class FilesModule { }
