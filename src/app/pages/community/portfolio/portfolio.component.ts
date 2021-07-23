import { Component, OnInit, ViewChild } from '@angular/core';
import { CommunityHttpService } from 'src/app/services/community/community-http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from '../../../services/app/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommunityService } from '../../../services/community/community.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Institution } from '../../../models/app/institution';
import { SelectItem } from 'primeng/api';
import { User } from '../../../models/auth/models.index';
import { saveAs } from 'file-saver';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  institute: Institution;
  firstDocForm: FormGroup;
  secondDocForm: FormGroup;
  vinculationRequestForm: FormGroup;
  careers: any[] = [];
  actCareers: any[];
  filteredCareers: SelectItem[];
  projects: any[] = [];
  actProjects: any[];
  filteredProjects: SelectItem[];
  actUser: User;
  private resMsg = {msg: {summary: 'PDF Generado', detail: 'ya puedes descargar tu documento'}};

  constructor(
              private communityHttpService: CommunityHttpService,
              private spinnerService: NgxSpinnerService,
              public messageService: MessageService,
              private formBuilder: FormBuilder,
              private communityService: CommunityService,
              private authService: AuthService,
  ) { }

  ngOnInit() {
    this.institute = this.authService.getInstitution();
    this.actUser = this.authService.getAuth();
    console.log(this.institute);

    this.buildForms();
    this.vinculationRequestForm.patchValue({ name: this.actUser.full_name, ci: this.actUser.identification });
    this.findCareers();
    this.findProjects();
  }

  getFirstDoc(): void {
    this.firstDocForm.patchValue({logo: this.institute.logo});
    this.spinnerService.show();
    const mediaType = 'application/pdf';

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');

    this.communityHttpService.postReceivePdf(`assignments/portfolio-first`, this.firstDocForm.value, headers)
      .subscribe(
        (data: Blob) => {
          const blob: any = new Blob([data], { type: mediaType });
          saveAs(blob, '1. CARTA COMPROMISO VINCULACION.pdf');

          this.spinnerService.hide();
          this.messageService.success(this.resMsg);
        },
        err => {
          this.spinnerService.hide();
          this.messageService.error(err);
        }
      );
  }

  getVinculationRequest(): void {
    this.vinculationRequestForm.patchValue({logo: this.institute.logo, institution: this.institute.name});
    this.spinnerService.show();
    const mediaType = 'application/pdf';

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');

    this.communityHttpService.postReceivePdf(`assignments/vinculation-request`, this.vinculationRequestForm.value, headers)
      .subscribe(
        (data: Blob) => {
          const blob: any = new Blob([data], { type: mediaType });
          saveAs(blob, 'SOLICITUD_CERTIFICADO.pdf');

          this.spinnerService.hide();
          this.messageService.success(this.resMsg);
        },
        err => {
          this.spinnerService.hide();
          this.messageService.error(err);
        }
      );
  }

  getSecondDoc(): void {
    this.secondDocForm.patchValue({logo: this.institute.logo});
    this.spinnerService.show();
    const mediaType = 'application/pdf';

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    // headers = headers.set('Content-Type', 'multipart/form-data');

    const formData: any = new FormData();
    formData.append('image', this.secondDocForm.get('image').value);
    formData.append('logo', this.secondDocForm.get('logo').value);
    formData.append('sender', this.secondDocForm.get('sender').value);
    formData.append('receiver', this.secondDocForm.get('receiver').value);
    formData.append('project', this.secondDocForm.get('project').value.title);
    formData.append('start_date', (this.secondDocForm.get('start_date').value as Date).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-'));
    formData.append('ci', this.secondDocForm.get('ci').value);
    formData.append('career', this.secondDocForm.get('career').value.name);
    formData.append('description', this.secondDocForm.get('description').value);

    this.communityHttpService.postReceivePdf(`assignments/portfolio-second`, formData, headers)
      .subscribe(
        (data: Blob) => {
          const blob: any = new Blob([data], { type: mediaType });
          saveAs(blob, '2. Informe de inicio de proyectos por parte del tutor del proyecto.pdf');
          this.spinnerService.hide();
          this.messageService.success(this.resMsg);
        },
        err => {
          this.spinnerService.hide();
          this.messageService.error(err);
        }
      );
  }

  buildForms() {
    this.firstDocForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      ci: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      career: [null, [Validators.required]],
      level: [null, [Validators.required]],
      entity: [null, [Validators.required]],
      institution: [null],
      logo: [null],
      teacher: [null, [Validators.required]],
    });

    this.secondDocForm = this.formBuilder.group({
      receiver: [null, [Validators.required]],
      sender: [null, [Validators.required]],
      project: [null, [Validators.required]],
      start_date: [null, [Validators.required]],
      ci: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      career: [null, [Validators.required]],
      description: [null, [Validators.required]],
      logo: [null],
      image: [null],
    });

    this.vinculationRequestForm = this.formBuilder.group({
      date: [null, [Validators.required]],
      name: [null, [Validators.required]],
      ci: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      career: [null, [Validators.required]],
      institution: [null],
      logo: [null],
    });
  }

  private findCareers(): void {
    this.communityService.get('careers').subscribe(
      response => {
        this.careers = response['data'];
      },
      error => {
        this.messageService.error(error);
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

  private findProjects(): void {
    this.communityService.get('projects').subscribe(
      response => {
        this.projects = response['data']['data'];
      },
      error => {
        this.messageService.error(error);
      });
  }

  findProject(event: any) {
    this.actProjects = [];
    const query = event.query;
    this.projects.forEach(item => {
      if (item.title.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        this.actProjects.push(item);
      }
    });
    this.filteredProjects = this.actProjects;
  }

  handleImageUpload(event, fileUpload) {
    // event.files == files to upload
    console.log(event);
    this.secondDocForm.patchValue({image: event.files[0] }) ;
    this.getSecondDoc();

    fileUpload.clear(); // this will clear your file
  }

}
