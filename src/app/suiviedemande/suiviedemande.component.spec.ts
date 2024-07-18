import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviedemandeComponent } from './suiviedemande.component';

describe('SuiviedemandeComponent', () => {
  let component: SuiviedemandeComponent;
  let fixture: ComponentFixture<SuiviedemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiviedemandeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuiviedemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
