import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RhsousentrepriseComponent } from './rhsousentreprise.component';

describe('RhsousentrepriseComponent', () => {
  let component: RhsousentrepriseComponent;
  let fixture: ComponentFixture<RhsousentrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RhsousentrepriseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RhsousentrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
