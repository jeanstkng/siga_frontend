import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Company } from 'src/app/models/job-board/company';
import { MessageService } from '../../../../shared/services/message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { JobBoardHttpService } from '../../../../../services/job-board/job-board-http.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Catalogue } from '../../../../../models/app/catalogue';
import { MessageService as MessagePnService } from 'primeng/api';
import { SharedService } from '../../../../shared/services/shared.service';
import { AppHttpService } from '../../../../../services/app/app-http.service';
import { User } from 'src/app/models/auth/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { isAsciiHexDigit } from 'codelyzer/angular/styles/chars';

@Component({
    selector: 'app-profile-form',
    templateUrl: './profile-form.component.html',
    styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

    @Input() formProfessionalIn: FormGroup;
    @Output() displayOut = new EventEmitter<boolean>();
    identificationTypes: Catalogue[];
    personType: Catalogue[];
    activityTypes: Catalogue[];
    types: Catalogue[];
    filteredTypes: any[];
    filteredActivityTypes: any[];
    filteredpersonTypes: any[];
    filteredidentificationTypes: any[];
    formAddress: FormGroup;
    formLocation: FormGroup;
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
        this.getCompany();
        this.getActivityTypes();
        this.getPersonType();
        this.getTypes();
    }

    get identificationField() {
        return this.formProfessionalIn['controls']['user'].get('identification');
    }

    get emailField() {
        return this.formProfessionalIn['controls']['user'].get('email');
    }

    get firstNameField() {
        return this.formProfessionalIn['controls']['user'].get('first_name');
    }
    get secondNameField() {
        return this.formProfessionalIn['controls']['user'].get('second_name');
    }
    get firstLastnameField() {
        return this.formProfessionalIn['controls']['user'].get('first_lastname');
    }
    get secondLastnameField() {
        return this.formProfessionalIn['controls']['user'].get('second_lastname');
    }

    get phoneField() {
        return this.formProfessionalIn['controls']['user'].get('phone');
    }

    get tradeNameField() {
        return this.formProfessionalIn.get('trade_name');
    }

    get prefixField() {
        return this.formProfessionalIn.get('prefix');
    }

    get comercialActivitiesField() {
        return this.formProfessionalIn.get("comercial_activities") as FormArray;
    }

    addComercialActivity(data = null) {
        this.comercialActivitiesField.push(this.formBuilder.control(data, Validators.required));
    }

    removeComercialActivity(index) {
        this.comercialActivitiesField.removeAt(index);
    }

    get webField() {
        return this.formProfessionalIn.get('web');
    }

    get typeField() {
        return this.formProfessionalIn.get('type');
    }

    get activityTypesField() {
        return this.formProfessionalIn.get('activity_type');
    }

    get personTypeField() {
        return this.formProfessionalIn.get('person_type');
    }

    get isTravelField() {
        return this.formProfessionalIn.get('is_travel');
    }

    get isDisabilityField() {
        return this.formProfessionalIn.get('is_disability');
    }

    get isFamiliarDisabilityField() {
        return this.formProfessionalIn.get('is_familiar_disability');
    }

    get identificationFamiliarDisabilityField() {
        return this.formProfessionalIn.get('identification_familiar_disability');
    }

    get isCatastrophicIllnessField() {
        return this.formProfessionalIn.get('is_catastrophic_illness');
    }

    get isFamiliarCatastrophicIllnessField() {
        return this.formProfessionalIn.get('is_familiar_catastrophic_illness');
    }

    get aboutMeField() {
        return this.formProfessionalIn.get('about_me');
    }

    onSubmit() {
        if (this.formProfessionalIn.valid) {
            this.updateCompany(this.formProfessionalIn.value);
        } else {
            this.formProfessionalIn.markAllAsTouched();
        }
    }

    updateCompany(company: Company) {
        this.spinnerService.show();
        this.jobBoardHttpService.update('company/update', { company })
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

    getCompany() {
        this.spinnerService.show();
        this.jobBoardHttpService.get('company/show')
            .subscribe(response => {
                this.spinnerService.hide();
                this.formProfessionalIn.patchValue(response['data']);
                this.comercialActivitiesField.removeAt(0);
                for (const comercialActivity of response['data']['comercial_activities']) {
                    console.log(comercialActivity);
                    this.addComercialActivity(comercialActivity);
                }
                console.log(response);
                console.log(this.comercialActivitiesField.value);
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
    }

    markAllAsTouchedFormCompany() {
        this.formProfessionalIn.markAllAsTouched();
    }

    getTypes() {
        const params = new HttpParams().append('type', 'COMPANY_TYPE');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.types = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }

    getPersonType() {
        const params = new HttpParams().append('type', 'COMPANY_PERSON_TYPE');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.personType = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }

    getActivityTypes() {
        const params = new HttpParams().append('type', 'COMPANY_ACTIVITY_TYPE');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.activityTypes = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }

    // Filter type of companies
    filterTypes(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const type of this.types) {
            if (type.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(type);
            }
        }
        this.filteredTypes = filtered;
    }

    filterIdentificationType(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const type of this.identificationTypes) {
            if (type.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(type);
            }
        }
        this.filteredidentificationTypes = filtered;
    }

    filterPersonType(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const type of this.personType) {
            if (type.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(type);
            }
        }
        this.filteredpersonTypes = filtered;
    }

    filterActivityType(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const type of this.activityTypes) {
            if (type.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(type);
            }
        }
        this.filteredActivityTypes = filtered;
    }

    setFormLocation(event) {
        this.formLocation = event;
    }
}
