import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelevranceenmasseComponent } from './delevranceenmasse.component';

describe('DelevranceenmasseComponent', () => {
  let component: DelevranceenmasseComponent;
  let fixture: ComponentFixture<DelevranceenmasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelevranceenmasseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelevranceenmasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
