import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivationDisplayComponent } from './motivation-display.component';

describe('MotiviationDisplayComponent', () => {
  let component: MotivationDisplayComponent;
  let fixture: ComponentFixture<MotivationDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotivationDisplayComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotivationDisplayComponent);
    component = fixture.componentInstance;
    component.motivation={
      id:0,
      strength:1,
      name:"salut"
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test fully the component 'MotivationDisplayComponent'
  it('should have a title', () => {
    expect(component.motivation.name).toBe('salut');
  }
  );

   it('should have a title in the template', () => {
     const title = fixture.nativeElement.querySelector('h2');
     expect(title.textContent).toBe(' SALUT ');
   });

    it('should have a strength in the template', () => {
      const strength = fixture.nativeElement.querySelector('span');
      expect(strength.textContent).toBe(' Strength : 1 ');
    });
});
