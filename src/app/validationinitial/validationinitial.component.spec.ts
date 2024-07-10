import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationinitialComponent } from './validationinitial.component';

describe('ValidationinitialComponent', () => {
  let component: ValidationinitialComponent;
  let fixture: ComponentFixture<ValidationinitialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationinitialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationinitialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
