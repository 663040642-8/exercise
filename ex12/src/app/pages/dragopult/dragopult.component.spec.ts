import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragopultComponent } from './dragopult.component';

describe('DragopultComponent', () => {
  let component: DragopultComponent;
  let fixture: ComponentFixture<DragopultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragopultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragopultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
