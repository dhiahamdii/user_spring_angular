import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoiUpdateComponent } from './loi-update.component';

describe('LoiUpdateComponent', () => {
  let component: LoiUpdateComponent;
  let fixture: ComponentFixture<LoiUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoiUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoiUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
