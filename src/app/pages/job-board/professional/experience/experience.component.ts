import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobBoardHttpService } from '../../../../services/job-board/job-board-http.service';
import { Experience } from '../../../../models/job-board/experience';
import { Paginator } from '../../../../models/setting/paginator';
import { HttpParams } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from '../../../shared/services/message.service';
import { DateValidators } from '../../../shared/validators/date.validators';
import { BreadcrumbService } from '../../../../shared/services/breadcrumb.service';


@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.scss']
})

export class ExperienceComponent implements OnInit {
    paginator: Paginator;
    experiences: Experience[];
    formExperience: FormGroup;
    experienceDialog: boolean;
    flagExperiences: boolean;

    constructor(
        private spinnerService: NgxSpinnerService,
        public messageService: MessageService,
        private formBuilder: FormBuilder,
        private jobBoardHttpService: JobBoardHttpService) {

        this.paginator = { current_page: 1, per_page: 2 };
        this.experiences = [];
    }

    ngOnInit(): void {
        this.buildFormExperience();
        this.getExperiences(this.paginator);
    }

    // Build form experience
    buildFormExperience() {
        this.formExperience = this.formBuilder.group({
            id: [null],
            area: [null, Validators.required],
            employer: [null, Validators.required],
            position: [null, [Validators.required, Validators.minLength(3)]],
            start_date: [null, Validators.required],
            end_date: [null, Validators.required],
            reason_leave: [null, Validators.required],
            activities: this.formBuilder.array([this.formBuilder.control(null, Validators.required)]),
            is_working: [null, Validators.required],
            is_disability: [null, Validators.required],
        });
    }

    // experiences of backend
    getExperiences(paginator: Paginator) {
        const params = new HttpParams()
            .append('page', paginator.current_page.toString())
            .append('per_page', paginator.per_page.toString());
        this.flagExperiences = true;
        // this.spinnerService.show();
        this.jobBoardHttpService.get('experiences', params).subscribe(
            response => {
                // this.spinnerService.hide();
                this.flagExperiences = false;
                this.experiences = response['data'];
                // console.log(this.experiences);
                this.paginator = response as Paginator;
            }, error => {
                // this.spinnerService.hide();
                this.flagExperiences = false;
                this.messageService.error(error);
            });
    }
}
