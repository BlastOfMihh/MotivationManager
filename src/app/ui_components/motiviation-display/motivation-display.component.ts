import {Component, Input} from '@angular/core';
import {UpperCasePipe} from "@angular/common";
import {IMotivation} from "../../domain/imotivation";
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'app-motiviation-display',
  standalone: true,
  imports: [
    UpperCasePipe,
    // RouterTestingModule
  ],
  template:`
    <h2> {{motivation.name | uppercase}} </h2>
    <span> Strength : {{motivation.strength}} </span>
  `,
  styleUrl: './motivation-display.component.css'
})
export class MotivationDisplayComponent {
  @Input() motivation!: IMotivation
  constructor() {
  }
}
