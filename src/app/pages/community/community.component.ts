import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {

  items: MenuItem[];
  activeItem: MenuItem;



  constructor() { }

  ngOnInit() {

    
  }

}