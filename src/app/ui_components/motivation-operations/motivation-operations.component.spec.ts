import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivationOperationsComponent } from './motivation-operations.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('MotivationEditorComponent', () => {
  let component: MotivationOperationsComponent;
  let fixture: ComponentFixture<MotivationOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MotivationOperationsComponent,
        RouterTestingModule.withRoutes([{path: 'update/:id', component: MotivationOperationsComponent}])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotivationOperationsComponent);
    component = fixture.componentInstance;
    component.motivation=component.service.getById(0)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a motivation', () => {
    expect(component.motivation).toBeTruthy();
  } );

  // test clicking the update button
  // it('should have a link to update motivation', () => {
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('a').getAttribute('routerLink')).toBe('/update/0');
  // });
 // it('should have a link to update motivation', () => {
 //   const link = fixture.nativeElement.querySelector('a');
 //   expect(link.getAttribute('routerLink')).toBe('/update/0');
 // });
  // let href = fixture.debugElement.query(By.css('a')).nativeElement
  //   .getAttribute('href');
  // expect(href).toEqual('/settings/testing/edit/1');

  // test clicking the remove button
 // it('should remove a motivation', () => {
 //   const compiled = fixture.nativeElement;
 //     compiled.querySelector('button').click();
 //   expect(component.service.getById(0)).toBeFalsy();
 // });

});
