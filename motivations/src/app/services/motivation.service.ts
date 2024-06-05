import {inject, Injectable} from '@angular/core';
import {IMotivation} from "../domain/imotivation";
import {InliningMode} from "@angular/compiler-cli/src/ngtsc/typecheck/src/context";
import {normalizeOptionsMiddleware} from "@angular/cli/src/command-builder/utilities/normalize-options-middleware";

import { IMotivationService } from './imotivation_service';
import { MemoryService } from './memory_service';
import { DualService } from './dual_service';
import { BEService } from './be_service';
import { IPage } from '../domain/page';
import { IFounder } from '../domain/ifounder';
import axios from 'axios';


export class MihhObservable{
  registeredObjects:MihhObserver[]=[]
  register(observer:MihhObserver){
    this.registeredObjects.push(observer)
  }
  notifyObservers(){
    for(let i=0; i<this.registeredObjects.length; ++i){
      this.registeredObjects[i].notifyChange()
    }
  }
}
export class MihhObserver{
  notifyChange(){
  };
}


@Injectable({
  providedIn: 'root'
})
export class MotivationService extends MihhObservable implements IMotivationService{
  wrapperService:DualService
  frontEndService:IMotivationService
  backEndService:IMotivationService
  base_url="http://127.0.0.1:5000"
  // base_url="https://mihh-qrpw2zrfcq-oe.a.run.app"
  constructor(){
    super()
    this.backEndService=new BEService()
    this.frontEndService=new MemoryService()
    this.wrapperService=new DualService(this.frontEndService, this.backEndService)
  }
  setData(data: IMotivation[]): void {
    throw new Error('Method not implemented.');
  }
  addWithId(id_: number, strenght_: number, name_: string): Promise<IMotivation> {
    throw new Error('Method not implemented. In motivatoin Service');
  }
  getAll(): Promise<IMotivation[]> {
    return new Promise((resolve, reject)=>{
      this.wrapperService.getAll().then((response)=>{
        resolve(response)
      }).catch((reason)=>{
        reject(reason)
      })
    });
  }
  fetchData(): Boolean {
    throw new Error('Method not implemented.');
  }
  async getPage(index:number, size:number, name_key:string, strength_key:number, sort_by_name:Boolean): Promise<IPage> {
    return new Promise((resolve, reject)=>{
      this.wrapperService.getPage(index,size,name_key,strength_key,sort_by_name).then((response)=>{
        resolve(response)
      }).catch((reason)=>{
        reject(reason)
      })
    })
  }
  remove(remove_id: number): Promise<void> {
    return new Promise<void>((accept, reject)=>{
      this.wrapperService.remove(remove_id).then((response)=>{
        this.notifyObservers()
        accept(response)
      })
    })
  }
  getById(id: number): Promise<IMotivation> {
    return new Promise<IMotivation>((accept, reject)=>{
      this.wrapperService.getById(id).then((response)=>{
        accept(response)
      })
    })
  }
  add(strength_: number, name_: string): Promise<IMotivation> {
    return new Promise<IMotivation>((accept, reject)=>{
      this.wrapperService.add(strength_, name_).then((response)=>{
        this.notifyObservers()
        accept(response)
      })
    })
  }
  update(id_: number, strength_: number, name_: string): Promise<void> {
    return new Promise<void>((accept, reject)=>{
      this.wrapperService.update(id_, strength_, name_).then((response)=>{
        this.notifyObservers()
        accept(response)
      }).catch((reason)=>{
        reject(reason)
      })
    })
  }
  sort(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  filter(filter_name: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  turn_page(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  turn_back_page(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  set_page(page_index: number, page_size: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  filterStrength(strenght: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getStrengths(): Promise<number[]> {
    throw new Error('Method not implemented.');
  }
  async getFoudnersById(id: number): Promise<IFounder[]> {
    return new Promise<IFounder[]>((resolve, reject) => {
      axios.get(this.base_url + "/motivation/founders/" + id).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
