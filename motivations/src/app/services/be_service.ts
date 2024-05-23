import { IMotivation } from "../domain/imotivation"
import { IMotivationService } from "./imotivation_service"
import { inject } from "@angular/core";


import axios from 'axios';
import { OperationsQueue } from "./operations_queue";
import { IPage } from "../domain/page";

export class BEService implements IMotivationService{
  filter_name:string=""
  //base_url="http://127.0.0.1:5000"
  base_url="https://mihh-qrpw2zrfcq-oe.a.run.app"
  get_all_url=this.base_url+"/get/all"
  get_url=this.base_url+"/get/"
  remove_url=this.base_url+"/remove"
  add_url=this.base_url+"/add"

  data:IMotivation[]=[]

  status:number=0
  STATUS_ON:number=1
  STATUS_OFF:number=0
  
  storageQueue = inject(OperationsQueue)

  constructor() {
    this.setStatus()
  }
  setData(): void {
    throw new Error("Method not implemented.");
  }
  addWithId(id_: number, strenght_: number, name_: string): Promise<IMotivation> {
    throw new Error("Method not implemented in BESErvice.");
  }

  setStatus(){
    axios.get(this.base_url+"/ping").then((response) => {
        this.status=this.STATUS_ON
    }).catch((error) => {
        this.status=this.STATUS_OFF
    });
  }
  getStatus(){
    this.setStatus()
    return this.status
  }

  execute_queue(){
  }

  async getAll(): Promise<IMotivation[]> {
    return new Promise<IMotivation[]>((resolve, reject) => {
      axios.get(this.get_all_url)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
    })
  }
  fetchData():Boolean{
    let fetched=false
    if (this.getStatus()==this.STATUS_ON){
      let pending_operations = this.storageQueue.getAllAndPop()
      for (let operation of pending_operations){
        let operation_name=operation[0]
        let operation_arguments=operation[1]
        fetched=true
        switch(operation_name){
          case "add":
            alert("adding operation in be_service")
            this.add(operation_arguments[0], operation_arguments[1])
            break;
          case "remove":
            alert("removing operation in be_service")
            this.remove(operation_arguments[0])
            break;
          case "update":
            alert("updating operation in be_service")
            this.update(operation_arguments[0], operation_arguments[1], operation_arguments[2])
            break;
        } 
      }
    }
    return fetched
  }
  async getPage(index:number, size:number, name_key:string, strength_key:number, sort_by_name:Boolean): Promise<IPage> {
    this.setStatus()
    return new Promise((resolve, reject)=>{
      axios.post(this.base_url+"/page", 
        {
          "index": index,
          "size": size,
          "strength_key": strength_key,
          "sort_by_name": sort_by_name
        },
        {headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }}
    ).then((response)=>{
        console.log(response.data)
        resolve(response.data)
      })
      .catch((reason)=>{
        reject(reason)
      })
    })
  }
  remove(remove_id:number): Promise<void> {
    this.setStatus()
    if (this.getStatus()===this.STATUS_OFF){
      this.storageQueue.add("remove", [remove_id])
      return new Promise<void>((resolve, reject)=>{
        reject("connection looost :{")
      })
    }
    return new Promise<void>((resolve, reject) => {
      axios.delete(this.remove_url, {
        data: {
          "id": remove_id
        }
      })
      .then((response) => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
    });
  }
  getById(id:number): Promise<IMotivation> {
    this.setStatus()
    let data:IMotivation={
      id:id,
      name:"_",
      strength:0
    }
    return new Promise<IMotivation>((resolve, reject) => {
      axios.get(this.base_url+"/get/"+id).then((response)=>{
        data.name=response.data.name
        data.strength=response.data.strength
        resolve(data);
      }).catch((error)=>{
        reject(error);
      });
    });
  }
  async add(strength_:number, name_:string): Promise<IMotivation> {
    if (this.getStatus()==this.STATUS_OFF){
        alert('connection lost to server')
        this.storageQueue.add("add", [strength_, name_])
        return new Promise<IMotivation>((resolve, reject) => {
          reject("conneciton lost")
        })
  }
  else {
      alert("oke")
      return new Promise<IMotivation>((resolve, reject) => {
      axios.post(this.add_url, {
          id:2,
            name:name_,
            strength: strength_
        }).then(function (response) {
            resolve(response.data);
        }).catch(function (error) {
            reject(error);
        });
        });
    }
  }
  async update(id_:number, strength_:number, name_:string): Promise<void> {
    this.setStatus()
    if (this.getStatus()===this.STATUS_OFF){
      alert('connection lost to server')
      this.storageQueue.add("update", [id_, strength_, name_])
      return new Promise<void>((resolve, reject)=>{
        reject("connection lost :P")
      })
    }
    return axios.put(this.base_url+"/update/"+id_, {
      id:id_,
      strength:strength_,
      name:name_
    });
  }
  async sort(): Promise<void> {
    this.setStatus()
    return axios.put(this.base_url+"/sort")
  }
  async filter(filter_name:string): Promise<void> {
    this.setStatus()
    return axios.put(this.base_url+"/filter", {
      name_filter_key:filter_name
    })
  }

  turn_page(): Promise<void> {
    this.setStatus()
    return axios.put(this.base_url + "/page/turn")
  }
  turn_back_page():Promise<void>{
    this.setStatus()
    return axios.put(this.base_url + "/page/turn_back")
  }
  
  set_page(page_index:number, page_size:number): Promise<void> { // modify if needed 
    this.setStatus()
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
    this.setStatus()
    return axios.put(this.base_url+"/filter/strength", {
      strength_key:strenght
    })
  }

  getStrengths(){
    this.setStatus()
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
