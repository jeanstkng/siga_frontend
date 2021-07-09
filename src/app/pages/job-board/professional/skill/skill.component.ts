import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobBoardHttpService } from '../../../../services/job-board/job-board-http.service';
import { Skill } from '../../../../models/job-board/skill';
import { Paginator } from '../../../../models/setting/paginator';
import { HttpParams } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from '../../../shared/services/message.service';
import {AppHttpService} from '../../../../services/app/app-http.service';

@Component({
    selector: 'app-skill',
    templateUrl: './skill.component.html',
    styleUrls: ['./skill.component.scss']
})

export class SkillComponent implements OnInit {
    paginator: Paginator;
    skills: Skill[];
    formSkill: FormGroup;
    skillDialog: boolean;
    flagSkeletonListSkills: boolean;

    constructor(
        private spinnerService: NgxSpinnerService,
        public messageService: MessageService,
        private formBuilder: FormBuilder,
        private appHttpService: AppHttpService,
        private jobBoardHttpService: JobBoardHttpService) {
        this.paginator = { current_page: 1, per_page: 2 };
        this.skills = [];
    }

    ngOnInit(): void {
        this.getSkills(this.paginator);
        this.buildFormSkill();
    }

    // Build form skill
    buildFormSkill() {
        this.formSkill = this.formBuilder.group({
            id: [null],
            type: [null, Validators.required],
            description: [null, [Validators.required, Validators.minLength(10)]],
        });
    }

    // skills of backend
    getSkills(paginator: Paginator) {
        const params = new HttpParams()
            .append('page', paginator.current_page.toString())
            .append('per_page', paginator.per_page.toString());

        this.flagSkeletonListSkills = true;
        this.jobBoardHttpService.get('skills', params).subscribe(
            response => {
                this.flagSkeletonListSkills = false;
                this.skills = response['data'];
                this.paginator = response as Paginator;
            }, error => {
                this.flagSkeletonListSkills = false;
                this.messageService.error(error);
            });
    }
}
