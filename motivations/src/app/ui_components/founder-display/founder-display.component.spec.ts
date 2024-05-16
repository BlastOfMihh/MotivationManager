import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FounderDisplayComponent } from './founder-display.component';

describe('FounderDisplayComponent', () => {
  let component: FounderDisplayComponent;
  let fixture: ComponentFixture<FounderDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FounderDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FounderDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
