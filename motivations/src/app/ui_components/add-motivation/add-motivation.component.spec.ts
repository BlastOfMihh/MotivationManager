import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMotivationComponent } from './add-motivation.component';

describe('AddMotivationComponent', () => {
  let component: AddMotivationComponent;
  let fixture: ComponentFixture<AddMotivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMotivationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMotivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
