import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment, WEB} from '../../../environments/environment';
import {Router} from '@angular/router';

import {MessageService} from '../app/message.service';



@Injectable({
    providedIn: 'root'
})

export class CecyHttpService {
    API_URL_CECY: string = environment.API_URL_CECY;

    constructor(private httpClient: HttpClient,
        private router: Router,
        private messageService: MessageService) {
    }


    get(url: string, params = new HttpParams()) {
        url = this.API_URL_CECY + url;
        return this.httpClient.get(url, {params});
    }

    store(url: string, data: any, params = new HttpParams()) {
        url = this.API_URL_CECY + url;
        return this.httpClient.post(url, data, {params});
    }

    update(url: string, data: any, params = new HttpParams()) {
        url = this.API_URL_CECY + url;
        return this.httpClient.put(url, data, {params});
    }

    // delete(url: string, ids, params = new HttpParams()) {
    //     url = this.API_URL_JOB_BOARD + url;
    //     return this.httpClient.put(url, {ids}, {params});
    // }

}