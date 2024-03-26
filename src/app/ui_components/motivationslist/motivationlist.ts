import {Component, inject} from '@angular/core';
import { MotivationDisplayComponent } from "../motiviation-display/motivation-display.component";
import {MotivationService} from "../../services/motivation.service";
import {NgFor} from "@angular/common";
import {IMotivation} from "../../domain/imotivation";
import {MotivationOperationsComponent} from "../motivation-operations/motivation-operations.component";
import {AddMotivationComponent} from "../add-motivation/add-motivation.component";
import {RouterLink} from "@angular/router";
import {PaginatorComponent} from "../pagination/paginator/paginator.component";

@Component({
  selector: 'app-motivationslist',
  standalone: true,
  imports: [MotivationDisplayComponent, NgFor, MotivationOperationsComponent, AddMotivationComponent, RouterLink, PaginatorComponent],
  template: `
    <a routerLink="/add"> <button> Add </button> </a>
    <app-paginator></app-paginator>
<!--    <div *ngFor="let motivation of motivations">-->
<!--      <app-motivation-operations [motivation]="motivation"></app-motivation-operations>-->
<!--    </div>-->
  `,
  styleUrl: './motivationlist.component.css'
})
export class Motivationlist {
  motivations:IMotivation[]
  constructor(service:MotivationService) {
    this.motivations=service.getAll()
  }

}
