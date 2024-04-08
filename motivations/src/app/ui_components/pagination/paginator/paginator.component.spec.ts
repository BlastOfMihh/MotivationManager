import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';
import {IMotivation} from "../../../domain/imotivation";
import {RouterTestingModule} from "@angular/router/testing";
import {computeStartOfLinePositions} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/source_file";

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  let elements:IMotivation[]=[
    {
      id:0,
      name:"To impress that girl",
      strength:1.2
    },
    {
      id:1,
      name:"To be the best",
      strength:1.2
    },
    {
      id:2,
      name:"To be Bold",
      strength:1.2
    },
    {
      id:3,
      name:"To make sth cool",
      strength:5
    },
    {
      id:4,
      name:"To be a real boy",
      strength:2.2
    },
  ]
  let itemsPerPage

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    component.pageSize=3
    component.updatePageSize()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should display first', () => {
    expect(component).toBeTruthy();
    expect(component.currentElements.length==component.pageSize).toBeTrue()
    expect(component.currentElements[0].id).toBe(0)
    expect(component.currentElements[1].id).toBe(1)
    expect(component.currentElements[2].id).toBe(2)
  });

  it('should display second', () => {
    expect(component).toBeTruthy();
    component.turnPage()
    expect(component.currentElements.length==2).toBeTrue()
    expect(component.currentElements[0].id).toBe(3)
    expect(component.currentElements[1].id).toBe(4)
  });

  it('should display first after turn front and turn back', () => {
    expect(component).toBeTruthy();
    component.turnPage()
    component.turnBackPage()
    expect(component.currentElements.length==component.pageSize).toBeTrue()
    expect(component.currentElements[0].id).toBe(0)
    expect(component.currentElements[1].id).toBe(1)
    expect(component.currentElements[2].id).toBe(2)
  });

  it('should work with different page size', () => {
    expect(component).toBeTruthy();
    component.pageSize=4
    component.updateCurrentElements()
    expect(component.currentElements.length==component.pageSize).toBeTrue()
    expect(component.currentElements[0].id).toBe(0)
    expect(component.currentElements[1].id).toBe(1)
    expect(component.currentElements[2].id).toBe(2)
    expect(component.currentElements[3].id).toBe(3)
  });
});
