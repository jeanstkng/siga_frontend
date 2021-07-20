import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ProjectsComponent} from './projects/projects-list.component';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {TabViewModule} from 'primeng/tabview';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CalendarModule} from 'primeng/calendar';
import {AccordionModule} from 'primeng/accordion';
import {ListboxModule} from 'primeng/listbox';
import {MultiSelectModule} from 'primeng/multiselect';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {StepsModule} from 'primeng/steps';
import {ToastModule} from 'primeng/toast';

// PrimeNgModule
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuItem} from 'primeng/api';

// my component
import {CommunityComponent} from './community.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

// SERVICIOS
import { CommunityService } from '../../services/community/community.service';
import { CommunityRouting } from './community.routing';

@NgModule({
    imports: [
        CommonModule,
        DataViewModule,
        PanelModule,
        InputTextModule,
        ButtonModule,
        TabViewModule,
        DropdownModule,
        FormsModule,
        RadioButtonModule,
        InputTextareaModule,
        CalendarModule,
        AccordionModule,
        ListboxModule,
        MultiSelectModule,
        TableModule,
        FileUploadModule,
        StepsModule,
        ToastModule,
        RouterModule.forChild(CommunityRouting),
        ReactiveFormsModule,
        MessageModule,
    ],
    declarations: [
        ProjectsComponent,
        CommunityComponent
    ],
    providers: [
        CommunityService,
        MessageService
    ],
})
export class CommunityModule {
}
