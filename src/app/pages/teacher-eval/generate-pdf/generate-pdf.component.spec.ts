import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePDFComponent } from './generate-pdf.component';

describe('GeneratePDFComponent', () => {
  let component: GeneratePDFComponent;
  let fixture: ComponentFixture<GeneratePDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratePDFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
