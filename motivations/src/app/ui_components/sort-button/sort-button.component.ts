import {Component, inject} from '@angular/core';
import {MotivationService} from "../../services/motivation.service";

@Component({
  selector: 'app-sort-button',
  standalone: true,
  imports: [],
  template: `
    <button (click)="sort()" >
      Sort
    </button>
  `,
  styleUrl: './sort-button.component.css'
})
export class SortButtonComponent {
  service:MotivationService=inject(MotivationService)
  sort(){
    this.service.sort()
  }
}
