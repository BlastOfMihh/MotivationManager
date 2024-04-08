import {Component, inject} from '@angular/core';
import {MotivationService} from "../../services/motivation.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `
    <input [(ngModel)]="nameFilter" >
    <button (click)="update()"> filter </button>

  `,
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  service=inject(MotivationService)
  nameFilter:string=""
  constructor(){
    this.service.register(this)
  }
  update(){
    this.service.filter(this.nameFilter)
  }
  notify(){
    //this.update()
  }
}
