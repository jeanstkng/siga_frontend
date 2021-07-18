import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherListComponent } from './teacher-list.component';
import { TeacherListRoutes } from './teacher-list-routing';
import { RouterModule } from '@angular/router';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [TeacherListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(TeacherListRoutes),
    TableModule,
    ButtonModule,
    
  ]
})
export class TeacherListModule { }
