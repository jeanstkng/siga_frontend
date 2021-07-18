import { Component, OnInit } from '@angular/core';
import { TeacherEvalHttpService } from 'src/app/services/teacher-eval/teacher-eval-http.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherEvalService } from 'src/app/services/teacher-eval/teacher-eval.service';
import { HttpClient } from '@angular/common/http';
import { Estudiante } from 'src/app/models/teacher-eval/student';
import * as data from '../teacher-list/mock-teacher-list.json';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  student: Estudiante = new Estudiante();

  constructor(private http: HttpClient, 
    private formBuilder: FormBuilder,
    private teacherEvalService: TeacherEvalService,
    private teacherEvalHttpService: TeacherEvalHttpService,) { 

    this.student.nombreEstudiante = data.nombreEstudiante;
    this.student.maestros = data.maestros;
  
    }


    
  ngOnInit(): void {
    console.log(this.student);
  }

  
}
