import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandedecarteComponent } from './demandedecarte.component';

describe('DemandedecarteComponent', () => {
  let component: DemandedecarteComponent;
  let fixture: ComponentFixture<DemandedecarteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandedecarteComponent]
    });
    fixture = TestBed.createComponent(DemandedecarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
