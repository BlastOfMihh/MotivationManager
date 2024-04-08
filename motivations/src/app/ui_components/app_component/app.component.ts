import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MotivationOperationsComponent} from "../motivation-operations/motivation-operations.component";
import {MotivationDisplayComponent} from "../motiviation-display/motivation-display.component";
import {Motivationlist} from "../motivationslist/motivationlist";
import {HomeBarComponent} from "../home-bar/home-bar.component";
import {BarchartComponent} from "../barchart/barchart.component";
import {FilterComponent} from "../filter/filter.component";

// @ts-ignore
// @ts-ignore

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MotivationOperationsComponent, MotivationDisplayComponent, Motivationlist, HomeBarComponent, BarchartComponent, FilterComponent],
  template: `
    <div style="text-align: center">
      <app-home-bar></app-home-bar>
      <router-outlet></router-outlet>
      <app-barchart></app-barchart>
    </div>
    `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Motivations';
}
