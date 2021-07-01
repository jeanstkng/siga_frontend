import { TestBed } from '@angular/core/testing';

import { TeacherEvalService } from './teacher-eval.service';

describe('TeacherEvalService', () => {
  let service: TeacherEvalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherEvalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
