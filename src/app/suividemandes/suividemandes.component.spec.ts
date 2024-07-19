import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuividemandesComponent } from './suividemandes.component';

describe('SuividemandesComponent', () => {
  let component: SuividemandesComponent;
  let fixture: ComponentFixture<SuividemandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuividemandesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuividemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
