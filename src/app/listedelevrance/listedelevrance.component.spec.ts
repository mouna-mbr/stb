import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedelevranceComponent } from './listedelevrance.component';

describe('ListedelevranceComponent', () => {
  let component: ListedelevranceComponent;
  let fixture: ComponentFixture<ListedelevranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListedelevranceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListedelevranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
