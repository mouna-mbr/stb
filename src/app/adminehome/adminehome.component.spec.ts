import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminehomeComponent } from './adminehome.component';

describe('AdminehomeComponent', () => {
  let component: AdminehomeComponent;
  let fixture: ComponentFixture<AdminehomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminehomeComponent]
    });
    fixture = TestBed.createComponent(AdminehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
