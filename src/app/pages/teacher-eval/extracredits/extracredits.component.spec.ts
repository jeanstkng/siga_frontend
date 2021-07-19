import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtracreditsComponent } from './extracredits.component';

describe('ExtracreditsComponent', () => {
  let component: ExtracreditsComponent;
  let fixture: ComponentFixture<ExtracreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtracreditsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtracreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
