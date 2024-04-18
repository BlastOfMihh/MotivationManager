import {Component, inject} from '@angular/core';
import {CommonModule, NgFor, NgForOf} from "@angular/common";
import {MotivationService, MihhObserver} from "../../../services/motivation.service";
import {IMotivation} from "../../../domain/imotivation";
import {MotivationDisplayComponent} from "../../motiviation-display/motivation-display.component";
import {min} from "rxjs";
import {MotivationOperationsComponent} from "../../motivation-operations/motivation-operations.component";
import {SortButtonComponent} from "../../sort-button/sort-button.component";
import {FormsModule} from "@angular/forms";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [NgFor, CommonModule, NgForOf, MotivationDisplayComponent, MotivationOperationsComponent, SortButtonComponent, FormsModule ],
  template: `
    <div class="paginator">
      <div *ngFor="let element of currentElements">
        <app-motivation-operations [motivation]="element" ></app-motivation-operations>
      </div>
      <select (change)="updatePageSize()" [(ngModel)]="pageSize">
        <option *ngFor="let nr of pageSizes"> {{nr}}</option>
      </select>
      <button (click)="turnBackPage()"> Previous </button>
      <button> {{currentPageIndex}} / {{totalPageIndex}}</button>
      <button (click)="turnPage()"> Next </button>
    </div>
  `,
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements MihhObserver{
  service:MotivationService=inject(MotivationService)
  startIndex:number=0
  pageSize:number=3
  currentPageIndex:number=1
  totalPageIndex:number=3
  currentElements:IMotivation[]
  motivations=this.service.getAll()
  pageSizes:number[]=[1,2,3,4,5,6]

  updatePageSize(){
    this.totalPageIndex=6/this.pageSize
    this.service.set_page(1,this.pageSize)
    this.updateCurrentElements()
    // this.
  }
  notify() {
    this.updateCurrentElements()
  }
  turnPage(){
    this.service.turn_page()
    this.updateCurrentElements()
  }
  turnBackPage(){
    this.service.turn_back_page()
    this.updateCurrentElements()
  }
  updateCurrentElements(){
    this.currentElements=this.service.getPage()
  }

  constructor() {
    this.currentElements=this.service.getPage()
    this.service.register(this)
    // this.updateCurrentElements()
  }

}
