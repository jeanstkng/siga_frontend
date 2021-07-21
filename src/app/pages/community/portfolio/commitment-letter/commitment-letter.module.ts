import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommitmentLetterComponent } from './commitment-letter.component';
import { CommitmentLetterRouting } from './commitment-letter.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CommitmentLetterRouting),
    FormsModule,
     ReactiveFormsModule,
     InputTextModule,
     ButtonModule,
     MessageModule,
  ],
  declarations: [CommitmentLetterComponent]
})
export class CommitmentLetterModule { }
