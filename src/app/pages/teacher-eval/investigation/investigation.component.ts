import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { Teacher } from 'src/app/models/app/teacher';
import { ExtraCredit } from 'src/app/models/teacher-eval/extra-credit';
import { Research } from 'src/app/models/teacher-eval/research';
import { TeacherEvalHttpService } from 'src/app/services/teacher-eval/teacher-eval-http.service';

@Component({
  selector: 'app-investigation',
  templateUrl: './investigation.component.html',
  styleUrls: ['./investigation.component.scss']
})
export class InvestigationComponent implements OnInit {

  teachers: Teacher[];
  teacher: Teacher;
  researchs : Research[];
  research : Research;
  inv_auto_eval : any;
  inv_pares : any;
  inv_coodinador : any;
  total : any;

  displayModal: boolean;

  showModalDialog() {
    this.displayModal = true;
  }


  constructor(
    private teacherEval: TeacherEvalHttpService,
    private router: Router,

  ) {
    this.teachers = [];
    this.researchs = [];
    
  }

  ngOnInit(): void {
    this.getTeachers();
    this.getResearchs();
  }


  getTeachers() {
    this.teacherEval.getTeacher('evaluation/teachers')
      .subscribe(response => {
        this.teachers = response['data'];
        console.log(response)

      },
        () => console.log('error')
      );
  }

  getResearchs() {
    this.teacherEval.getResearch('investigacion/research')
      .subscribe(response => {
        this.researchs = response['data'];
        console.log(response)
      },
      
      (error) => console.log('error'));
  }


  addResearchs(id : string){
    const autoEva = (this.inv_auto_eval * 0.20)
    console.log(autoEva)
    const cordinador = (this.inv_coodinador * 0.50)
    console.log(cordinador)
    const pares = (this.inv_pares * 0.30)
    console.log(pares)
    this.total = (autoEva + cordinador + pares)
    console.log(this.total)
   let data = {
      "research" : {
        "inv_auto_eval" : this.inv_auto_eval,
        "inv_coodinador" : this.inv_coodinador,
        "inv_pares" : this.inv_pares,
        "total" : this.total
      }
    }
    this.teacherEval.addResearch(id, data)
      .subscribe(response => {
        console.log(data)
        alert("Creado con Exito")
        window.location.reload();
      }
      ), error => {
        console.log(error);
      }
    
  }

  deleteResearch(id : string){
    this.teacherEval.deleteResearch(id)
      .subscribe(response => {
        console.log(response)
        alert("Eliminado con Exito")
        window.location.reload();
      }), error => {
        console.log(error);
      }

  }


}
