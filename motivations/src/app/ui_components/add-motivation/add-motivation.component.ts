import {Component, inject} from '@angular/core';
import {MotivationService} from "../../services/motivation.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-motivation',
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `
    <section>
      <input [(ngModel)]="name" placeholder="Enter name" >
      <input [(ngModel)]="strength" placeholder="Enter strength" type="number" step="0.1" >
      <br>
      <button (click)="submit()"> Submit </button>
    </section>
  `,
  styleUrl: './add-motivation.component.css'
})
export class AddMotivationComponent {
  service=inject(MotivationService)
  strength:number=0
  name:string="_"
  submit(){
    try {
      this.service.add(this.strength, this.name)
    }catch (e){
      alert(e)
    }
  }
}
