import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoiReglesComponent } from './loi-regles.component';

describe('LoiReglesComponent', () => {
  let component: LoiReglesComponent;
  let fixture: ComponentFixture<LoiReglesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoiReglesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoiReglesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
