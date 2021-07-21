import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import { PortfolioRouting } from './portfolio.routing';
import { RouterModule } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PortfolioRouting),
    TabViewModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    AutoCompleteModule,
    FileUploadModule,
    DataViewModule,
    PanelModule,
    InputTextModule,
    CalendarModule,
    InputTextareaModule
  ],
  declarations: [PortfolioComponent]
})
export class PortfolioModule { }
