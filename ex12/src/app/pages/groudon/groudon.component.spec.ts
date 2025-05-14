import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroudonComponent } from './groudon.component';

describe('GroudonComponent', () => {
  let component: GroudonComponent;
  let fixture: ComponentFixture<GroudonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroudonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroudonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
