import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoevaluationAreaCoordinatorComponent } from './coevaluation-area-coordinator.component';

describe('CoevaluationAreaCoordinatorComponent', () => {
  let component: CoevaluationAreaCoordinatorComponent;
  let fixture: ComponentFixture<CoevaluationAreaCoordinatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoevaluationAreaCoordinatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoevaluationAreaCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
