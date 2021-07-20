import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { CommunityService } from '../../../../services/community/community.service';
import { Catalogue } from '../../../../models/app/models.index';
import { debounceTime } from 'rxjs/operators';
import { FormsComponent } from '../form.component';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/community/project';
import { MessageService } from 'primeng/api';
import { Role } from '../../../../models/auth/role';
import { AppService } from '../../../../services/app/app.service';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
    selector: 'app-proyecto',
    templateUrl: './project-info.component.html',
    providers: [MessageService]
})
export class ProjectInfoComponent implements OnInit {
    // variables de comprobante
    project: Project;
    url: any = this.router.parseUrl(this.router.url).root.children.primary.segments;
    comprobante = true;
    // VARIABLES FORM CONTROL
    projectForm: FormGroup;
    role: Role;
    rol: any;
    // AUTOCOMPLETE COMBO
    assignedLines: SelectItem[];
    filtered: any[];
    careers: any[] = [];
    actCareers: any[];
    filteredCareers: SelectItem[];
    modalitys = '';
    veryDate = false;
    countries: any = [];

    // URLS
    urlcombo = 'careers';

    // valores externos
    value: 'hola mundo';

    constructor(private communityService: CommunityService,
                private formBuilder: FormBuilder,
                private router: Router,
                private messageService: MessageService,
                private appService: AppService,
                private authService: AuthService,
    ) {
        // this.role=JSON.parse(localStorage.getItem('role')) as Role;
        // this.rol={id:1, name:'persona de vincualacion', code""};
        // this.buildForm();

        //   this.getupdate();

        this.getLocations();
    }

    ngOnInit(): void {
        this.buildForm();
        this.getupdate();
        this.findCareers();
    }

    private buildForm() {
        this.projectForm = this.formBuilder.group({
            id: [null],
            code: [null, [Validators.maxLength(100), Validators.required]],
            title: [null, [Validators.maxLength(300), Validators.required]],
            date: [null],
            cycles: ['{\"properties\" : \"test\"}'],
            lead_time: [null],
            delivery_date: [null, Validators.required],
            start_date: [null, Validators.required],
            end_date: [null, Validators.required],
            description: [null, [Validators.maxLength(1000), Validators.required]],
            diagnosis: [null, [Validators.maxLength(300), Validators.required]],
            justification: [null, Validators.required],
            direct_beneficiaries: ['{"name" : "John Doe"}'],
            indirect_beneficiaries: ['{"name" : "Yavirac"}'],
            strategies: ['{"strategy" : "trabajo en equipo"}'],
            bibliografies: ['{"bibliography" : "wikipedia"}'],
            observations: ['{"observation" : "none"}'],
            send_quipux: ['{"code" : "quipux1"}'],
            receive_quipux: ['{"code" : "quipux2"}'],
            state: [true],

            // school_period: [null],
            career: [null],
            // coverage: [null],
            location: [null], // id parroquia
            // frequency: [null],
            status: [null],
            // created_by: [null],
        });
        this.projectForm.valueChanges
            .pipe(
                debounceTime(500)
            )
            .subscribe(value => {
                if (value.start_date && value.end_date) {
                    this.calculateleadTime(value.start_date, value.end_date);
                    if (value.lead_time) {
                        this.veryDate = true;
                    }
                }
                if (this.url.length === 2 && this.comprobante === true) {
                    this.comprobante = false;
                }
            });
    }

    getupdate() {
        const val = this.url[2];
        if (this.url.length === 3) {
            this.communityService.get('projects/' + val).subscribe(
                (response: any) => {
                    this.project = response.data[0];
                    console.log('carga de project info', response.data[0]);
                    this.updateForm(this.project);
                },
                error => {
                    this.router.navigate(['/community/forms']);
                    console.log(error);
                });
        } else {
            // console.log("no es para actualizar",this.projectForm.value);
        }
        // console.log(this.projects);
    }

    getLocations() {
        this.appService.get('countries').subscribe(
            response => {
                this.countries = response['data'];
            },
            error => {
                console.log(error);
            });
    }

    updateForm(project: Project): void {
        // console.log(project);
        this.projectForm.patchValue({
            id: project.id,
            title: project.title,
            code: project.code,
            date: project.date,
            cycles: project.cycles,
            lead_time: project.lead_time,
            delivery_date: new Date(project.delivery_date),
            start_date: new Date(project.start_date),
            end_date: new Date(project.end_date),
            description: project.description,
            diagnosis: project.diagnosis,
            justification: project.justification,
            direct_beneficiaries: project.direct_beneficiaries,
            indirect_beneficiaries: project.indirect_beneficiaries,
            strategies: project.strategies,
            bibliografies: project.bibliografies,
            observations: project.observations,
            send_quipux: project.send_quipux,
            receive_quipux: project.receive_quipux,
            location: project.location,
            career: project.career
        });

    }

    filterAssignedLines(event: any) {
        this.communityService.get(this.urlcombo).subscribe(
            response => {
                this.filtered = [];
                const query = event.query;
                response['assignedLine'].forEach(item => {
                    if (item.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                        this.filtered.push(item);
                    }
                });
                this.assignedLines = this.filtered;
            },
            error => {
                console.log(error);
            });
    }

    private findCareers(): void {
        this.communityService.get(this.urlcombo).subscribe(
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
        this.projectForm.patchValue({
            career: (this.projectForm.value['career']['id'])
        });
        this.modalitys = this.projectForm.value['modality'];
    }

    calculateleadTime(startDate, endDate) {
        if (startDate !== undefined && startDate.length !== 0
            && endDate !== undefined && endDate.length !== 0) {
            const start = this.transformDate(startDate);
            const end = this.transformDate(endDate);
            const leadTime = end - start;
            const months = (leadTime / (1000 * 60 * 60 * 24)) / 30;
            this.projectForm.controls['lead_time'].setValue(Math.trunc(months));
        }
    }

    transformDate(date: Date) {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        const stringDate = year + '-' + month + '-' + day;
        const endDate = new Date(stringDate);
        return endDate.getTime();
    }

    coanvertir(date: Date) {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        const stringDate = day + '/' + month + '/' + year;
        return stringDate;
    }

    create() {
        let formulario: any = { project: this.projectForm.value };
        formulario.project.date = new Date(Date.now()).toDateString();
        formulario.project.start_date = (formulario.project.start_date as Date).toDateString();
        formulario.project.end_date = (formulario.project.end_date as Date).toDateString();

        formulario = {...formulario, career: formulario.project.career, location: formulario.project.location};
        delete formulario.project.career;
        delete formulario.project.location;
        console.log(formulario);

        this.communityService.post('projects', formulario).subscribe(
            (response: any) => {
                const value = response;
                console.log(value);
                this.projectForm.patchValue({
                    id: value.id
                });
                this.messageService.add({
                    severity: 'info',
                    summary: 'Se ha guardado',
                    detail: 'Los documentos para la vinculación se están elaborando'
                });
                this.router.navigate(['/community/forms/' + value.id]);
                this.getupdate();
            }, error => {
                console.log(error.error);
            });

    }

    update() {
        let formulario: any = { project: this.projectForm.value };
        formulario.project.date = new Date(Date.now()).toDateString();
        formulario.project.start_date = (formulario.project.start_date as Date).toDateString();
        formulario.project.end_date = (formulario.project.end_date as Date).toDateString();

        formulario = {...formulario, career: formulario.project.career, location: formulario.project.location};
        delete formulario.project.career;
        delete formulario.project.location;

        this.communityService.put(`projects/${formulario.project.id}`, formulario).subscribe(
            (response: any) => {
                const value = response;
                // console.log(value);
                this.getupdate();
            }, error => {
                console.log(error.error);
            });
        this.vCRUD('update');
    }

    vCRUD(type: string) {
        if (type === 'update') {
            this.messageService.add({
                severity: 'success',
                summary: 'Actualizado',
                detail: 'Se a actuzalizado su contenido'
            });
        }
        if (type === 'create') {
            this.messageService.add({
                severity: 'info',
                summary: 'Guardado',
                detail: 'Se a guardado su contenido'
            });
        }
    }
}

