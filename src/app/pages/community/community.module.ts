import { CommunityRouting } from './community.routing'; 
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// PrimeNgModule
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuItem} from 'primeng/api';

// my component
import {CommunityComponent} from './community.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';


@NgModule({
 imports: [
     CommonModule,
     RouterModule.forChild(CommunityRouting),
     FormsModule,
     ReactiveFormsModule,
     InputTextModule,
     ButtonModule,
     MessageModule,
  ],

  declarations: [CommunityComponent],
  providers: [MessageService],

})

export class CommunityModule {

}
