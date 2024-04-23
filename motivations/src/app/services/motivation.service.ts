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
  getAll():IMotivation[]{
    return []
  }
  fetchData(){

  }
  getPage():IMotivation[]{
    return []
  }
  remove(remove_id:number) {

  }
  getById(id:number):IMotivation{

  }

  add(strength_:number, name_:string){

  }

  update(id_:number, strength_:number, name_:string){
  }
  sort(){
  }
  filter(filter_name:string){
  }

  turn_page(){
  }
  turn_back_page(){
  }
  
  set_page(page_index:number, page_size:number){
  }

  filterStrength(strenght:number){
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
  getAll(): IMotivation[] {
    throw new Error('Method not implemented.');
  }
  fetchData(): void {
    throw new Error('Method not implemented.');
  }
  getPage(): IMotivation[] {
    throw new Error('Method not implemented.');
  }
  remove(remove_id: number): void {
    this.childService.remove(remove_id)
    throw new Error('Method not implemented.');
  }
  getById(id: number): IMotivation {
    throw new Error('Method not implemented.');
  }
  add(strength_: number, name_: string): void {
    this.childService.add(strength_, name_)
    throw new Error('Method not implemented.');
  }
  update(id_: number, strength_: number, name_: string): void {
    this.childService.update(id_, strength_, name_)
    throw new Error('Method not implemented.');
  }
  sort(): void {
    this.childService.sort()
    throw new Error('Method not implemented.');
  }
  filter(filter_name: string): void {
    this.childService.filter(filter_name)
    throw new Error('Method not implemented.');
  }
  turn_page(): void {
    this.childService.turn_page()
    throw new Error('Method not implemented.');
  }
  turn_back_page(): void {
    this.childService.turn_back_page()
    throw new Error('Method not implemented.');
  }
  set_page(page_index: number, page_size: number): void {
    throw new Error('Method not implemented.');
  }
  filterStrength(strenght: number): void {
    // this.childService.filterStrength(strenght)
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
  getAll():IMotivation[]{
    return this.data
    let data:IMotivation[]=[]
    axios.get(this.get_all_url)
    .then( (response) => {
      for (let x of response.data)
        data.push(x)
    })
    .catch((error)=>{ })
    return data
  }
  fetchData(){

  }
  getPage():IMotivation[]{
    let data:IMotivation[]=[]
    axios.get(this.base_url+"/get/page")
    .then( (response) => {
      for (let x of response.data)
        data.push(x)
    })
    .catch((error)=>{ })
    return data
  }
  remove(remove_id:number) {
    axios.delete(this.remove_url,
      {
        data: {
          "id":remove_id
        }
      }
    ).then((response)=>{
      console.log(response)
    })
  }
  getById(id:number):IMotivation{
    let data:IMotivation={
      id:id,
      name:"_",
      strength:0
    }
    axios.get(this.base_url+"/get/"+id).then((response)=>{
      data.name=response.data.name
      data.strength=response.data.strength
      console.log(data)
      // this.notify()
    }).catch((error)=>{
    })
    console.log(data)
    return data
  }
  add(strength_:number, name_:string){
    axios.post(this.add_url, {
      id:2,
      name:name_,
      strength: strength_
    }).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }
  update(id_:number, strength_:number, name_:string){
    axios.put(this.base_url+"/update/"+id_, {
      id:id_,
      strength:strength_,
      name:name_
    })
    // axios.post\(this.base_url+"/sort").then((response)=>{
    //   this.notify()
    // })
  }
  sort(){
    axios.put(this.base_url+"/sort").then((response)=>{
    })
  }
  filter(filter_name:string){
    axios.put(this.base_url+"/filter", {
      name_filter_key:filter_name
    }).then((response)=>{
    })
  }

  turn_page(){
    axios.put(this.base_url + "/page/turn")
    .then((response)=>{
    })
  }
  turn_back_page(){
    axios.put(this.base_url + "/page/turn_back")
    .then((response)=>{
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

  filterStrength(strenght:number){
    axios.put(this.base_url+"/filter/strength", {
      strength_key:strenght
    }).then((response)=>{
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



@Injectable({
  providedIn: 'root'
})
export class MotivationService extends MihhObservable implements IMotivationService{
  filter_name:string=""

  base_url="http://127.0.0.1:5000"
  get_all_url=this.base_url+"/get/all"
  get_url=this.base_url+"/get/"
  remove_url=this.base_url+"/remove"
  add_url=this.base_url+"/add"

  data:IMotivation[]=[]
  constructor() {
    super()
  }
  getAll():IMotivation[]{
    return this.data
    let data:IMotivation[]=[]
    axios.get(this.get_all_url)
    .then( (response) => {
      for (let x of response.data)
        data.push(x)
    })
    .catch((error)=>{ })
    return data
  }
  fetchData(){

  }
  getPage():IMotivation[]{
    let data:IMotivation[]=[]
    axios.get(this.base_url+"/get/page")
    .then( (response) => {
      for (let x of response.data)
        data.push(x)
    })
    .catch((error)=>{ })
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
      id:id,
      name:"_",
      strength:0
    }
    axios.get(this.base_url+"/get/"+id).then((response)=>{
      data.name=response.data.name
      data.strength=response.data.strength
      console.log(data)
      // this.notify()
    }).catch((error)=>{
    })
    console.log(data)
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
  update(id_:number, strength_:number, name_:string){
    axios.put(this.base_url+"/update/"+id_, {
      id:id_,
      strength:strength_,
      name:name_
    })
    // axios.post\(this.base_url+"/sort").then((response)=>{
    //   this.notify()
    // })
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

  turn_page(){
    axios.put(this.base_url + "/page/turn")
    .then((response)=>{
      this.notify()
    })
  }
  turn_back_page(){
    axios.put(this.base_url + "/page/turn_back")
    .then((response)=>{
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
      this.notify()
    })
    return page
  }

  filterStrength(strenght:number){
    axios.put(this.base_url+"/filter/strength", {
      strength_key:strenght
    }).then((response)=>{
      this.notify()
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
