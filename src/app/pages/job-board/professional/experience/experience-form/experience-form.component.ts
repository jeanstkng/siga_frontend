import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experience } from '../../../../../models/job-board/experience';
import { MessageService } from '../../../../shared/services/message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { JobBoardHttpService } from '../../../../../services/job-board/job-board-http.service';
import { AppHttpService } from '../../../../../services/app/app-http.service';
import { Catalogue } from '../../../../../models/app/catalogue';
import { MessageService as MessagePnService } from 'primeng/api';
import { SharedService } from '../../../../shared/services/shared.service';

import { add, format } from 'date-fns';

@Component({
    selector: 'app-experience-form',
    templateUrl: './experience-form.component.html',
    styleUrls: ['./experience-form.component.scss']
})

export class ExperienceFormComponent implements OnInit {
    @Input() formExperienceIn: FormGroup;
    @Input() experiencesIn: Experience[];
    @Output() experiencesOut = new EventEmitter<Experience[]>();
    @Output() displayOut = new EventEmitter<boolean>();
    filteredAreas: any[];
    areas: Catalogue[];
    isWorking: boolean = true;
    isDisability: boolean = false;
    selectedValues: string[] = [];
    value: boolean;

    constructor(private formBuilder: FormBuilder,
        public messageService: MessageService,
        private messagePnService: MessagePnService,
        private spinnerService: NgxSpinnerService,
        private appHttpService: AppHttpService,
        private sharedService: SharedService,
        private jobBoardHttpService: JobBoardHttpService) {
    }

    ngOnInit(): void {
        this.getAreas();
    }

    // Fields of Form
    get idField() {
        return this.formExperienceIn.get('id');
    }

    get professionalField() {
        return this.formExperienceIn.get('professional');
    }

    get areaField() {
        return this.formExperienceIn.get('area');
    }

    get employerField() {
        return this.formExperienceIn.get('employer');
    }

    get positionField() {
        return this.formExperienceIn.get('position');
    }

    get startDateField() {
        return this.formExperienceIn.get('start_date');
    }

    get endDateField() {
        return this.formExperienceIn.get('start_date');
    }

    get activitiesField() {
        return this.formExperienceIn.get('activities') as FormArray;
    }

    get reasonLeaveField() {
        return this.formExperienceIn.get('reason_leave');
    }

    get isWorkingField() {
        return this.formExperienceIn.get('is_working');
    }

    get isDisabilityField() {
        return this.formExperienceIn.get('is_disability');
    }

    addActivities() {
        this.activitiesField.push(this.formBuilder.control(null, Validators.required));
    }

    removeActivities(activity) {
        this.activitiesField.removeAt(activity);
    }

    // Submit Form
    onSubmit(flag = false) {
        if (this.formExperienceIn.valid) {
            if (this.idField.value) {
                this.updateExperience(this.formExperienceIn.value);
            } else {
                this.storeExperience(this.formExperienceIn.value, flag);
            }
        } else {
            this.formExperienceIn.markAllAsTouched();
        }
    }

    getAreas() {
        this.appHttpService.getCatalogues('EXPERIENCE_AREA').subscribe(response => {
            this.areas = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }

    // Save in backend
    storeExperience(experience: Experience, flag = false) {
        this.spinnerService.show();
        this.jobBoardHttpService.store('experiences', { experience }).subscribe(response => {
            this.spinnerService.hide();
            this.messageService.success(response);
            this.saveExperience(response['data']);
            if (flag) {
                this.formExperienceIn.reset();
            } else {
                this.displayOut.emit(false);
            }
        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }

    // Save in backend
    updateExperience(experience: Experience) {
        this.spinnerService.show();
        this.jobBoardHttpService.update('experiences/' + experience.id, { experience })
            .subscribe(response => {
                this.spinnerService.hide();
                this.messageService.success(response);
                this.saveExperience(response['data']);
                console.log("hola");
                this.displayOut.emit(false);
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
    }


    // Save in frontend
    saveExperience(experience: Experience) {
        const index = this.experiencesIn.findIndex(element => element.id === experience.id);
        if (index === -1) {
            this.experiencesIn.push(experience);
        } else {
            this.experiencesIn[index] = experience;
        }
        this.experiencesOut.emit(this.experiencesIn);
    }

    clickIsWorking(e) {
        const isWorking = e.checked;
        if (isWorking) {
            this.isWorking = true;
            this.isWorking = false;
        }
    }
    clickIsDisability(e) {
        const isDisability = e.checked;
        if (isDisability) {
            console.log('jsdhck');
            this.isDisability = true;
            this.isDisability = false;


        }
    }

}
