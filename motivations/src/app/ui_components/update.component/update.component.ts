import {Component, inject, Input} from '@angular/core';
import {IMotivation} from "../../domain/imotivation";
import {MihhObservable, MihhObserver, MotivationService} from "../../services/motivation.service";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-update.component',
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `
    <span> Name: </span> <input [(ngModel)]="motivation.name" type="string"> <br>
    <span> Strength: </span> <input [(ngModel)]="motivation.strength" step=".5" min="0" max="5" type="number" >
    <br>
    <button (click)="update()"> Update </button>
  `,
  styleUrl: './update.component.css'
})
export class UpdateComponent implements MihhObserver{
  //@Input()motivation!:IMotivation
  motivation:IMotivation={strength:0.2, id:-1, name:'lame'}
  route: ActivatedRoute = inject(ActivatedRoute);
  service=inject(MotivationService)
  motivationId:number
  constructor(){
    // @ts-ignore
    this.service.register(this)
    this.motivationId=Number(this.route.snapshot.params['id']);
    if(isNaN(this.motivationId))
      this.motivationId=0
    this.service.getById(this.motivationId).then((response)=>{
      let currentMotivation=response
      this.motivation.name=currentMotivation.name
      this.motivation.strength=currentMotivation.strength
    })

  }
  notifyChange(){

  }
  update(){
    try {
      this.service.update(this.motivationId, this.motivation.strength, this.motivation.name)
    } catch (e){
      alert(e)
    }
  }
}
