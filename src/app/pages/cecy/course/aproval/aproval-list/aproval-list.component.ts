import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CecyHttpService } from '../../../../../services/cecy/cecy-http.service';
import { Course } from '../../../../../models/cecy/Course';
import { FormGroup } from '@angular/forms';
import { Col } from '../../../../../models/setting/col';
import { Paginator } from '../../../../../models/setting/paginator';
import { MessageService } from '../../../../../services/app/message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpParams } from '@angular/common/http';




@Component({
  selector: 'app-aproval-list',
  templateUrl: './aproval-list.component.html',
  styleUrls: ['./aproval-list.component.css']
})
export class AprovalListComponent implements OnInit {
  @Input() flagCourses: boolean;
  @Input() coursesIn: Course[];
  @Input() paginatorIn: Paginator;
  @Input() formCourseIn: FormGroup;
  @Input() displayIn: boolean;
  @Output() coursesOut = new EventEmitter<Course[]>();
  @Output() formCourseOut = new EventEmitter<FormGroup>();
  @Output() displayOut = new EventEmitter<boolean>();
  @Output() paginatorOut = new EventEmitter<Paginator>();
  selectedCourses: any[];
    dialogUploadFiles: boolean;
    dialogViewFiles: boolean;
    paginatorFiles: Paginator;
    colsCourse: Col[];

  constructor(
    private messageService: MessageService,
        private spinnerService: NgxSpinnerService,
        private cecyHttpService: CecyHttpService
  ) { 
    this.resetPaginatorCourses();
  }

  ngOnInit() {
  }
  resetPaginatorCourses() {
    this.paginatorIn = { current_page: 1, per_page: 5 };
  }

  openEditFormCourse(course: Course) {
    this.formCourseIn.patchValue(course);
    this.formCourseOut.emit(this.formCourseIn);
    this.displayOut.emit(true);
  }

  pageChange(event) {
    this.paginatorIn.current_page = event.page + 1;
    this.paginatorOut.emit(this.paginatorIn);
  }
}
