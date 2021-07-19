import { Component, OnInit } from '@angular/core';
// services
import { CecyHttpService } from 'src/app/services/cecy/cecy-http.service';
import { AppService } from 'src/app/services/app/app.service';
// http services
import { HttpParams } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
// models
import { Planification } from '../../../models/cecy/Planification';
import { Catalogue } from 'src/app/models/app/catalogue';
import { Course } from '../../../models/cecy/Course';
import { User } from '../../../models/auth/user';

@Component({
  selector: 'app-planification',
  templateUrl: './planification.component.html',
  styleUrls: ['./planification.component.css']
})
export class PlanificationComponent implements OnInit {

// planificaciones
  planifications: Planification[];
  planification : Planification[];
// cursos
  courses: any;
  filteredCourses: any[];
// usuarios
  users: any;
  filteredUsers: any[];
// status
  status: Catalogue[];
  filteredStatus: any[];

  showDialog : boolean = false;
  es_date: Date;
  cols: any[];

  constructor( 
    private cecyHttpServices:CecyHttpService,
    private AppHttpService: AppService,
    private config: PrimeNGConfig,
    ) 
    {
      this.getPlanification();
      this.getCourse();
      this.getTeacher();
      this.getStatus()
    }

  
  ngOnInit(): void {
    this.cols = [
      {field: "id", header: "Planificación"},
      {field: "status_id", header: "Estado"},
      {field: "needs", header: "Detalles"},
    ];
    this.config.setTranslation( {
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar',
      weekHeader: 'Sm'
    });
  }

  openAdd() {
    this.planification = [];
    this.showDialog = true
    console.log('se abrió')
  }

  close() {
    this.showDialog = false
  }

// llamada de los cursos existentes
  getCourse() {
    this.cecyHttpServices.get("course/all").subscribe(
      response=>{this.courses=response["data"];
    },error=>{
      console.log(error);
    })
  }
  searchCourse(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.courses.length; i++) {
      let cours = this.courses[i];
      if (cours.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(cours);
      }
    }
    this.filteredCourses = filtered;
  }

// llamada del maestro responsable
  getTeacher() {
    this.cecyHttpServices.get("course/responsables").subscribe(
      response=>{this.users=response["data"];
    },error=>{
      console.log(error);
    })
  }
  searchTeacher(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.users.length; i++) {
      let user = this.users[i];
      if (user.full_name.toUpperCase().indexOf(query.toUpperCase() ) == 0) {
        filtered.push(user);
      }
    }
    this.filteredUsers = filtered;
  }

// llamada del status
  getStatus() {
    const params = new HttpParams().append('type','STATUS_TYPE');
    this.AppHttpService.getCatalogues(params).subscribe(response => {
      this.status = response['data'];
      console.log(this.status)
    }, error => {
      console.log(error);
    });
  }

  searchStatus(event) {
    const filtered: any[] = [];
    const query = event.query;
    for (const type of this.status) {
      if (type.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(type);
      }
    }
    this.filteredStatus = filtered;
  }

// llamada de las planificaciones existentes
  getPlanification() {
    this.cecyHttpServices.get("planifications").subscribe(
      response=>{this.planifications=response["data"];
    },error=>{
      console.log(error);
    })
  }

  savePlanification() {
    console.log('Ejecutando el guardado jeje', )
  }
}
