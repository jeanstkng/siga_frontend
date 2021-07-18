import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorEvaluationComponent } from './coordinator-evaluation.component';

describe('CoordinatorEvaluationComponent', () => {
  let component: CoordinatorEvaluationComponent;
  let fixture: ComponentFixture<CoordinatorEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordinatorEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
