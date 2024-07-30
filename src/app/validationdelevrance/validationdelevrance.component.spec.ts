import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationdelevranceComponent } from './validationdelevrance.component';

describe('ValidationdelevranceComponent', () => {
  let component: ValidationdelevranceComponent;
  let fixture: ComponentFixture<ValidationdelevranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationdelevranceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationdelevranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
