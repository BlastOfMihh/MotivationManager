import {Component, inject, Input} from '@angular/core';
import {MotivationDisplayComponent} from "../motiviation-display/motivation-display.component";
import {FormsModule} from "@angular/forms";
import {IMotivation} from "../../domain/imotivation";
import {MotivationService} from "../../services/motivation.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-motivation-operations',
  standalone: true,
  imports: [MotivationDisplayComponent, FormsModule, RouterLink],
  template: `
      <!-- <app-motiviation-display [motivation]="motivation"></app-motiviation-display> -->
      <a routerLink="/update/{{motivation.id}}"> <button> Update </button> </a>
      <a routerLink="/details/{{motivation.id}}"> <button> Details </button> </a>
      <button (click)="remove()" > REMOVE</button>
      <br>
  ` ,
  styleUrl: './motivation-operations.component.css'
})
export class MotivationOperationsComponent {
  @Input()motivation!:IMotivation
  service=inject(MotivationService)
  constructor(){
  }
  remove(){
    this.service.remove(this.motivation.id).then((response)=>{
    })
  }
}
