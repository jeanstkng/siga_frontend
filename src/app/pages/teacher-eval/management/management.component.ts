import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/models/app/teacher';
import { DetailEvaluation } from 'src/app/models/teacher-eval/detail-evaluation';
import { Evaluation } from 'src/app/models/teacher-eval/evaluation';
import { TeacherEvalHttpService } from 'src/app/services/teacher-eval/teacher-eval-http.service';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  teachers: Teacher [];
  teacher : Teacher;
  evaluations : Evaluation [];
  evaluation : Evaluation;
  total1 : number;
  total2 : number;
  totalDocencia : any;
  totalGestion : any;
  extraCredits : any;
  investigacion: any;
  displayModal: boolean;
 


  showModalDialog() {
    this.displayModal = true;
  }




  

  constructor(
    private teacherEval: TeacherEvalHttpService,
    private router: Router
  ) { 
      this.teachers = [];
      this.evaluations = [];
  }




 pdf(){
  this.router.navigate(['teacher-eval/generate-pdf']);
 }

 credits(){
  this.router.navigate(['teacher-eval/extra-credit']);
 }

 investigation(){
  this.router.navigate(['teacher-eval/investigation']);
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

  limpiar() {
    window.location.reload();
  }

  getEvaluations(id : string){
    this.teacherEval.getEvaluation(id).subscribe(
      response => {
        const datos =  this.evaluations = response['data'];
        console.log(datos)

          this.extraCredits = parseInt(datos[0].extraCredits)
          console.log(this.extraCredits)

          this.investigacion = (parseFloat(datos[0].investigation))
          console.log(this.investigacion)

         this.total1 = (parseInt(datos[0].percentage)+parseInt(datos[1].percentage)
                    +parseInt(datos[2].percentage)+parseInt(datos[3].percentage))
                    
        console.log(this.total1)

        this.total2 = (parseInt(datos[4].percentage)+parseInt(datos[5].percentage)
        +parseInt(datos[6].percentage)+parseInt(datos[7].percentage))

        console.log(this.total2)
        
        const totalDocentee = (this.total1 * 0.7)
        this.totalDocencia = totalDocentee
        console.log(totalDocentee)

        const totalGestion = (this.total2 * 0.25)
        this.totalGestion = totalGestion



      }
      
    )
  }



}
