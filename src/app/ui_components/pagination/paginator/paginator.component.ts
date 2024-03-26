import {Component, inject} from '@angular/core';
import {CommonModule, NgFor, NgForOf} from "@angular/common";
import {MotivationService, Observer} from "../../../services/motivation.service";
import {IMotivation} from "../../../domain/imotivation";
import {MotivationDisplayComponent} from "../../motiviation-display/motivation-display.component";
import {min} from "rxjs";
import {MotivationOperationsComponent} from "../../motivation-operations/motivation-operations.component";
@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [NgFor, CommonModule, NgForOf, MotivationDisplayComponent, MotivationOperationsComponent],
  template: `
    <div class="paginator">
      <div *ngFor="let element of currentElements">
        <app-motivation-operations [motivation]="element" ></app-motivation-operations>
      </div>
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
  pageSize:number=3
  currentPageIndex:number=1
  totalPageIndex:number=1
  currentElements:IMotivation[]
  motivations=this.service.getAll()

  notify() {
    this.updateCurrentElements()
    if (this.motivations.length%this.pageSize===0)
      this.turnBackPage()
  }

  updateCurrentElements(){
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
  }

}
