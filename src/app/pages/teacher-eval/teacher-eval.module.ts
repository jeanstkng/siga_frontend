import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherEvalRouting } from './teacher-eval.routing';
import { QuestionComponent } from './question/question.component';



@NgModule({
  declarations: [
    QuestionComponent,
    
  ],
  imports: [
    CommonModule,
    TeacherEvalRouting
  ]
})
export class TeacherEvalModule { }
// hola