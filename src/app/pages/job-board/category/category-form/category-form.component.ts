import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from 'src/app/models/job-board/category';
import { MessageService } from 'src/app/pages/shared/services/message.service';
import { SharedService } from 'src/app/pages/shared/services/shared.service';
import { AppHttpService } from 'src/app/services/app/app-http.service';
import { JobBoardHttpService } from 'src/app/services/job-board/job-board-http.service';
import {MessageService as MessagePnService, SelectItem} from 'primeng/api';
import { Paginator } from 'src/app/models/setting/paginator';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})

export class CategoryFormComponent implements OnInit {
    @Input() formCategoryIn: FormGroup;
    @Input() categoriesIn: Category[];
    @Output() categoriesOut = new EventEmitter<Category[]>();
    @Output() displayOut = new EventEmitter<boolean>();
    @Output() paginatorAdd = new EventEmitter<number>();
    filteredTypes: any[];
    parentCategories:Category[]=[];
    flagSkeletonListCategories: boolean;
    paginator: Paginator;
  
    constructor(private formBuilder: FormBuilder,
                public messageService: MessageService,
                private messagePnService: MessagePnService,
                private spinnerService: NgxSpinnerService,
                private appHttpService: AppHttpService,
                private sharedService: SharedService,
                private jobBoardHttpService: JobBoardHttpService) {
                
    }

    ngOnInit(): void {
         this.getParentCategories();
        
        
    }

    // Fields of Form
    get idField() {
        return this.formCategoryIn.get('id');
    }

    get parentField() {
        return this.formCategoryIn.get('parent');
    }
    get codeField() {
        return this.formCategoryIn.get('code');
    }
    get nameField() {
        return this.formCategoryIn.get('name');
    }
    get iconField() {
        return this.formCategoryIn.get('icon');
    }

    // Submit Form
    onSubmit(flag = false) {
        if (this.formCategoryIn.valid) {
            if (this.idField.value) {
                this.updateCategory(this.formCategoryIn.value);
            } else {
                this.storeCategory(this.formCategoryIn.value, flag);
            }
        } else {
            this.markAllAsTouchedFormCategory();
        }
    }

    

    // Save in backend
    storeCategory(category: Category, flag = false) {
        console.log('hola');
        this.spinnerService.show();
        this.jobBoardHttpService.store('categories', {category}).subscribe(
            response => {
            this.spinnerService.hide();
            this.messageService.success(response);
            this.saveCategory(response['data']);
            if (!flag) {
                this.displayOut.emit(false);
            }
            this.resetFormCategory();

        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }

    // Save in backend
    updateCategory(category: Category) {
        this.spinnerService.show();
        this.jobBoardHttpService.update('categories/' + category.id, {category})
            .subscribe(response => {
                this.spinnerService.hide();
                this.messageService.success(response);
                this.saveCategory(response['data']);
                console.log("eve");
                console.log(this.saveCategory);
                this.displayOut.emit(false);
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
    }

    // Save in frontend
    saveCategory(category: Category) {
        const index = this.categoriesIn.findIndex(element => element.id === category.id);
        if (index === -1) {
            this.categoriesIn.push(category);
            this.paginatorAdd.emit(1);
        } else {
            this.categoriesIn[index] = category;
        }
        this.categoriesOut.emit(this.categoriesIn);
    }


    // Reset Forms
    resetFormCategory() {
        this.formCategoryIn.reset();
    }

    // Mark as touched
    markAllAsTouchedFormCategory() {
        this.formCategoryIn.markAllAsTouched();
    }


     // categories of backend
     getParentCategories() {
        this.jobBoardHttpService.get('category/parents').subscribe(
            response => {
                this.parentCategories = response['data'];
            }, error => {
                this.messageService.error(error);
            });
    } 


}

