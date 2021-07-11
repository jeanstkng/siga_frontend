import { Professional } from '../../../../../models/job-board/professional';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from '../../../../shared/services/message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { JobBoardHttpService } from '../../../../../services/job-board/job-board-http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService as MessagePnService } from 'primeng/api';
import { SharedService } from '../../../../shared/services/shared.service';
import { AppHttpService } from '../../../../../services/app/app-http.service';
import { User } from 'src/app/models/auth/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-curriculum-form',
    templateUrl: './curriculum-form.component.html',
    styleUrls: ['./curriculum-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

    @Input() formCurriculumIn: FormGroup;
    @Output() displayOut = new EventEmitter<boolean>();
    auth: User;

    constructor(
        private formBuilder: FormBuilder,
        public messageService: MessageService,
        private messagePnService: MessagePnService,
        private spinnerService: NgxSpinnerService,
        private appHttpService: AppHttpService,
        private sharedService: SharedService,
        private jobBoardHttpService: JobBoardHttpService,
        private authServices: AuthService,
    ) {
        this.auth = this.authServices.getAuth();
    }

    ngOnInit() {
        //this.getProfessional();
    }

    get identificationField() {
        return this.formCurriculumIn['controls']['user'].get('identification');
    }

    get emailField() {
        return this.formCurriculumIn['controls']['user'].get('email');
    }

    get firstNameField() {
        return this.formCurriculumIn['controls']['user'].get('first_name');
    }

    get secondNameField() {
        return this.formCurriculumIn['controls']['user'].get('second_name');
    }

    get firstLastnameField() {
        return this.formCurriculumIn['controls']['user'].get('first_lastname');
    }

    get secondLastnameField() {
        return this.formCurriculumIn['controls']['user'].get('second_lastname');
    }

    get phoneField() {
        return this.formCurriculumIn['controls']['user'].get('phone');
    }

    get isTravelField() {
        return this.formCurriculumIn.get('is_travel');
    }

    get isDisabilityField() {
        return this.formCurriculumIn.get('is_disability');
    }

    get isFamiliarDisabilityField() {
        return this.formCurriculumIn.get('is_familiar_disability');
    }

    get identificationFamiliarDisabilityField() {
        return this.formCurriculumIn.get('identification_familiar_disability');
    }

    get isCatastrophicIllnessField() {
        return this.formCurriculumIn.get('is_catastrophic_illness');
    }

    get isFamiliarCatastrophicIllnessField() {
        return this.formCurriculumIn.get('is_familiar_catastrophic_illness');
    }

    get aboutMeField() {
        return this.formCurriculumIn.get('about_me');
    }

    onSubmit() {
        if (this.formCurriculumIn.valid) {
            this.updateProfessional(this.formCurriculumIn.value);
        } else {
            this.formCurriculumIn.markAllAsTouched();
        }
    }

    updateProfessional(professional: Professional) {
        this.spinnerService.show();
        this.jobBoardHttpService.update('professional/update', { professional })
            .subscribe(response => {
                this.spinnerService.hide();
                this.messageService.success(response);
                console.log(response);
                this.displayOut.emit(false);
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
    }

    // getProfessional() {
    //     this.spinnerService.show();
    //     this.jobBoardHttpService.get('professional/show')
    //         .subscribe(response => {
    //             this.spinnerService.hide();
    //             this.formCurriculumIn.patchValue(response['data']);
    //             console.log(response);
    //         }, error => {
    //             this.spinnerService.hide();
    //             this.messageService.error(error);
    //         });
    // }

    markAllAsTouchedFormProfessional() {
        this.formCurriculumIn.markAllAsTouched();
    }

    validateIsDisability() {
        // if (campoDiscapacidad == true) {
        //     this.formCurriculumIn.setValidators(Validators.required);
        // }else{
        //     this.formCurriculumIn.setValidators(null);
        // }
    }
}
