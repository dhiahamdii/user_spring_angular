import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastLoiComponent } from './last-loi.component';

describe('LastLoiComponent', () => {
  let component: LastLoiComponent;
  let fixture: ComponentFixture<LastLoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastLoiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastLoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
