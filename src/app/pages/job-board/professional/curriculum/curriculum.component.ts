import { Catalogue } from 'src/app/models/app/catalogue';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paginator } from 'src/app/models/setting/paginator';
import { Professional } from 'src/app/models/job-board/professional';

@Component({
    selector: 'app-curriculum',
    templateUrl: './curriculum.component.html',
    styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit {

    formProfessional: FormGroup;
    // formCourse: FormGroup;
    professional: Professional;
    professionalDialog: boolean;
    // courseDialog: boolean;
    // course: Course;
    paginator: Paginator;

    constructor(private formBuilder: FormBuilder) {
        this.paginator = { current_page: 1, per_page: 3 };
    }

    ngOnInit(): void {
        this.buildFormProfessional();
    }

    //Formulario Professional//
    buildFormProfessional() {
        this.formProfessional = this.formBuilder.group({
            user: this.formBuilder.group({
                identification: [null, Validators.required],
                email: [null, Validators.required],
                first_name: [null, Validators.required],
                second_name: [null, Validators.required],
                first_lastname: [null, Validators.required],
                second_lastname: [null],
                phone: [null, Validators.required],
                birthdate: [null, Validators.required],
            }),
            catalogue: this.formBuilder.group({
                sex: [null, Validators.required],
            }),
            is_travel: [null, Validators.required],
            is_disability: [null, Validators.required],
            is_catastrophic_illness: [null, Validators.required],
            is_familiar_disability: [null, Validators.required],
            identification_familiar_disability: [null],
            is_familiar_catastrophic_illness: [null, Validators.required],
            about_me: [null, Validators.required],
        });
        console.log(this.formProfessional['controls']['user']);
    }
    // Build form course
    // buildFormCourse() {
    //     this.formCourse = this.formBuilder.group({
    //         id: [null],
    //         type: [null, Validators.required],
    //         institution: [null, Validators.required],
    //         certification_type: [null, Validators.required],
    //         area: [null, Validators.required],
    //         name: [null, Validators.required],
    //         description: [null, [Validators.required, Validators.minLength(10)]],
    //         start_date: [null, Validators.required],
    //         end_date: [null, Validators.required],
    //         hours: [null, Validators.required],
    //     });
    // }
}
