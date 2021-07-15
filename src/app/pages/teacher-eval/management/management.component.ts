import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/models/app/teacher';
import { DetailEvaluation } from 'src/app/models/teacher-eval/detail-evaluation';
import { TeacherEvalHttpService } from 'src/app/services/teacher-eval/teacher-eval-http.service';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  teachers: Teacher [];
  teacher : Teacher;
  diploYav : number;
  cuarto : number;
  ocs : number;
  proGob : number;
  sustantivos : number;
  apoyo : number;
  rta : number;
  creaditoExtra : any[] = [];
  valor5 : 0; 
  notaFinal : number;
  investigacion: boolean;
  displayModal: boolean;
  valor : any [];


  showModalDialog() {
    this.displayModal = true;
  }

  showModalInvestigacion() {
    this.investigacion = true;
  }


  sumarPuntosExtra() {
   
      this.rta = this.diploYav + this.cuarto + this.ocs + this.proGob + this.sustantivos + this.apoyo;
      this.creaditoExtra.push( this.rta );
      console.log(this.creaditoExtra);
  }

  /*masCinco(event){
    if(event.keyCode === 13)
    {
      
      this.notaFinal = this.valor5;
      console.log(this.notaFinal)
    }
    
  }*/
  

  constructor(
    private teacherEval: TeacherEvalHttpService,
    private router: Router
  ) { 
      this.teachers = [];
  }

  name = 'Angular';
  total: number;


 pdf(){
  this.router.navigate(['teacher-eval/generate-pdf']);
 }

  ngOnInit(): void {
    this.getTeachers();
  }


  /*  Recuperar Docentes */
  getTeachers() {
    this.teacherEval.getTeacher('evaluation/teachers')
    .subscribe(response  =>{
      this.teachers = response['data'];
      console.log(response )
    },
      () => console.log('error')
      );
  }




}
