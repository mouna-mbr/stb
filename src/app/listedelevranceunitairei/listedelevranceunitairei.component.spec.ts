import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedelevranceunitaireiComponent } from './listedelevranceunitairei.component';

describe('ListedelevranceunitaireiComponent', () => {
  let component: ListedelevranceunitaireiComponent;
  let fixture: ComponentFixture<ListedelevranceunitaireiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListedelevranceunitaireiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListedelevranceunitaireiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
