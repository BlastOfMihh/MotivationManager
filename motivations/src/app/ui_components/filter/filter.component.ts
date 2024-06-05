import {Component, inject} from '@angular/core';
import {MotivationService} from "../../services/motivation.service";
import {FormsModule, NgModel} from "@angular/forms";
import { NgFor } from '@angular/common';
import { IMotivation } from '../../domain/imotivation';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    FormsModule,
    NgFor
  ],
  template: `
    <input [(ngModel)]="nameFilter" >
    <button (click)="update()"> filter </button>
    <!-- <br> -->
    <!-- <select (change)="sortByStrength()" [(ngModel)]="strenghtFilter">
      <option *ngFor="let nr of strenghtOptions"> {{nr}}</option>
    </select>
    <button (click)="sortByStrength()"> filter by strength </button> -->
  `,
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  service=inject(MotivationService)
  nameFilter:string=""
  strenghtOptions:Number[]=[1, 2, 3 ,4 ,5]
  strenghtFilter=4
  constructor(){
  }
  update(){
    this.service.filter(this.nameFilter)
    this.service.getStrengths().then((response)=>{
      this.strenghtOptions=response
    })
  }
  sortByStrength(){
    this.service.filterStrength(this.strenghtFilter)
  }
}
