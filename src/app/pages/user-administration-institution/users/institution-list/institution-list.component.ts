import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Col } from '../../../../models/setting/col';
import { User } from '../../../../models/auth/user';
import { FormGroup } from '@angular/forms';
import { Paginator } from '../../../../models/setting/paginator';
import { MessageService } from '../../../shared/services/message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAdministrationService } from '../../../../services/auth/user-administration.service';
import { HttpParams } from '@angular/common/http';
import { Role } from 'src/app/models/auth/role';
import { Institution } from 'src/app/models/app/institution';

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.scss']
})
export class InstitutionListComponent implements OnInit {


  institutions: Institution[];
  activeTab: 0;
  constructor(private messageService: MessageService,
    private spinnerService: NgxSpinnerService,
    private userAdministrationService: UserAdministrationService) {
  }

  ngOnInit(): void {
    this.activeTab = 0;
    this.getInstitutions();
  }

  getInstitutions() {
    let params = new HttpParams();
    this.userAdministrationService.get('user-admin-institution/institutions', params).subscribe(response => {
      this.institutions = response['data'];
    }, error => {
      this.messageService.error(error);
    });
  }

  handleChange(e) {
    this.activeTab = e.index;
  }
}
