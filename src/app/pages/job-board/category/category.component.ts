import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from 'src/app/models/job-board/category';
import { Paginator } from 'src/app/models/setting/paginator';
import { AppHttpService } from 'src/app/services/app/app-http.service';
import { JobBoardHttpService } from 'src/app/services/job-board/job-board-http.service';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { MessageService } from '../../shared/services/message.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
  export class CategoryComponent implements OnInit {
    paginator: Paginator;
    categories: Category[];
    formCategory: FormGroup;
    categoryDialog: boolean;
    flagSkeletonListCategories: boolean;

    constructor(
        public messageService: MessageService,
        private formBuilder: FormBuilder,
        private jobBoardHttpService: JobBoardHttpService) {
        this.paginator = { current_page: 1, per_page: 2 };
        this.categories = [];
    }

    ngOnInit(): void {
        this.getCategories(this.paginator);
        this.buildFormCategory();
    }

    // Build form skill
    buildFormCategory() {
        this.formCategory = this.formBuilder.group({
            id: [null],
            parent: [null ],
            code: [null, Validators.required ],
            name: [null, Validators.required ],
            icon: [null, Validators.required ],
        });
    }

    // categories of backend
    getCategories(paginator: Paginator) {
        const params = new HttpParams()
            .append('page', paginator.current_page.toString())
            .append('per_page', paginator.per_page.toString());

        this.flagSkeletonListCategories = true;
        this.jobBoardHttpService.get('categories', params).subscribe(
            response => {
                this.flagSkeletonListCategories = false;
                this.categories = response['data'];
                console.log(this.categories);
                this.paginator = response as Paginator;
            }, error => {
                this.flagSkeletonListCategories = false;
                this.messageService.error(error);
            });
    }
}

