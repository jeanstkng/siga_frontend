import { Institution } from './../../../../models/app/institution';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobBoardHttpService } from '../../../../services/job-board/job-board-http.service';
import { Course } from '../../../../models/job-board/course';
import { Paginator } from '../../../../models/setting/paginator';
import { HttpParams } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { BreadcrumbService } from '../../../../shared/services/breadcrumb.service';
import { MessageService } from '../../../shared/services/message.service';
@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})

export class CourseComponent implements OnInit {
    paginator: Paginator;
    courses: Course[];
    formCourse: FormGroup;
    course: Course;
    courseDialog: boolean;
    flagCourses: boolean;

    constructor(private spinnerService: NgxSpinnerService,
        public messageService: MessageService,
        private formBuilder: FormBuilder,
        private jobBoardHttpService: JobBoardHttpService,
        private breadcrumbService: BreadcrumbService) {
        this.paginator = { current_page: 1, per_page: 5 };
        this.courses = [];
    }

    ngOnInit(): void {
        this.buildFormCourse();
        this.getCourses(this.paginator);

    }

    // Build form course
    buildFormCourse() {
        this.formCourse = this.formBuilder.group({
            id: [null],
            type: [null, Validators.required],
            institution: [null, Validators.required],
            certification_type: [null, Validators.required],
            area: [null, Validators.required],
            name: [null, Validators.required],
            description: [null, [Validators.required, Validators.minLength(10)]],
            start_date: [null, Validators.required],
            end_date: [null, Validators.required],
            hours: [null, Validators.required],
        });
    }

    // courses of backend
    getCourses(paginator: Paginator) {
        const params = new HttpParams()
            .append('page', paginator.current_page.toString())
            .append('per_page', paginator.per_page.toString());
        this.flagCourses = true;
        this.jobBoardHttpService.get('courses', params).subscribe(
            response => {
                this.flagCourses = false;
                this.courses = response['data'];
                this.paginator = response as Paginator;
            }, error => {
                this.flagCourses = false;
                this.messageService.error(error);
            });
    }
}

