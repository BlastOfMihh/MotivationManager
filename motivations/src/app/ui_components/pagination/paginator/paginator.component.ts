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
import { BarchartComponent } from '../../barchart/barchart.component';


@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [NgFor, CommonModule, NgForOf, MotivationDisplayComponent, MotivationOperationsComponent, SortButtonComponent, FormsModule ],
  template: `
    <table>
      <tr>
        <th> Name </th>
        <th> Strength </th>
        <th> </th>
      </tr>
      <tr *ngFor="let element of currentElements">
        <td [textContent]="element.name | uppercase"> </td>
        <td [textContent]="element.strength"> </td>
        <td>
          <app-motivation-operations [motivation]="element" ></app-motivation-operations>
        </td>
      </tr>
    </table>

    <button (click)="turnBackPage()"> Previous </button>
    {{currentPageIndex}} / {{totalPageIndex}}
    <button (click)="turnPage()"> Next </button>
    <select (change)="updatePageSize()" [(ngModel)]="pageSize">
      <option *ngFor="let nr of pageSizes"> {{nr}}</option>
    </select>
  `,
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements MihhObserver{
  service:MotivationService=inject(MotivationService)
  startIndex:number=0
  pageSize:number=3
  currentPageIndex:number=1
  totalPageIndex:number=3
  currentElements:IMotivation[]=[]
  motivations=this.service.getAll()
  pageSizes:number[]=[1,2,3,4,5,6]

  updatePageSize(){
    this.totalPageIndex=6/this.pageSize
    this.service.set_page(1,this.pageSize)
    this.updateCurrentElements()
    // this.
  }
  notifyChange() {
    this.updateCurrentElements()
  }
  turnPage(){
    this.currentPageIndex++
    this.updateCurrentElements()
  }
  turnBackPage(){
    this.currentPageIndex--
    this.updateCurrentElements()
  }
  updateCurrentElements(){
    this.service.getPage(this.currentPageIndex-1, this.pageSize, "", -1, false).then((resopnse)=>{
      this.currentElements=resopnse.elements
      this.currentPageIndex=resopnse.index+1
    })
  }

  constructor() {
    this.service.getPage(this.currentPageIndex-1, this.pageSize, "", 3, false).then((resopnse)=>{
      this.currentElements=resopnse.elements
    })
    this.service.register(this)
    // this.updateCurrentElements()
  }

}
