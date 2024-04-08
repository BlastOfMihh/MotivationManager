import {Component, inject} from '@angular/core';
import {CommonModule, NgFor, NgForOf} from "@angular/common";
import {MotivationService, Observer} from "../../../services/motivation.service";
import {IMotivation} from "../../../domain/imotivation";
import {MotivationDisplayComponent} from "../../motiviation-display/motivation-display.component";
import {min} from "rxjs";
import {MotivationOperationsComponent} from "../../motivation-operations/motivation-operations.component";
import {SortButtonComponent} from "../../sort-button/sort-button.component";
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [NgFor, CommonModule, NgForOf, MotivationDisplayComponent, MotivationOperationsComponent, SortButtonComponent, FormsModule],
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
export class PaginatorComponent implements Observer{
  service:MotivationService=inject(MotivationService)
  startIndex:number=0
  pageSize:number=4
  currentPageIndex:number=1
  totalPageIndex:number=1
  currentElements:IMotivation[]
  motivations=this.service.getAll()
  pageSizes:number[]=[]

  updatePageSize(){
    this.startIndex=0
    this.currentPageIndex=1
    this.totalPageIndex=1
    this.updateCurrentElements()
  }
  notify() {
    this.updateCurrentElements()
    if (this.motivations.length%this.pageSize===0)
      this.turnBackPage()
  }

  updateCurrentElements(){
    //this.motivations=this.service.getAll()

    while (this.pageSizes.length>0)
      this.pageSizes.pop()
    for (let i=1; i<=this.motivations.length; ++i)
      this.pageSizes.push(i)
    //page sizes


    while(this.currentElements.length>0)
      this.currentElements.pop()
    for (let i=this.startIndex; i<Math.min(this.startIndex+this.pageSize, this.motivations.length) ; ++i)
      this.currentElements.push(this.motivations[i])
    this.totalPageIndex=Math.ceil(this.motivations.length/this.pageSize)
   // if (this.motivations.length%this.pageSize==0)
   //   this.totalPageIndex++
  }
  turnPage(){
    if (this.startIndex + this.pageSize -1 >=this.motivations.length-1){
      return
    }
    this.startIndex+=this.pageSize
    this.currentPageIndex++
    this.updateCurrentElements()
  }
  turnBackPage(){
    if (this.currentPageIndex-1<=0)
      return
    this.currentPageIndex--
    this.startIndex-=this.pageSize
    this.updateCurrentElements()
  }
  constructor() {
    this.currentElements=this.motivations.slice(this.startIndex, this.startIndex+this.pageSize-1)
    this.updateCurrentElements()
    this.service.register(this)
    for (let i=1; i<=this.motivations.length; ++i)
      this.pageSizes.push(i)
  }

}
