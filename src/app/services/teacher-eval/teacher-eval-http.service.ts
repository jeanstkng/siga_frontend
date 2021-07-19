import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';

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

    getEvaluation(id : string){
      const url = environment.API_URL_TEACHEREVAL + 'evaluation/gestion';      
      return this.httpClient.get(`${url}/${id}`);
    }

    getExtraCredit(url : string){
     url = environment.API_URL_TEACHEREVAL + url;      
      return this.httpClient.get(url, {headers: this.headers});
    }

    getResearch(url : string){
      url = environment.API_URL_TEACHEREVAL + url;
      return this.httpClient.get(url,{headers: this.headers});
    }

    addExtraCredit(id : string, data : any, params = new HttpParams()){
      const url = environment.API_URL_TEACHEREVAL + 'credit/store';
      return this.httpClient.post(`${url}/${id}`, data, {params} )
    }

    addResearch(id : string, data : any, params = new HttpParams()){
      const url = environment.API_URL_TEACHEREVAL + 'investigacion/store';
      return this.httpClient.post(`${url}/${id}`, data, {params} )
    }

    deleteCredit(id: string){
      const url = environment.API_URL_TEACHEREVAL + 'credit/delete';
      return this.httpClient.delete(`${url}/${id}`, {headers: this.headers} )
    }

    deleteResearch(id : string){
      const url = environment.API_URL_TEACHEREVAL + 'investigacion/delete';
      return this.httpClient.delete(`${url}/${id}`, {headers: this.headers})
    }
    

}
