import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../../../../models/job-board/course';
import { MessageService } from '../../../../shared/services/message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { JobBoardHttpService } from '../../../../../services/job-board/job-board-http.service';
import { AppHttpService } from '../../../../../services/app/app-http.service';
import { HttpParams } from '@angular/common/http';
import { Catalogue } from '../../../../../models/app/catalogue';
import { MessageService as MessagePnService } from 'primeng/api';
import { SharedService } from '../../../../shared/services/shared.service';
import { add, format } from 'date-fns';

@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss']
})

export class CourseFormComponent implements OnInit {
    @Input() formCourseIn: FormGroup;
    @Input() coursesIn: Course[];
    @Output() coursesOut = new EventEmitter<Course[]>();
    @Output() displayOut = new EventEmitter<boolean>();
    filteredTypes: any[];
    types: Catalogue[];
    filteredInstitutions: any[];
    institutions: Catalogue[];
    filteredCertificationTypes: any[];
    certificationTypes: Catalogue[];
    filteredAreas: any[];
    areas: Catalogue[];

    constructor(private formBuilder: FormBuilder,
        public messageService: MessageService,
        private messagePnService: MessagePnService,
        private spinnerService: NgxSpinnerService,
        private appHttpService: AppHttpService,
        private sharedService: SharedService,
        private jobBoardHttpService: JobBoardHttpService) {
    }

    ngOnInit(): void {
        this.getTypes();
        this.getInstitutions();
        this.getCertificationTypes();
        this.getAreas();

    }

    // Fields of Form
    get typeField() {
        return this.formCourseIn.get('type');
    }

    get institutionField() {
        return this.formCourseIn.get('institution');
    }

    get certificationTypeField() {
        return this.formCourseIn.get('certification_type');
    }

    get areaField() {
        return this.formCourseIn.get('area');
    }

    get nameField() {
        return this.formCourseIn.get('name');
    }

    get descriptionField() {
        return this.formCourseIn.get('description');
    }

    get startDateField() {
        return this.formCourseIn.get('start_date');
    }

    get endDateField() {
        return this.formCourseIn.get('end_date');
    }

    get hoursField() {
        return this.formCourseIn.get('hours');
    }

    get idField() {
        return this.formCourseIn.get('id');
    }

    // Submit Form
    onSubmit(flag = false) {
        if (this.formCourseIn.valid) {
            if (this.idField.value) {
                this.updateCourse(this.formCourseIn.value);
            } else {
                this.storeCourse(this.formCourseIn.value, flag);
            }
        } else {
            this.formCourseIn.markAllAsTouched();
        }
    }

    // Types of catalogues

    getTypes() {
        this.appHttpService.getCatalogues('COURSE_TYPE').subscribe(response => {
            this.types = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }

    getInstitutions() {
        this.appHttpService.getCatalogues('COURSE_INSTITUTION').subscribe(response => {
            this.institutions = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }

    getCertificationTypes() {
        this.appHttpService.getCatalogues('COURSE_CERTIFICATION_TYPE').subscribe(response => {
            this.certificationTypes = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }

    getAreas() {
        this.appHttpService.getCatalogues('COURSE_AREA').subscribe(response => {
            this.areas = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }

    // Save in backend
    storeCourse(course: Course, flag = false) {
        this.spinnerService.show();
        this.jobBoardHttpService.store('courses', { course }).subscribe(response => {
            this.spinnerService.hide();
            this.messageService.success(response);
            this.saveCourse(response['data']);
            if (flag) {
                this.formCourseIn.reset();
            } else {
                this.displayOut.emit(false);
            }
        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }

    // Save in backend
    updateCourse(course: Course) {
        this.spinnerService.show();
        this.jobBoardHttpService.update('courses/' + course.id, { course })
            .subscribe(response => {
                this.spinnerService.hide();
                this.messageService.success(response);
                this.saveCourse(response['data']);
                this.displayOut.emit(false);
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
    }

    // Save in frontend
    saveCourse(course: Course) {
        const index = this.coursesIn.findIndex(element => element.id === course.id);
        if (index === -1) {
            this.coursesIn.push(course);
        } else {
            this.coursesIn[index] = course;
        }
        this.coursesOut.emit(this.coursesIn);
    }
}
