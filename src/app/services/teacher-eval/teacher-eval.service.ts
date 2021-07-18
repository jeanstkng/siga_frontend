import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class TeacherEvalService {


  constructor(protected http: HttpClient) {  }



  // urlvs: string = "http://siga_backend.test/v1/teacher-eval/question/show/";
  urlvs: string = "http://siga_backend.test/v1/teacher-eval/question/index?evaluation_type_id=1&per_page=4&page=1";


  getInit(param: any): Observable<any> {
    let httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    httpHeaders.append("Authorization", "Basic " + btoa("username:password"));

    const httpOptions = {
      headers: httpHeaders
    };
    return this.http.get(this.urlvs.concat(param), httpOptions);

  }





  /*    getQuestion(): Category {
       return localStorage.getItem('category') ? JSON.parse(localStorage.getItem('category')) : null;
   }
     setCategory(category) {
       localStorage.setItem('category', JSON.stringify(category));
   } */
}
