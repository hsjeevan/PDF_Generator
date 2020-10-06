import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfCropperComponent } from './pdf-cropper.component';

describe('PdfCropperComponent', () => {
  let component: PdfCropperComponent;
  let fixture: ComponentFixture<PdfCropperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfCropperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfCropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
