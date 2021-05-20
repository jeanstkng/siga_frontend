// Angular Modules
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LandingPageRouting} from './landing-page.routing';

// PrimeNG Modules
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {SkeletonModule} from 'primeng/skeleton';

// My Components
import {TooltipModule} from 'primeng/tooltip';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {RatingModule} from 'primeng/rating';
import {DialogModule} from 'primeng/dialog';
import {InputNumberModule} from 'primeng/inputnumber';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {PaginatorModule} from 'primeng/paginator';
import {KeyFilterModule} from 'primeng/keyfilter';
import {TabViewModule} from 'primeng/tabview';
import {TreeModule} from 'primeng/tree';
import {AccordionModule} from 'primeng/accordion';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {CardModule} from 'primeng/card';
import {SharedModule} from '../../shared/shared.module';
import {RippleModule} from 'primeng/ripple';
import {LandingPageComponent} from './landing-page.component';
import { WebProfessionalComponent } from './web-professional/web-professional.component';
import { CategoryFilterComponent } from './web-professional/professional-list/category-filter/category-filter.component';
import { FilterComponent } from './web-professional/professional-list/filter/filter.component';
import { ProfessionalListComponent } from './web-professional/professional-list/professional-list.component';
import { TotalComponent } from './web-professional/total/total.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(LandingPageRouting),
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        DropdownModule,
        TooltipModule,
        AutoCompleteModule,
        ToastModule,
        ToolbarModule,
        FileUploadModule,
        TableModule,
        RatingModule,
        DialogModule,
        InputNumberModule,
        ConfirmDialogModule,
        InputTextareaModule,
        TooltipModule,
        DropdownModule,
        PaginatorModule,
        KeyFilterModule,
        TabViewModule,
        TreeModule,
        AccordionModule,
        OverlayPanelModule,
        SharedModule,
        CardModule,
        SkeletonModule,
        RippleModule,
    ],
    declarations: [
        LandingPageComponent,
        WebProfessionalComponent,
        CategoryFilterComponent,
        FilterComponent,
        ProfessionalListComponent,
        TotalComponent
    ],
    providers: []
})
export class LandingPageModule {
}
