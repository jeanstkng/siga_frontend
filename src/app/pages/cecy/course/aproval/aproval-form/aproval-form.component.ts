import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CecyHttpService } from '../../../../../services/cecy/cecy-http.service';
import { Course } from '../../../../../models/cecy/Course';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Col } from '../../../../../models/setting/col';
import { Paginator } from '../../../../../models/setting/paginator';
import { MessageService } from '../../../../../services/app/message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpParams } from '@angular/common/http';
import { Catalogue } from 'src/app/models/app/catalogue';
import { AppService } from 'src/app/services/app/app.service';
@Component({
  selector: 'app-aproval-form',
  templateUrl: './aproval-form.component.html',
  styleUrls: ['./aproval-form.component.css']
})
export class AprovalFormComponent implements OnInit {
  status: Catalogue[];
  filteredStatus: any[];
    @Input() formCourseIn: FormGroup;
    @Input() coursesIn: Course[];
    @Output() coursesOut = new EventEmitter<Course[]>();
    @Output() displayOut = new EventEmitter<boolean>();
  constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private spinnerService: NgxSpinnerService,
        private cecyHttpService: CecyHttpService,
        private AppHttpService: AppService

  ) { }

  ngOnInit() {
    this.getStatus();

  }

  get nameField() {
    return this.formCourseIn.get('name');
  }

  get statusField() {
    return this.formCourseIn.get('status');
  }

  get idField() {
    return this.formCourseIn.get('id');
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.formCourseIn.valid) {
      if (this.idField.value) {
        this.updateCourse(this.formCourseIn.value);
      } 
    } else {
      this.formCourseIn.markAllAsTouched();
    }
  }


  filterStatus(event) {
    const filtered: any[] = [];
    const query = event.query;
    for (const type of this.status) {
      if (type.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(type);
      }
    }
    this.filteredStatus = filtered;
  }

// Save in backend
updateCourse(course: Course) {
    this.spinnerService.show();
    this.cecyHttpService.update('course/approval/' + course.id, { course })
        .subscribe(response => {
            this.spinnerService.hide();
          //  this.messageService.success(response);
            this.saveCourse(response['data']);
            this.displayOut.emit(false);
        }, error => {
            this.spinnerService.hide();
           // this.messageService.error(error);
        });
}

  saveCourse(course: Course) {
    const index = this.coursesIn.findIndex(element => element.id === course.id);
    if (index === -1) {
      this.coursesIn.push(course);
    } else {
      this.coursesIn[index] = course;
    }
    this.coursesOut.emit(this.coursesIn);
  }

  resetFormCourse() {
    this.formCourseIn.reset();
  }

  markAllAsTouchedFormCourse() {
    this.formCourseIn.markAllAsTouched();
  }
  getStatus() {
    const params = new HttpParams().append('type', 'STATUS_TYPE');
    this.AppHttpService.getCatalogues(params).subscribe(response => {
      this.status = response['data'];
      console.log(response)
    }, error => {
      console.log(error);
    });
  }
}
