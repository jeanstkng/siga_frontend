import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment, WEB} from '../../../environments/environment';
import {Router} from '@angular/router';
import {MessageService} from '../app/message.service';


@Injectable({
    providedIn: 'root'
})

export class JobBoardHttpService {
    API_URL_AUTHENTICATION: string = environment.API_URL_AUTHENTICATION;

    constructor(private httpClient: HttpClient,
        private router: Router,
        private messageService: MessageService) {
    }

    getProfessional(about_me: string, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'professional/' + about_me;
        return this.httpClient.get(url, {params});
    }

    getLanguage(params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'module/menus';
        return this.httpClient.get(url, {params});
    }

    getExperience(params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'module/menus';
        return this.httpClient.get(url, {params});
    }

    getCourse(params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'module/menus';
        return this.httpClient.get(url, {params});
    }
    
    getReference(params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'module/menus';
        return this.httpClient.get(url, {params});
    }

    get(url: string, params = new HttpParams()) {
        url = this.API_URL_AUTHENTICATION + url;
        return this.httpClient.get(url, {params});
    }

    post(url: string, data: any, params = new HttpParams()) {
        url = this.API_URL_AUTHENTICATION + url;
        return this.httpClient.post(url, data, {params});
    }

    update(url: string, data: any, params = new HttpParams()) {
        url = this.API_URL_AUTHENTICATION + url;
        return this.httpClient.put(url, data, {params});
    }

    delete(url: string, params = new HttpParams()) {
        url = this.API_URL_AUTHENTICATION + url;
        return this.httpClient.delete(url, {params});
    }
}
