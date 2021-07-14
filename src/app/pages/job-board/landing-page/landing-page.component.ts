import {Component, OnInit} from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
    flagActualPage: string;

    constructor(
        private authService: AuthService) {
        this.flagActualPage = 'offers';
    }

    ngOnInit(): void {
    }

}
