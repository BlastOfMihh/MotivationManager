import {Component, inject} from '@angular/core';
import {CommonModule, NgFor, NgForOf} from "@angular/common";
import {MotivationService} from "../../../services/motivation.service";
import {IMotivation} from "../../../domain/imotivation";
import {MotivationDisplayComponent} from "../../motiviation-display/motivation-display.component";
import {MotivationOperationsComponent} from "../../motivation-operations/motivation-operations.component";
import {SortButtonComponent} from "../../sort-button/sort-button.component";
import {FormsModule} from "@angular/forms";
import { SocketOne } from '../../app_component/app.component';

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
    <button style="background-color: white; color:black">
      {{currentPageIndex}} / {{totalPageIndex}}
    </button>
    <button (click)="turnPage()"> Next </button>
    <select (change)="updatePageSize()" [(ngModel)]="pageSize">
      <option *ngFor="let nr of pageSizes"> {{nr}}</option>
    </select>
  `,
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  service:MotivationService=inject(MotivationService)
  startIndex:number=0
  pageSize:number=3
  currentPageIndex:number=1
  totalPageIndex:number=3
  currentElements:IMotivation[]=[]
  motivations=this.service.getAll()
  pageSizes:number[]=[1,2,3,4,5,6]
  socket=inject(SocketOne)

  updatePageSize(){
    this.totalPageIndex=Math.ceil(this.pageSizes[this.pageSizes.length-1]/this.pageSize)
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
      while(this.pageSizes.length>0)
        this.pageSizes.pop()
      let pageIncrement=1
      for (let pageSize=1; pageSize<=resopnse.max_page_size;pageSize+=pageIncrement){
        this.pageSizes.push(pageSize);
        if (pageSize>100)
          pageIncrement=100
      }
      
    })
  }
  constructor() {
    this.socket.on('refresh', (data:any)=>{
      this.updatePageSize()
    })
    this.updatePageSize()
  }
}
