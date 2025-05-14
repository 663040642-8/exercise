import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalamenceComponent } from './salamence.component';

describe('SalamenceComponent', () => {
  let component: SalamenceComponent;
  let fixture: ComponentFixture<SalamenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalamenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalamenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
