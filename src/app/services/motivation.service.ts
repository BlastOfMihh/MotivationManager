import {inject, Injectable} from '@angular/core';
import {IMotivation} from "../domain/imotivation";
import {InliningMode} from "@angular/compiler-cli/src/ngtsc/typecheck/src/context";
import {normalizeOptionsMiddleware} from "@angular/cli/src/command-builder/utilities/normalize-options-middleware";
import {RepoService} from "../repos/repo.service";



export class Observable{
  registeredObjects:Observer[]=[]
  register(observer:Observer){
    this.registeredObjects.push(observer)
  }
  notify(){
    for(let i=0; i<this.registeredObjects.length; ++i){
      this.registeredObjects[i].notify()
    }
  }
}

export class Observer{
  notify(){
  };
}

@Injectable({
  providedIn: 'root'
})
export class MotivationService extends Observable{
  repo=inject(RepoService)
  constructor() {
    super()
  }
  getAll():IMotivation[]{
    return this.repo.getAll()
  }
  remove(id:number) {
    if (this.getAll().find(x=>x.id===id)===undefined)
      throw new Error("Number not found")
    this.repo.remove(id)
    this.notify()
  }
  getById(id:number):IMotivation{
    let searchResult=this.repo.getAll().find((x: { id: number; })=>x.id===id)
    if (searchResult===undefined)
      throw new Error("Argument not in thing");
    return searchResult
  }
  getNewId(){
    return this.getAll().length;
  }
  validStrength(strength:number){
    return (strength>=0 && strength<=5)
  }
  valid(strength:number, name:string){
    return this.validStrength(strength) && this.repo.getAll().find(x=>x.name===name)===undefined
  }
  add(strength:number, name:string){
    if (!this.valid(strength, name))
      throw new Error(`Make sure that the introduced motivation:
          - has 0<=strength<=5
          - its name is unique
        `)
    this.repo.add({
      id:this.getNewId(),
      name:name,
      strength:strength
    })
    this.notify()
  }
  update(id:number, strength:number, name:string){
    let motivation=this.getById(id)
    if (!this.validStrength(strength))
      throw new Error(`Make sure that that the new motivation:
          - has 0<=strength<=5
          - its name is unique
        `)
    motivation.name=name ;
    motivation.strength=strength;
    this.notify()
  }
}
