import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paginator } from '../../../../models/setting/paginator';
import { Planification } from 'src/app/models/cecy/Planification';
import { CecyHttpService } from 'src/app/services/cecy/cecy-http.service';
import { User } from 'src/app/models/auth/user';
import Swal from 'sweetalert2'
import { findIndex } from 'rxjs/operators';
import { element } from 'protractor';


@Component({
  selector: 'app-assignal',
  templateUrl: './assignal.component.html',
  styleUrls: ['./assignal.component.css']
})
export class AssignalComponent implements OnInit {

  paginator: Paginator;
  planifications: Planification[];
  flagPlanifications: boolean;
  formPlanification: FormGroup;
  users: User;
  idPlanification: number;

  display: boolean = false;//modal
  constructor(
    private cecyHttpService: CecyHttpService,
    private formBuilder: FormBuilder,
    ) {
    this.paginator = { current_page: 1, per_page: 5 };
    this.buildFormPlanification();
   }

  ngOnInit() {
    this.getPlanifications(this.paginator);
    this.getTutors(this.paginator)
  }

  //modal

  showDialog($id) {
      this.idPlanification = $id
      this.display = true;
  }

  getPlanifications(paginator: Paginator) {
    const params = new HttpParams() 
        .append('page', paginator.current_page.toString())
        .append('per_page', paginator.per_page.toString());
    this.flagPlanifications = true;
    this.cecyHttpService.get('course/planifications', params).subscribe(
        response => {
            this.flagPlanifications = false;
            this.planifications = response['data']['data'];
            console.log(this.planifications);
            this.paginator = response as Paginator;
        }, error => {
            this.flagPlanifications = false;
            console.log(error);
        });
}


//Get tutots

getTutors(paginator: Paginator) {
  const params = new HttpParams() 
      .append('page', paginator.current_page.toString())
      .append('per_page', paginator.per_page.toString());
  this.cecyHttpService.get('course/responsables', params).subscribe(
      response => {
          this.users = response['data'];
          console.log(this.users);
      }, error => {
          console.log(error);
      });
}

//Formulario 

buildFormPlanification() {
  this.formPlanification = this.formBuilder.group({
    responsable: [null, Validators.required],
  });
  console.log(this.formPlanification)

  this.formPlanification.valueChanges.subscribe(
    reponse=>{console.log(reponse)}
  )
}

//asignarTutor

CerrarModal(){
  this.display= false;
   
Swal.fire({
  title: 'Estas seguro de querer assignar el tutor?',
  text: "",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  denyButtonText:'Cancelar',
  confirmButtonText: 'Si, Asignar!'
}).then((result) => {
  if (result.isConfirmed) {

    this.AssignalTutor();
    Swal.fire(
      'Tutor Asignado!',
      'El tutor se asign correctamente.',
      'success'
    )
  }
})
}

AssignalTutor() {
  
  this.cecyHttpService.update('course/tutor-assignment/' + this.idPlanification, this.formPlanification.value)
      .subscribe(response => {
        //  this.messageService.success(response);
        
          let update = response['data'] 
   
          let index = this.planifications.findIndex(element => element['course_id'] === update[0]['course_id'])         
      
          this.planifications[index]['user']['full_name']  = update[0]['user']['full_name'] 
       
          this.formPlanification.reset();
          this.display=false
      }, error => {
        console.log(error)
        this.display=false

      });
}




}
