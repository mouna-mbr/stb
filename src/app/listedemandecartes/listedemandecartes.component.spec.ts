import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedemandecartesComponent } from './listedemandecartes.component';

describe('ListedemandecartesComponent', () => {
  let component: ListedemandecartesComponent;
  let fixture: ComponentFixture<ListedemandecartesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListedemandecartesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListedemandecartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
