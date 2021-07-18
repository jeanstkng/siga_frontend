import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorHeteroevaluationComponent } from './coordinator-heteroevaluation.component';

describe('CoordinatorHeteroevaluationComponent', () => {
  let component: CoordinatorHeteroevaluationComponent;
  let fixture: ComponentFixture<CoordinatorHeteroevaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordinatorHeteroevaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorHeteroevaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
