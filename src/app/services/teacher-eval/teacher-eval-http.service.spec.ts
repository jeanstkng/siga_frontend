import { TestBed } from '@angular/core/testing';

import { TeacherEvalHttpService } from './teacher-eval-http.service';

describe('TeacherEvalHttpService', () => {
  let service: TeacherEvalHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherEvalHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
