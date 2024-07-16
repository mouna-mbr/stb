import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationfinalComponent } from './validationfinal.component';

describe('ValidationfinalComponent', () => {
  let component: ValidationfinalComponent;
  let fixture: ComponentFixture<ValidationfinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationfinalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationfinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
