import {inject, Injectable} from '@angular/core';
import {IMotivation} from "../domain/imotivation";
import {InliningMode} from "@angular/compiler-cli/src/ngtsc/typecheck/src/context";
import {normalizeOptionsMiddleware} from "@angular/cli/src/command-builder/utilities/normalize-options-middleware";

import axios from 'axios';


export class MihhObservable{
  registeredObjects:MihhObserver[]=[]
  register(observer:MihhObserver){
    this.registeredObjects.push(observer)
  }
  notify(){
    for(let i=0; i<this.registeredObjects.length; ++i){
      this.registeredObjects[i].notify()
    }
  }
}

export class MihhObserver{
  notify(){
  };
}

class IMotivationService{
  constructor() {

  }
  async getAll():Promise<IMotivation[]>{
    return []
  }
  fetchData(){

  }
  async getPage():Promise<IMotivation[]>{
    return []
  }
  async remove(remove_id:number) {

  }
  async getById(id:number):Promise<IMotivation>{
    return new Promise<IMotivation>((response, reject)=>{})
  }

  async add(strength_:number, name_:string){

  }

  async update(id_:number, strength_:number, name_:string){
  }
  async sort(){
  }
  async filter(filter_name:string){
  }

  async turn_page(){
  }
  async turn_back_page(){
  }
  
  async set_page(page_index:number, page_size:number){
  }

  async filterStrength(strenght:number){
  }

  getStrengths(){
  }

}

class DualService implements IMotivationService{
  currentService:IMotivationService
  childService:IMotivationService
  constructor(currentService:IMotivationService, childService:IMotivationService){
    this.currentService=currentService
    this.childService=childService
  }
  getAll(): Promise<IMotivation[]> {
    return new Promise<IMotivation[]>((resolve, reject)=>{
      // this.currentService.getAll().then((response)=>{
      //   resolve(response)
      // }).catch((errror)=>{
      //   reject(errror)
      // })

      this.childService.getAll().then((response)=>{
        resolve(response)
      }).catch((errror)=>{
        reject(errror)
      })
    })
    // throw new Error('Method not implemented.');
  }
  fetchData(): void {
    throw new Error('Method not implemented.');
  }
  getPage(): Promise<IMotivation[]> {
    throw new Error('Method not implemented.');
  }
  remove(remove_id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getById(id: number): Promise<IMotivation> {
    throw new Error('Method not implemented.');
  }
  add(strength_: number, name_: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(id_: number, strength_: number, name_: string): Promise<void> {
    throw new Error('Method not implemented.');
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
  getStrengths(): void {
    throw new Error('Method not implemented.');
  }
}

export class BEService implements IMotivationService{
  filter_name:string=""

  base_url="http://127.0.0.1:5000"
  get_all_url=this.base_url+"/get/all"
  get_url=this.base_url+"/get/"
  remove_url=this.base_url+"/remove"
  add_url=this.base_url+"/add"

  data:IMotivation[]=[]

  constructor() {
  }
  getAll(): Promise<IMotivation[]> {
    return new Promise<IMotivation[]>( (resolve, reject) => {
      axios.get(this.get_all_url)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  }
  fetchData(){
  }
  // getPage():IMotivation[]{
  //   let data:IMotivation[]=[]
  //   axios.get(this.base_url+"/get/page")
  //   .then( (response) => {
  //     for (let x of response.data)
  //       data.push(x)
  //   })
  //   .catch((error)=>{ })
  //   return data
  // }
  getPage(): Promise<IMotivation[]> {
    return new Promise((resolve, reject)=>{
      axios.get(this.base_url+"/get/page").then((response)=>{
        resolve(response.data)
      })
      .catch((reason)=>{
        reject(reason)
      })
    })
  }
  remove(remove_id:number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      axios.delete(this.remove_url, {
        data: {
          "id": remove_id
        }
      })
      .then((response) => {
        console.log(response);
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  }
  getById(id:number): Promise<IMotivation> {
    let data:IMotivation={
      id:id,
      name:"_",
      strength:0
    }
    return new Promise<IMotivation>((resolve, reject) => {
      axios.get(this.base_url+"/get/"+id).then((response)=>{
        data.name=response.data.name
        data.strength=response.data.strength
        console.log(data)
        resolve(data);
      }).catch((error)=>{
        reject(error);
      });
    });
  }
  add(strength_:number, name_:string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      axios.post(this.add_url, {
        id:2,
        name:name_,
        strength: strength_
      }).then(function (response) {
        console.log(response);
        resolve();
      }).catch(function (error) {
        console.log(error);
        reject(error);
      });
    });
  }
  update(id_:number, strength_:number, name_:string): Promise<void> {
    return axios.put(this.base_url+"/update/"+id_, {
      id:id_,
      strength:strength_,
      name:name_
    });
  }
  sort(): Promise<void> {
    return axios.put(this.base_url+"/sort")
  }
  filter(filter_name:string): Promise<void> {
    return axios.put(this.base_url+"/filter", {
      name_filter_key:filter_name
    })
  }

  turn_page(): Promise<void> {
    return axios.put(this.base_url + "/page/turn")
  }
  turn_back_page():Promise<void>{
    return axios.put(this.base_url + "/page/turn_back")
  }
  
  set_page(page_index:number, page_size:number): Promise<void> { // modify if needed 
    let page={index:page_index, size:page_size}
    return axios.put(this.base_url + "/set_page", {
        index: page_index,
        size: page_size
    }).then((response) => {
      response.data;
      page.index=response.data.index
      page.size=response.data.size
    });
  }

  filterStrength(strenght:number): Promise<void> {
    return axios.put(this.base_url+"/filter/strength", {
      strength_key:strenght
    })
  }

  getStrengths(){
    let data:number[]=[1, 2, 3]
    while(data.length>0)
      data.pop()
    axios.get(this.base_url+"/get/strengths").then((response)=>{
      for (let x of response.data)
        data.push(x)
    })
    return data
  }
}

class MemoryService implements IMotivationService{
  data:IMotivation[]=[]
  constructor(){
  }
  getAll(): Promise<IMotivation[]> {
    return new Promise<IMotivation[]>((accept, reject)=>{
      accept(this.data)
    })
    // throw new Error('Method not implemented.');
  }
  fetchData(): void {
    throw new Error('Method not implemented.');
  }
  getPage(): Promise<IMotivation[]> {
    throw new Error('Method not implemented.');
  }
  remove(remove_id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getById(id: number): Promise<IMotivation> {
    throw new Error('Method not implemented.');
  }
  add(strength_: number, name_: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(id_: number, strength_: number, name_: string): Promise<void> {
    throw new Error('Method not implemented.');
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
  getStrengths(): void {
    throw new Error('Method not implemented.');
  }

}

@Injectable({
  providedIn: 'root'
})
export class MotivationService extends MihhObservable implements IMotivationService{
  wrapperService:IMotivationService
  frontEndService:IMotivationService
  backEndService:IMotivationService
  constructor(){
    super()
    this.frontEndService=new MemoryService()
    this.backEndService=new BEService()
    this.wrapperService=new DualService(this.frontEndService, this.backEndService)
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
  fetchData(): void {
    throw new Error('Method not implemented.');
  }
  getPage(): Promise<IMotivation[]> {
    return new Promise((resolve, reject)=>{
      this.getAll().then((response)=>{
        resolve(response)
      }).catch((reason)=>{
        reject(reason)
      })
    })
  }
  remove(remove_id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getById(id: number): Promise<IMotivation> {
    throw new Error('Method not implemented.');
  }
  add(strength_: number, name_: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(id_: number, strength_: number, name_: string): Promise<void> {
    throw new Error('Method not implemented.');
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
}
