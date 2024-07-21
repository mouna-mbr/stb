import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelevranceunitaireComponent } from './delevranceunitaire.component';

describe('DelevranceunitaireComponent', () => {
  let component: DelevranceunitaireComponent;
  let fixture: ComponentFixture<DelevranceunitaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelevranceunitaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelevranceunitaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
