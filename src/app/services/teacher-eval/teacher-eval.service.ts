import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Router} from '@angular/router';

import { Teacher } from '../../models/app/teacher';
@Injectable({
  providedIn: 'root'
})
export class TeacherEvalService {
  urlAvatar: string;
          private headers : HttpHeaders;
          constructor(private httpClient: HttpClient, private router: Router) {
            this.urlAvatar = environment.STORAGE_URL;
    
        }

  removeLogin() {
    localStorage.removeItem('teacher');


}
setUrlAvatar(url: string) {
  this.urlAvatar = environment.STORAGE_URL + url;
}

  getTeacher(): Teacher{
    return localStorage.getItem('teacher') ? JSON.parse(localStorage.getItem('teacher')) : null;
  }

  setTeacher(teachers) {
    localStorage.setItem('teacher', JSON.stringify(teachers));
}

}
