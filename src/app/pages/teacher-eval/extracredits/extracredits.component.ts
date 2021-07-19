import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/models/app/teacher';
import { ExtraCredit } from 'src/app/models/teacher-eval/extra-credit';
import { TeacherEvalHttpService } from 'src/app/services/teacher-eval/teacher-eval-http.service';
import { MessageService as MessagePnService } from 'primeng/api';


@Component({
  selector: 'app-extracredits',
  templateUrl: './extracredits.component.html',
  styleUrls: ['./extracredits.component.scss']
})
export class ExtracreditsComponent implements OnInit {

  teachers: Teacher[];
  teacher: Teacher;
  extraCredits: ExtraCredit[];
  extraCredit : ExtraCredit;
  diploma_yavirac: any;
  title_fourth_level: any;
  OCS_member: any;
  governing_processes: any;
  process_nouns: any;
  support_processes: any
  total: any;

  // credits : FormGroup;

  displayModal: boolean;

  showModalDialog() {
    this.displayModal = true;
  }

  constructor(
    private teacherEval: TeacherEvalHttpService,
    private router: Router,

  ) {
    this.teachers = [];
    this.extraCredits = [];
  }

  ngOnInit(): void {
    this.getTeachers();
    this.getExtraCredits();

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

  getExtraCredits(){
    this.teacherEval.getExtraCredit('credit/credit')
      .subscribe(response => {
        this.extraCredits = response['data'];
        console.log(response)
      },
      
        (error) => console.log('error')
      );
  }

  addCredits(id: string) {


      this.total = ( this.diploma_yavirac + this.title_fourth_level + this.OCS_member + this.governing_processes + this.process_nouns + this.support_processes);
      console.log(this.total)
      let data = {
        "credit": {
          "diploma_yavirac": this.diploma_yavirac,
          "title_fourth_level": this.title_fourth_level,
          "OCS_member": this.OCS_member,
          "governing_processes": this.governing_processes,
          "process_nouns": this.process_nouns,
          "support_processes": this.support_processes,
          "total": this.total
        }
      }
      this.teacherEval.addExtraCredit(id, data)
        .subscribe(response => {
          console.log(data)
          alert("Creado Con Exito ")
          window.location.reload();
        }
        ), error => {
          console.log(error);
        }
  }

  deleteCredit(id : string){
    this.teacherEval.deleteCredit(id).
    subscribe(response => {
      console.log(response)
      alert("Eliminado Con Exito ")
      window.location.reload();
    }), error => {
      console.log(error);
    }
  
  }

}
