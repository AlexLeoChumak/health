import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DatepickerPopoverComponent } from './datepicker.component';

describe('DatepickerPopoverComponent', () => {
  let component: DatepickerPopoverComponent;
  let fixture: ComponentFixture<DatepickerPopoverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DatepickerPopoverComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatepickerPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
