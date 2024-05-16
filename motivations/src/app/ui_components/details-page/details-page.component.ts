import { Component, inject } from '@angular/core';
import { IFounder } from '../../domain/ifounder';
import { FounderDisplayComponent } from '../founder-display/founder-display.component';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Inject } from '@angular/core';
import { MihhObserver, MotivationService } from '../../services/motivation.service';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [NgFor, FounderDisplayComponent],
  template: `
    <div *ngFor="let element of founders">
      <h1> <b>{{element.name}}</b> </h1>
      <h2>{{element.email}}</h2>
      <br>
      <br>
      <!-- <app-founder-display [founder]="element"]> </app-founder-display> -->
    </div>
  `,
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent implements MihhObserver{
  motivationId:number
  founders:IFounder[]=[{
    name:"dummy",
    email:"gelumail@m.com",
    motivation_id:3,
    id:3
  }]
  route: ActivatedRoute = inject(ActivatedRoute);
  service:MotivationService=inject(MotivationService)
  constructor(){
    this.motivationId=Number(this.route.snapshot.params['id']);
    this.service.register(this)
    // console.log(this.founders)
    this.service.getFoudnersById(this.motivationId).then((response)=>{
      this.founders=response
      console.log(response)
    }).catch((error)=>{

    })
  }
  notify(): void {
  }
}
