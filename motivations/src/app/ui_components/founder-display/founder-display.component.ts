import { Component, Input } from '@angular/core';
import { IFounder } from '../../domain/ifounder';

@Component({
  selector: 'app-founder-display',
  standalone: true,
  imports: [],
  template:`
    <h2> {{founder.name}} </h2>
    <span> Email : {{founder.email}} </span>
  `,
  styleUrl: './founder-display.component.css'
})
export class FounderDisplayComponent {
  @Input() founder!: IFounder
}
