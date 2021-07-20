import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../../../services/community/community.service';
import { Project } from '../../../models/community/models.index';
import { User } from '../../../models/auth/user';
import { Role } from '../../../models/auth/role';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-projects-list',
    templateUrl: './projects-list.component.html',
    providers: [MessageService, ConfirmationService]
})
export class ProjectsComponent implements OnInit {

    projects: Project[] = [];
    user: User;
    role: Role;
    permission: Role;
    loading = true;

    constructor(private communityService: CommunityService,
                private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private route: Router) {
        // this.user = JSON.parse(localStorage.getItem('user')) as User;
        // this.role = JSON.parse(localStorage.getItem('role')) as Role;
        this.role = {};
    }

    ngOnInit() {
        this.getproject();
    }

    getproject() {
        this.communityService.get('projects').subscribe(
            (response: any) => {
                // let valor = [];
                // let arrByID = project.filter( (val) => {
                //     let beneficiario = val.beneficiary_institution == null ?
                //     val.beneficiary_institution = {name: 'llenar campo'} : '';
                //     valor.push(val);
                // });
                this.projects = response.data.data;
                console.log(response);
                console.log(this.projects);
                this.loading = false;
            },
            error => {
                console.log(error);
            });
    }

    clear(table: any) {
        table.clear();
    }

    convenio(project: any, type: string) {
        return this.communityService.pdf(type + project.id);
    }

    deleteproject(project: any) {
        this.communityService.delete('projects/' + project.id).subscribe(response => {
            this.getproject();
            this.showDeletedSuccessfully();
        });
    }

    showDeletedSuccessfully() {
        this.messageService.add({
            severity: 'Success',
            summary: 'Eliminado',
            detail: 'Su proyecto ya esta eliminado',
            life: 3000
        });
    }

    editar(project: any) {
        const x = 'form/' + project.id;
        this.route.navigate(['form']);
    }
}
