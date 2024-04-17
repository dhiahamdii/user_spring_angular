import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocLoisComponent } from './doc-lois.component';

describe('DocLoisComponent', () => {
  let component: DocLoisComponent;
  let fixture: ComponentFixture<DocLoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocLoisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocLoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
