import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from 'src/app/models/job-board/category';
import { Col } from 'src/app/models/setting/col';
import { Paginator } from 'src/app/models/setting/paginator';
import { MessageService } from 'src/app/pages/shared/services/message.service';
import { JobBoardHttpService } from 'src/app/services/job-board/job-board-http.service';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']

})

export class CategoryListComponent implements OnInit {
    @Input() flagSkeletonListCategories: boolean;
    @Input() categoriesIn: Category[];
    @Input() paginatorIn: Paginator;
    @Input() formCategoryIn: FormGroup;
    @Input() displayIn: boolean;
    @Output() categoriesOut = new EventEmitter<Category[]>();
    @Output() formCategorylOut = new EventEmitter<FormGroup>();
    @Output() displayOut = new EventEmitter<boolean>();
    @Output() paginatorOut = new EventEmitter<Paginator>();
    selectedCategories: any[];
    selectedCategory: Category;
    dialogUploadFiles: boolean;
    dialogViewFiles: boolean;
    files: File[];
    paginatorFiles: Paginator;
    colsCategory: Col[];

    constructor(public messageService: MessageService,
                private spinnerService: NgxSpinnerService,
                private jobBoardHttpService: JobBoardHttpService) {
        this.resetPaginator();
    }

    resetPaginator() {
        this.paginatorFiles = {current_page: 1, per_page: 5};
    }

    ngOnInit(): void {
        this.loadColsCategory();
    }

    // Columns table
    loadColsCategory() {
        this.colsCategory = [
            {field: 'type', header: 'Tipo'},
            {field: 'description', header: 'Descripción'},
        ];
    }

    // Search categories in backend
    searchCategories(event, search) {
        if (event.type === 'click' || event.keyCode === 13 || search.length === 0) {
            const params = search.length > 0 ? new HttpParams().append('search', search) : null;
            this.spinnerService.show();
            this.jobBoardHttpService.get('categories', params).subscribe(response => {
                this.categoriesIn = response['data'],
                    this.spinnerService.hide();
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
        }
    }

    openNewFormCategory() {
        this.formCategoryIn.reset();
        this.formCategoryOut.emit(this.formCategoryIn);
        this.displayOut.emit(true);
    }

    openEditFormCategory(skill: Category) {
        this.formCategoryIn.patchValue(skill);
        this.formCategoryOut.emit(this.formCategoryIn);
        this.displayOut.emit(true);
    }

    selectCategory(skill: Category) {
        this.selectedCategory = skill;
    }

   


    pageChange(event) {
        this.paginatorIn.current_page = event.page + 1;
        this.paginatorOut.emit(this.paginatorIn);
    }

    deleteCategories(skill = null) {
        this.messageService.questionDelete({})
            .then((result) => {
                if (result.isConfirmed) {
                    if (skill) {
                        this.selectedCategories = [];
                        this.selectedCategories.push(skill);
                    }
                    const ids = this.selectedCategories.map(element => element.id);
                    this.spinnerService.show();
                    this.jobBoardHttpService.delete('skill/delete', ids)
                        .subscribe(response => {
                            this.spinnerService.hide();
                            this.messageService.success(response);
                            this.removeCategories(ids);
                            this.selectedCategories = [];
                        }, error => {
                            this.spinnerService.hide();
                            this.messageService.error(error);
                        });
                }
            });
    }

    removeCategories(ids) {
        for (const id of ids) {
            this.categoriesIn = this.categoriesIn.filter(element => element.id !== id);
        }
        this.categoriesOut.emit(this.categoriesIn);
    }

   
}