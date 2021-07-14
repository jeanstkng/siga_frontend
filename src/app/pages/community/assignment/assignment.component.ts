import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/auth/user';
import { Assignment } from 'src/app/models/community/assignment';
import { Paginator } from 'src/app/models/setting/paginator';
import { CommunityHttpService } from 'src/app/services/community/community-http.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { MessageService } from 'src/app/services/app/message.service';
import { HttpParams } from '@angular/common/http';





@Component({
  selector: 'community-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {
  
  paginator: Paginator;
    assignments: Assignment[];
    formAssignment: FormGroup;
    user : User;

  constructor(private communityHttpService: CommunityHttpService,
    private spinnerService: NgxSpinnerService,
    public messageService: MessageService,
    private formBuilder: FormBuilder) {

      this.paginator = { current_page: 1, per_page: 2 };
     }

  ngOnInit(): void  {

    this.getAssignment(this.paginator);
    this.buildFormAssignment();

  }
  // campos editables de fk
   get firstName(){
    return this.formAssignment['controls']['user'].get('academic_period');
   }
   get secondName(){
    return this.formAssignment['controls']['user'].get('second_name');
   }
   get firstLastname(){
    return this.formAssignment['controls']['user'].get('first_lastname');
   }
   get secondLastname(){
    return this.formAssignment['controls']['user'].get('second_lastname');
   }
   get identification(){
    return this.formAssignment['controls']['user'].get('formAssignment');
   }
   get phone(){
    return this.formAssignment['controls']['user'].get('academic_period');
   }
   get email(){
    return this.formAssignment['controls']['user'].get('academic_period');
   }

  // campos propios de la tabla.
   get academicPeriod(){
    return this.formAssignment.get('academic_period');
   }
   get dateRequest(){
    return this.formAssignment.get('data_request');
   } 
   get level(){
    return this.formAssignment.get('level');
   }

// Formulario solicitud asignacion vinculacion
buildFormAssignment(){
    this.formAssignment = this.formBuilder.group({
        user : this.formBuilder.group({
            first_name:[null, [Validators.required ]],
            second_name:[null, [Validators.required ]],
            first_lastname:[null, [Validators.required ]],
            second_lastname:[null, [Validators.required ]],
            identification:[null, [Validators.required ]], 
            phone:[null, [Validators.required ]],
            email:[null, [Validators.required ]],
        }),
        academic_period:[null, [Validators.required ] ],
        date_request:[null, [Validators.required ]],
        level:[null, [Validators.required ]],
    });
     console.log(this.formAssignment['controls']['user']);
    }


    onSubmit(){
      if (this.formAssignment.valid){
        this.getAssignment(this.formAssignment.value);
        } else {
          this.formAssignment.markAllAsTouched();

        }
    }
     // 
     
      getAssignment(paginator: Paginator) {
        this.spinnerService.show();
        const params = new HttpParams()
            .append('page', paginator.current_page.toString())
            .append('per_page', paginator.per_page.toString());

        
        this.communityHttpService.get('assignment', params).subscribe(
            response => {
                this.spinnerService.hide();
               this.formAssignment.patchValue(response['data']);
               this.assignments = response['data'];
               this.paginator = response as Paginator;
                
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
                


                
            });
            
}

}

