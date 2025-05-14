import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardevoirComponent } from './gardevoir.component';

describe('GardevoirComponent', () => {
  let component: GardevoirComponent;
  let fixture: ComponentFixture<GardevoirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GardevoirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GardevoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
