import { Injectable } from '@angular/core';
import {IMotivation} from "../domain/imotivation";

@Injectable({
  providedIn: 'root'
})
export class RepoService {
  list:IMotivation[]=[
    {
      id:0,
      name:"To impress that girl",
      strength:1.2
    },
    {
      id:1,
      name:"To be the best",
      strength:1.2
    },
    {
      id:2,
      name:"To be Bold",
      strength:1.2
    },
    {
      id:3,
      name:"To make sth cool",
      strength:5
    },
    {
      id:4,
      name:"To be a real boy",
      strength:2.2
    },
  ]
  constructor() { }
  getAll(){
    return this.list
  }
  remove(id:number){
    let index:number=this.list.findIndex( x=> x.id===id );
    if (index===-1)
      return;
    this.list.splice(index, 1);
  }
  add(newItem:IMotivation){
    this.list.push(newItem)
  }
}
