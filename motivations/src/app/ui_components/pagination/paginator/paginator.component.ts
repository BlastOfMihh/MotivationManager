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
      <app-sort-button></app-sort-button>
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
  pageSize:number=4
  currentPageIndex:number=1
  totalPageIndex:number=1
  currentElements:IMotivation[]
  motivations=this.service.getAll()
  pageSizes:number[]=[]

  updatePageSize(){
    this.updateCurrentElements()
  }
  notify() {
    this.updateCurrentElements()
  }
  turnPage(){
    ++this.currentPageIndex
    this.updateCurrentElements()
  }
  turnBackPage(){
    --this.currentPageIndex
    this.updateCurrentElements()
  }
  updateCurrentElements(){
    let page=this.service.set_page(this.currentPageIndex, this.pageSize)
    this.currentPageIndex=page.index
    this.pageSize=page.size
    console.log("updating the pagination", this.currentPageIndex ,this.pageSize)
    this.currentElements=this.service.getAll()
  }
  constructor() {
    this.currentElements=this.service.getAll()
    this.service.register(this)
    this.updateCurrentElements()
  }

}
