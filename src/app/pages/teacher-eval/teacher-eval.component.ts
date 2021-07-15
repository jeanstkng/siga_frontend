import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'src/app/services/app/message.service';
import { TeacherEvalHttpService } from 'src/app/services/teacher-eval/teacher-eval-http.service';

@Component({
  selector: 'app-teacher-eval',
  templateUrl: './teacher-eval.component.html',
  styleUrls: ['./teacher-eval.component.scss']
})
export class TeacherEvalComponent implements OnInit {

  constructor(public messageService: MessageService,
              private spinnerService: NgxSpinnerService,
              private teacherEvalHttpService: TeacherEvalHttpService) {
                this.resetPaginator()
              }

  resetPaginator() {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }
  // hola
}
