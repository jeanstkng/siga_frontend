import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeacherEvalHttpService {
/*Hola*/
          private headers : HttpHeaders;
  constructor(
        
          private httpClient : HttpClient
  ) { }

    getTeacher(url : string ){
        url = environment.API_URL_TEACHEREVAL + url;
        return this.httpClient.get(url, {headers: this.headers});
    }


}
