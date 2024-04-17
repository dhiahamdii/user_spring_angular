import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegleUpdateComponent } from './regle-update.component';

describe('RegleUpdateComponent', () => {
  let component: RegleUpdateComponent;
  let fixture: ComponentFixture<RegleUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegleUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
