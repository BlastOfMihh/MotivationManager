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

@Injectable({
  providedIn: 'root'
})
export class MotivationService extends MihhObservable{
  filter_name:string=""

  base_url="http://127.0.0.1:5000"
  get_all_url=this.base_url+"/get/all"
  get_url=this.base_url+"/get/"
  remove_url=this.base_url+"/remove"
  add_url=this.base_url+"/add"
  constructor() {
    super()
    this.add(2, "salut")
  }
  getAll():IMotivation[]{
    let data:IMotivation[]=[]
    axios.get(this.get_all_url).then( (response) => {
      for (let x of response.data)
        data.push(x)
      // this.notify()
    }).catch((error)=>{
    })
    return data
  }
  remove(remove_id:number) {
    console.log(remove_id)
    let notify=()=>{this.notify(); console.log("remove"+remove_id)} 
    axios.delete(this.remove_url,
      {
        data: {
          "id":remove_id
        }
      }
    ).then((response)=>{
      console.log(response)
      notify()
    })
  }
  getById(id:number):IMotivation{
    let data:IMotivation={
      name:"s",
      id:0,
      strength:1
    }
    axios.get(this.get_url+'/'+id).then( (response) => {
      data=response.data
    }).then(()=>{
      this.notify()
    }).catch((error)=>{
    })
    return data
  }
  add(strength_:number, name_:string){
    let notify=this.notify
    axios.post(this.add_url, {
      id:2,
      name:name_,
      strength: strength_
    }).then(function (response) {
      console.log(response);
      notify()
    }).catch(function (error) {
      console.log(error);
    });
  }
  update(id:number, strength:number, name:string){
    this.notify()
  }
  sort(){
    axios.put(this.base_url+"/sort").then((response)=>{
      this.notify()
    })
  }
  filter(filter_name:string){
    axios.put(this.base_url+"/filter", {
      name_filter_key:filter_name
    }).then((response)=>{
      this.notify()
    })
  }
  set_page(page_index:number, page_size:number){
    let page={index:page_index, size:page_size}
    axios.put(this.base_url + "/set_page", {
        index: page_index,
        size: page_size
    }).then((response) => {
      response.data;
      page.index=response.data.index
      page.size=response.data.size
    })
    return page
  }
}
