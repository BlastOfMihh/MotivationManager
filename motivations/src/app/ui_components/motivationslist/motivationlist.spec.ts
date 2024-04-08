import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Motivationlist } from './motivationlist';
import {RouterTestingModule} from "@angular/router/testing";

describe('HeroeslistComponent', () => {
  let component: Motivationlist;
  let fixture: ComponentFixture<Motivationlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Motivationlist, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Motivationlist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of motivations', () => {
    expect(component.motivations).toBeTruthy();
  });

  it('should have a list of motivations with length 0', () => {
    component.motivations = [];
    expect(component.motivations.length).toBe(0);
  });

  it('should have a list of motivations with length 1', () => {
    component.motivations = [{id: 1, name: 'test', strength:1}];
    expect(component.motivations.length).toBe(1);
  });

  it('should have a list of motivations with length 2', () => {
    component.motivations = [{id: 1, name: 'test', strength:1}, {id: 2, name: 'test', strength:1}];
    expect(component.motivations.length).toBe(2);
  });

  it('should have a list of motivations with length 3', () => {
    component.motivations = [{id: 1, name: 'test', strength:1}, {id: 2, name: 'test', strength:1}, {id: 3, name: 'test', strength:1}];
    expect(component.motivations.length).toBe(3);
  });

  // add test for the link
  it('should have a link to add motivation', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('a').getAttribute('routerLink')).toBe('/add');
  });


});
