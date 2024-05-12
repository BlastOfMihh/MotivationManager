import {Component, inject} from '@angular/core';
import { MotivationDisplayComponent } from "../motiviation-display/motivation-display.component";
import {MotivationService} from "../../services/motivation.service";
import {NgFor} from "@angular/common";
import {IMotivation} from "../../domain/imotivation";
import {MotivationOperationsComponent} from "../motivation-operations/motivation-operations.component";
import {AddMotivationComponent} from "../add-motivation/add-motivation.component";
import {RouterLink} from "@angular/router";
import {PaginatorComponent} from "../pagination/paginator/paginator.component";
import {FilterComponent} from "../filter/filter.component";
import { SortButtonComponent } from '../sort-button/sort-button.component';
import { NetworkStatusCheckerComponent } from '../../network-status-checker/network-status-checker.component';

@Component({
  selector: 'app-motivationslist',
  standalone: true,
  imports: [NetworkStatusCheckerComponent,MotivationDisplayComponent, NgFor, MotivationOperationsComponent, AddMotivationComponent, RouterLink, PaginatorComponent, FilterComponent, SortButtonComponent],
  template: `
    <a routerLink="/add"> <button> Add </button> </a>
    <br>
    <app-network-status-checker> </app-network-status-checker>
    <br>
    <app-filter> </app-filter>
    <br>
    <app-sort-button></app-sort-button>
    <br>
    <app-paginator></app-paginator>
    <!-- <a routerLink="/barchart"> <button> Barchart </button> <a> -->

<!--    <div *ngFor="let motivation of motivations">-->
<!--      <app-motivation-operations [motivation]="motivation"></app-motivation-operations>-->
<!--    </div>-->
  `,
  styleUrl: './motivationlist.component.css'
})
export class Motivationlist {
  motivations:IMotivation[]
  constructor(service:MotivationService) {
    this.motivations=[]
    service.getAll().then((response)=>{
      this.motivations=response
    })
  }

}
