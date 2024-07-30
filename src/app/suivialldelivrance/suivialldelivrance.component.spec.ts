import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuivialldelivranceComponent } from './suivialldelivrance.component';

describe('SuivialldelivranceComponent', () => {
  let component: SuivialldelivranceComponent;
  let fixture: ComponentFixture<SuivialldelivranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuivialldelivranceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuivialldelivranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
