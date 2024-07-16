import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListefinaldemandecartesComponent } from './listefinaldemandecartes.component';

describe('ListefinaldemandecartesComponent', () => {
  let component: ListefinaldemandecartesComponent;
  let fixture: ComponentFixture<ListefinaldemandecartesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListefinaldemandecartesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListefinaldemandecartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
