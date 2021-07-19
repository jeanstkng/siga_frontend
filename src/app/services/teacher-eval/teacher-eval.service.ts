import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Router} from '@angular/router';

import { Teacher } from '../../models/app/teacher';
import { Evaluation } from 'src/app/models/teacher-eval/evaluation';
import { ExtraCredit } from 'src/app/models/teacher-eval/extra-credit';
import { Research } from 'src/app/models/teacher-eval/research';
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
    localStorage.removeItem('evaluation');
    localStorage.removeItem('extra_credit');
    localStorage.removeItem('research');


}
setUrlAvatar(url: string) {
  this.urlAvatar = environment.STORAGE_URL + url;
}

  getTeacher(): Teacher{
    return localStorage.getItem('teacher') ? JSON.parse(localStorage.getItem('teacher')) : null;
  }
  getEvaluation() : Evaluation{
    return localStorage.getItem('evaluation') ? JSON.parse(localStorage.getItem('evaluation')) : null;
  }

  getExtraCredit(): ExtraCredit{
    return localStorage.getItem('extra_credit') ? JSON.parse(localStorage.getItem('extra_credit')) : null;
  }

  getResearch(): Research{
    return localStorage.getItem('research') ? JSON.parse(localStorage.getItem('research')) : null;
  }

  setTeacher(teachers) {
    localStorage.setItem('teacher', JSON.stringify(teachers));
  }

  setEvaluation(evaluations) {
    localStorage.setItem('evaluation', JSON.stringify(evaluations));
  }

  setExtraCredit(extra_credits) {
    localStorage.setItem('extra_credit', JSON.stringify(extra_credits));
  }

  setResearch(research) {
    localStorage.setItem('extra_credit', JSON.stringify(research));
  }

}
