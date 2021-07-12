import { Component, OnInit } from '@angular/core';
import {BreadcrumbService} from '../../../shared/services/breadcrumb.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  constructor( private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Dashboard', routerLink: ['/dashboard']},
      {label: 'Mi Empresa'}
    ]);
    }

  ngOnInit(): void {
  }

}
