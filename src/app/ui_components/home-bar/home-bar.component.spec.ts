import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBarComponent } from './home-bar.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('HomeBarComponent', () => {
  let component: HomeBarComponent;
  let fixture: ComponentFixture<HomeBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeBarComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test fully the component 'HomeBarComponent'
  // it('should have a title', () => {
  //   expect(component.title).toBe('Home Bar');
  // });

   it('should have a title in the template', () => {
     const title = fixture.nativeElement.querySelector('h1');
     expect(title.textContent).toBe(' MOTIVATIONS ');
   });

    it('should have a link in the template', () => {
      const link = fixture.nativeElement.querySelector('a');
      expect(link).toBeTruthy();
    });

    it('should have a link to the home page', () => {
      const link = fixture.nativeElement.querySelector('a');
      expect(link.getAttribute('routerLink')).toBe('');
    });
});
