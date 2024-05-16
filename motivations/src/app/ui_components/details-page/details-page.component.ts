import { Component, inject } from '@angular/core';
import { IFounder } from '../../domain/ifounder';
import { FounderDisplayComponent } from '../founder-display/founder-display.component';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [NgFor, FounderDisplayComponent],
  template: `
    <div *ngFor="let element of founders">
      <app-founder-display [founder]="element"]> </app-founder-display>
    </div>
  `,
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent {
  motivationId:number
  founders:IFounder[]=[]
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor(){
    this.motivationId=Number(this.route.snapshot.params['id']);
  }
}
