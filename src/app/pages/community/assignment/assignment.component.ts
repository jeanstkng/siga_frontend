import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/auth/user';
import { Assignment } from 'src/app/models/community/assignment';
import { Paginator } from 'src/app/models/setting/paginator';
import { CommunityHttpService } from 'src/app/services/community/community-http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'src/app/services/app/message.service';
import { HttpParams } from '@angular/common/http';
import { Career } from 'src/app/models/app/career';
import { CommunityService } from '../../../services/community/community.service';
import { SelectItem } from 'primeng/api';
import { AuthService } from '../../../services/auth/auth.service';



@Component({
  selector: 'community-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {

  paginator: Paginator;
  assignment: Assignment;
  formAssignment: FormGroup;
  user: User;
  career: Career;
  careers: any[] = [];
  actCareers: any[];
  filteredCareers: SelectItem[];
  actUser: User;

  constructor(private communityHttpService: CommunityHttpService,
              private spinnerService: NgxSpinnerService,
              public messageService: MessageService,
              private formBuilder: FormBuilder,
              private communityService: CommunityService,
              private authService: AuthService) {

    this.paginator = { current_page: 1, per_page: 2 };
  }

  ngOnInit(): void {

    this.getAssignment(this.paginator);
    this.findCareers();

    this.buildFormAssignment();
    this.initializeUser();
  }

  private initializeUser() {
    this.actUser = this.authService.getAuth();
    this.formAssignment.patchValue({user: this.actUser});
  }

  // Formulario solicitud asignacion vinculacion
  buildFormAssignment() {
    this.formAssignment = this.formBuilder.group({
      user: this.formBuilder.group({
        first_name: [null, [Validators.required]],
        second_name: [null, [Validators.required]],
        first_lastname: [null, [Validators.required]],
        second_lastname: [null, [Validators.required]],
        identification: [null, [Validators.required]],
        phone: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
      }),
      career: this.formBuilder.group({
        career: [null, [Validators.required]],
      }),
      date_request: [null, [Validators.required]],
      level: [null, [Validators.required]],
    });
    console.log(this.formAssignment);
  }

  onSubmit() {
    //  mostrar registros
    if (this.formAssignment.valid) {
      this.getAssignment(this.formAssignment.value);
    } else {
      this.formAssignment.markAllAsTouched();

    }

    // crear registro
    if (this.formAssignment.valid) {
      // this.storeAssignment(this.formAssignment.value);
    } else {
      this.formAssignment.markAllAsTouched();

    } /**/

  }

  private findCareers(): void {
    this.communityService.get('careers').subscribe(
      response => {
        this.careers = response['data'];
      },
      error => {
        console.log(error);
      });
  }

  findCareer(event: any) {
    this.actCareers = [];
    const query = event.query;
    this.careers.forEach(item => {
      if (item.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        this.actCareers.push(item);
      }
    });
    this.filteredCareers = this.actCareers;
  }

  getAssignment(paginator: Paginator) {
    const userId = this.authService.getAuth().id;
    this.spinnerService.show();
    const params = new HttpParams()
      .append('page', paginator.current_page.toString())
      .append('per_page', paginator.per_page.toString());
    this.communityHttpService.get(`assignments/get-assignment?user_id=${userId}`, params).subscribe(
      response => {
        this.spinnerService.hide();
        const formVal = this.handleFormVal(response['data']);
        this.formAssignment.patchValue(formVal);
        this.assignment = response['data'];
        this.paginator = response as Paginator;
      }, error => {
        this.spinnerService.hide();
        this.messageService.error(error);
      });

  }

  private handleFormVal(formData: any): any {
    const handledObject = {};
    handledObject['date_request'] = new Date(formData.date_request);
    handledObject['level'] = formData.level;
    handledObject['career'] = {career: undefined};
    handledObject['career']['career'] = formData.career;
    handledObject['user'] = formData.user;
    return handledObject;
  }

  storeAssignment() {  // revisar metodo de guardar y el boton
    this.formAssignment.value.user.id = this.authService.getAuth().id;
    const params = new HttpParams();
    this.communityHttpService.store('assignment', this.formAssignment.value, params).subscribe(
      response => {
        this.spinnerService.hide();
        this.formAssignment.patchValue(response['data']);
        this.assignment = response['data'];
        this.paginator = response as Paginator;
      }, error => {
        this.spinnerService.hide();
        this.messageService.error(error);
      });
  }

  // campos editables de fk portfolio
  get firstName() {
    return this.formAssignment['controls']['user'].get('first_name');
  }
  get secondName() {
    return this.formAssignment['controls']['user'].get('second_name');
  }
  get firstLastname() {
    return this.formAssignment['controls']['user'].get('first_lastname');
  }
  get secondLastname() {
    return this.formAssignment['controls']['user'].get('second_lastname');
  }
  get identification() {
    return this.formAssignment['controls']['user'].get('identification');
  }
  get phone() {
    return this.formAssignment['controls']['user'].get('phone');
  }
  get email() {
    return this.formAssignment['controls']['user'].get('email');
  }
  // campos editables de fk career
  get name() {
    return this.formAssignment['controls']['career'].get('career');
  }

  // campos propios de la tabla.

  get dateRequest() {
    return this.formAssignment.get('date_request');
  }

  get level() {
    return this.formAssignment.get('level');
  }

}

