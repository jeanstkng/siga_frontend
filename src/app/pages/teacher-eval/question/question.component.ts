import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'src/app/services/app/message.service';
import { TeacherEvalHttpService } from 'src/app/services/teacher-eval/teacher-eval-http.service';
import { HttpParams } from '@angular/common/http';
import { Paginator } from 'src/app/models/setting/paginator';
import { Question } from 'src/app/models/teacher-eval/question';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherEvalService } from 'src/app/services/teacher-eval/teacher-eval.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Preguntas } from 'src/app/models/teacher-eval/preguntas';




@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
  formQuestion: FormGroup;
  paginator: Paginator;
  questions: Question[];

  selectedValue: string = 'val1';

  constructor(public messageService: MessageService,
    private formBuilder: FormBuilder,
    private teacherEvalService: TeacherEvalService,
    private teacherEvalHttpService: TeacherEvalHttpService,
    private radioButtonModule: RadioButtonModule) {
    this.paginator = { current_page: 1, per_page: 2 };
    this.questions = [];

  }
  city: string;

  selectedCategory: any = null;

  evaluacion: any[] = [{ name: '1', key: this.getRandom() }, { name: '2', key: this.getRandom() }, { name: '3', key: this.getRandom() }, { name: '4', key: this.getRandom() }];
  pregunta: any[];

  modelo: Preguntas[] = [];

  buildFormQuestion() {
    this.formQuestion = this.formBuilder.group({
      type: [null],
      status: [null],
      code: [null, Validators.required],
      order: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  get typeField() {
    return this.formQuestion.get('type');
  }
  get statusField() {
    return this.formQuestion.get('type');
  }
  get cpdeField() {
    return this.formQuestion.get('type');
  }
  get orderField() {
    return this.formQuestion.get('type');
  }
  get nameField() {
    return this.formQuestion.get('type');
  }
  get descriptionField() {
    return this.formQuestion.get('type');
  }


  getQuestions(paginator: Paginator) {
    const params = new HttpParams()
      .append('page', paginator.current_page.toString())
      .append('per_page', paginator.per_page.toString());

    this.teacherEvalHttpService.get('questions').subscribe(
      response => {
        this.questions = response['data'];
        this.paginator = response as Paginator;
        this.messageService.success(response);
      }, error => {
        this.messageService.error(error);
      }
    )
  }


  ngOnInit() {
    console.log("initttttttttttttt");

    this.buildFormQuestion();
    this.onTestWebService();


    this.selectedCategory = this.evaluacion[1];
  }


  //para traer las preguntas
  onTestWebService() {

    this.teacherEvalService.getInit(1).subscribe(result => {
      this.pregunta = result.data;
      this.getInicializarModelo();

    });
  }

  getRandom() {
    return Math.random();
  }


  getInicializarModelo() {
    let i:number = 0;
    console.log(this.pregunta);

    while (this.pregunta.length > i) {
      let inicializador: Preguntas = new Preguntas();

      // inicializador.valor=1;
      this.modelo.push(inicializador);
      i++;
      console.log(i);

    }
    console.log(this.modelo);
    console.log(this.modelo[0]);
  }

  getCheckSelect(){
    console.log(this.modelo);
    let int:number =0; 
    for (const iterator of this.modelo) {
      int += +iterator.valor;
      
      
    }
    console.log(int);
  }




}



