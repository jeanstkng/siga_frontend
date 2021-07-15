import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../../../pages/shared/services/message.service';
import {MessageService as MessagePnService} from 'primeng/api';

import {NgxSpinnerService} from 'ngx-spinner';
import {JobBoardHttpService} from '../../../../../services/job-board/job-board-http.service';
import {AppHttpService} from '../../../../../services/app/app-http.service';
import {HttpParams} from '@angular/common/http';
import {Catalogue} from '../../../../../models/app/catalogue';
import { Offer } from 'src/app/models/job-board/offer';
import { Status } from 'src/app/models/app/Status';
import { add, format } from 'date-fns';

@Component({
    selector: 'app-offer-form',
    templateUrl: './offer-form.component.html',
    styleUrls: ['./offer-form.component.scss']
})

export class OfferFormComponent implements OnInit {
    @Input() formOfferIn: FormGroup;
    @Input() offersIn: Offer[];
    @Output() offersOut = new EventEmitter<Offer[]>();
    @Output() displayOut = new EventEmitter<boolean>();
    filteredContracTypes: any[];
    contractTypes: Catalogue[];
    filteredPositions: any[];
    positions: Catalogue[];
    filteredSectors: any[];
    sectors: Catalogue[];
    filteredWorkingDays: any[];
    workingDays: Catalogue[];
    filteredExperienceTimes: any[];
    experienceTimes: Catalogue[];
    filteredTrainingHours: any[];
    trainingHours: Catalogue[];
    filteredStatus: any[];
    status: Status[];

    // BORRAR 
    ofertaEjemplo: Offer;

    constructor(private formBuilder: FormBuilder,
                public messageService: MessageService,
                private spinnerService: NgxSpinnerService,
                private appHttpService: AppHttpService,
                private jobBoardHttpService: JobBoardHttpService,
                private messagePnService: MessagePnService) {
    }

    ngOnInit(): void {
        this.getContractType();
        this.getPosition();
        this.getSector();
        this.getWorkingDay();
        this.getExperienceTime();
        this.getTrainingHours();
        this.getStatus();
    }

    // Fields of Form
    get idField() {
        return this.formOfferIn.get('id');
    }
    get vacanciesField() {
        return this.formOfferIn.get('vacancies');
    }
    get aditionalInformationField() {
        return this.formOfferIn.get('aditional_information');
    }
    get contactNameField() {
        return this.formOfferIn.get('contact_name');
    }
    get contactEmailField() {
        return this.formOfferIn.get('contact_email');
    }
    get contactPhoneField() {
        return this.formOfferIn.get('contact_phone');
    }
    get contactCellphoneField() {
        return this.formOfferIn.get('contact_cellphone');
    }
    get remunerationField() {
        return this.formOfferIn.get('remuneration');
    }
    get contractTypeField() {
        return this.formOfferIn.get('contract_type');
    }
    get positionField() {
        return this.formOfferIn.get('position');
    }
    get sectorField() {
        return this.formOfferIn.get('sector');
    }
    get workingDayField() {
        return this.formOfferIn.get('working_day');
    }
    get experienceTimeField() {
        return this.formOfferIn.get('experience_time');
    }
    get trainingHoursField() {
        return this.formOfferIn.get('training_hours');
    }
    get locationField() {
        return this.formOfferIn.get('location');
    }
    get activitiesField() {
        return this.formOfferIn.get('activities') as FormArray;
    }
    get requirementsField() {
        return this.formOfferIn.get('requirements') as FormArray;
    }
    get startDateField() {
        return this.formOfferIn.get('start_date');
    }
    get endDateField() {
        return this.formOfferIn.get('end_date');
    }
    get statusField() {
        return this.formOfferIn.get('status');
    }

    addActivities(){
        this.activitiesField.push(this.formBuilder.control(null, Validators.required));
    }
    removeActivities(activity){
        this.activitiesField.removeAt(activity);
    }
    addRequirements(){
        this.requirementsField.push(this.formBuilder.control(null, Validators.required));
    }
    removeRequirements(requirement){
        this.requirementsField.removeAt(requirement);
    }

    onSubmit(event: Event, flag = false) {
        event.preventDefault();
        if (this.formOfferIn.valid) {
            if (this.idField.value) {
                this.updateOffer(this.formOfferIn.value);
            } else {
                this.storeOffer(this.formOfferIn.value, flag);
            }
        } else {
            this.formOfferIn.markAllAsTouched();
        }
    }

    // Get Catalogues 
    getContractType() {
        this.appHttpService.getCatalogues('OFFER_CONTRACT_TYPE').subscribe(response => {
            this.contractTypes = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }
    getPosition() {
        this.appHttpService.getCatalogues('OFFER_POSITION').subscribe(response => {
            this.positions = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }
    getSector() {
        this.appHttpService.getCatalogues('SECTOR').subscribe(response => {
            this.sectors = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }
    getWorkingDay() {
        this.appHttpService.getCatalogues('OFFER_WORKING_DAY').subscribe(response => {
            this.workingDays = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }
    getExperienceTime() {
        this.appHttpService.getCatalogues('OFFER_EXPERIENCE_TIME').subscribe(response => {
            this.experienceTimes = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }
    getTrainingHours() {
        this.appHttpService.getCatalogues('OFFER_TRAINING_HOURS').subscribe(response => {
            this.trainingHours = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }

    getStatus() {
        const params = new HttpParams()
            .append('uri', '/job-board/company');
        this.jobBoardHttpService.get('offer/status', params).subscribe(response => {
            this.status = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }

    // Save in backend
    storeOffer(offer: Offer, flag = false) {
        this.spinnerService.show();
        this.jobBoardHttpService.store('offers', {offer}).subscribe(response => {
            this.spinnerService.hide();
            this.messageService.success(response);
            this.saveOffer(response['data']);
            if (flag) {
                this.formOfferIn.reset();
            } else {
                this.displayOut.emit(false);
            }

        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }

    // Save in backend
    updateOffer(offer: Offer) {
        this.spinnerService.show();
        this.jobBoardHttpService.update('offers/' + offer.id, {offer})
            .subscribe(response => {
                this.spinnerService.hide();
                this.messageService.success(response);
                this.saveOffer(response['data']);
                this.displayOut.emit(false);
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
    }

    // Save in frontend
    saveOffer(offer: Offer) {
        const index = this.offersIn.findIndex(element => element.id === offer.id);
        if (index === -1) {
            this.offersIn.push(offer);
        } else {
            this.offersIn[index] = offer;
        }
        this.offersOut.emit(this.offersIn);
    }

    calculateEndDate(){
        if(this.startDateField.valid){
            const date = add(new Date(this.startDateField.value), {months:1, days:1});
            this.endDateField.patchValue(format(date, 'yyyy-MM-dd'));
        }
    }
}
