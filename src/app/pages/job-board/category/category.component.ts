import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from 'src/app/models/job-board/category';
import { Paginator } from 'src/app/models/setting/paginator';
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
  flagCategories: boolean;

  constructor(
    private spinnerService: NgxSpinnerService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private jobBoardHttpService: JobBoardHttpService,
  ) {
    this.paginator = { current_page: 1, per_page: 10 };
    this.categories = [];

  }

  ngOnInit(): void {
    this.getCategories(this.paginator);
    this.buildFormCategory();
    
  }

  buildFormCategory() {
    this.formCategory = this.formBuilder.group({
      parent: [null],
      children: [null, [Validators.required]],
      code: [null, Validators.required],
      name: [null, Validators.required],
      icon: [null, Validators.required],
      
    });
}

  getCategories(paginator: Paginator) {
    const params = new HttpParams()
      .append('page', paginator.current_page.toString())
      .append('per_page', paginator.per_page.toString());

      this.flagCategories = true;
    this.jobBoardHttpService.get('categories', params).subscribe(
      response => {
        this.flagCategories = false;
        this.categories = response['data'];
        this.paginator= response as Paginator;
      },error => {
        this.flagCategories = false;
        this.messageService.error(error);
      }
    )

  } 

}




