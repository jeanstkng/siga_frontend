import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment, WEB} from '../../../environments/environment';
//import {User} from '../../models/auth/models.index';
//import {URL} from '../../../environments/environment';
import {MessageService} from '../app/message.service';
//import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class CommunityHttpService {
   // auth: User;
   API_URL_COMMUNITY: string = environment.API_URL_COMMUNITY; 
   private headers: HttpHeaders;
   

    constructor(private httpClient: HttpClient,
                private router: Router,
                private messageService: MessageService) {
    }

    
    
    get(url: string, params = new HttpParams()) {
        url = environment.API_URL_COMMUNITY + url;
        return this.httpClient.get(url, {params});
    }

    store(url: string, data: any, params = new HttpParams()) {
        url = environment.API_URL_COMMUNITY + url;
        return this.httpClient.post(url, data, {params});
    }

    update(url: string, data: any, params = new HttpParams()) {
        url = environment.API_URL_COMMUNITY + url;
        return this.httpClient.put(url, data, {params});
    }

    delete(url: string, data: any , params = new HttpParams() ) {
        url = environment.API_URL_COMMUNITY + url;
        return this.httpClient.put(url, data, {params});
    }

    uploadFiles(url: string, data: FormData, params = new HttpParams()) {
        url = environment.API_URL_COMMUNITY + url;
        return this.httpClient.post(url, data, {params});
    }

    getFiles(url: string, params = new HttpParams()) {
        url = environment.API_URL_COMMUNITY + url;
        return this.httpClient.get(url, {params});
    }

   
}
