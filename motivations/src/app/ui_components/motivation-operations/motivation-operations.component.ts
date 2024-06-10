import {Component, inject, Input} from '@angular/core';
import {MotivationDisplayComponent} from "../motiviation-display/motivation-display.component";
import {FormsModule} from "@angular/forms";
import {IMotivation} from "../../domain/imotivation";
import {MotivationService} from "../../services/motivation.service";
import {RouterLink} from "@angular/router";
import { NgIf } from '@angular/common';
import { CurrentUserService, UserType} from '../../services/current_user_service';

@Component({
  selector: 'app-motivation-operations',
  standalone: true,
  imports: [MotivationDisplayComponent, FormsModule, RouterLink, NgIf],
  template: `
      <a *ngIf="user_service.hasWriteAcces()" routerLink="/update/{{motivation.id}}"> <button> Update </button> </a>
      <a routerLink="/details/{{motivation.id}}"> <button> Details </button> </a>
      <button *ngIf="user_service.hasWriteAcces()" (click)="remove()" > REMOVE</button>
      <br>
  ` ,
  styleUrl: './motivation-operations.component.css'
})
export class MotivationOperationsComponent {
  @Input()motivation!:IMotivation
  service=inject(MotivationService)
  user_service=inject(CurrentUserService)
  constructor(){
  }
  remove(){
    this.service.remove(this.motivation.id).then((response)=>{
    })
  }
}
