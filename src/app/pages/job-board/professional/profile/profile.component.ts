import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Company} from 'src/app/models/job-board/company';
import {Paginator} from 'src/app/models/setting/paginator';
import {Professional} from 'src/app/models/job-board/professional';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    formProfessional: FormGroup;
    company: Company;
    professional: Professional;
    professionalDialog: boolean;
    paginator: Paginator;

    constructor(private formBuilder: FormBuilder) {
        this.paginator = {current_page: 1, per_page: 3};

    }

    ngOnInit(): void {
        this.buildFormProfessional();
    }

    //Formulario de Empresa//
    buildFormProfessional() {
        this.formProfessional = this.formBuilder.group({
            user: this.formBuilder.group({
                identification: [null, Validators.required],
                email: [null, Validators.required],
                first_name: [null, Validators.required],
                second_name: [null, Validators.required],
                first_lastname: [null, Validators.required],
                second_lastname: [null, Validators.required],
                phone: [null, Validators.required],
            }),
            is_travel: [null, Validators.required],
            is_disability: [null, Validators.required],
            is_familiar_disability: [null, Validators.required],
            identification_familiar_disability: [null],
            is_catastrophic_illness: [null, Validators.required],
            is_familiar_catastrophic_illness: [null, Validators.required],
            about_me: [null, Validators.required],
        });
        console.log(this.formProfessional['controls']['user']);
    }
}
