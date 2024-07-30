import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RhinterfaceComponent } from './rhinterface.component';

describe('RhinterfaceComponent', () => {
  let component: RhinterfaceComponent;
  let fixture: ComponentFixture<RhinterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RhinterfaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RhinterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
