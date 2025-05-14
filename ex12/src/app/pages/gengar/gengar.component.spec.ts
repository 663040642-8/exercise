import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GengarComponent } from './gengar.component';

describe('GengarComponent', () => {
  let component: GengarComponent;
  let fixture: ComponentFixture<GengarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GengarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GengarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
