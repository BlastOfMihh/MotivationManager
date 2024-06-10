import { IMotivation } from "../domain/imotivation"
import { IMotivationService } from "./imotivation_service"
import { inject } from "@angular/core";


import axios from 'axios';
import { OperationsQueue } from "./operations_queue";
import { IPage } from "../domain/page";
import { ServerUrls } from "./url";
import { SocketOne } from "../ui_components/app_component/app.component";
import { IChartDataPoint } from "../domain/chart_data";


export class BEService implements IMotivationService{

  filter_name:string=""
  base_url=ServerUrls.base
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
    axios.get(this.base_url+"/ping",
        {headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }}
    ).then((response) => {
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
      axios.get(this.get_all_url,
        {headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }}
      )
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
          "name_key": name_key,
          "strength_key": strength_key,
          "sort_by_name": sort_by_name
        }
        ,
        {headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }}
    ).then((response)=>{
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
        },
          
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
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
      axios.get(this.base_url+"/get/"+id,
        {headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }}

      ).then((response)=>{
        data.name=response.data.name
        data.strength=response.data.strength
        resolve(data);
      }).catch((error)=>{
        reject(error);
      });
    });
  }
  async add(strength_: number, name_: string): Promise<IMotivation> {
    if (this.getStatus() == this.STATUS_OFF) {
      alert('connection lost to server')
      this.storageQueue.add("add", [strength_, name_])
      return new Promise<IMotivation>((resolve, reject) => {
        reject("conneciton lost")
      })
    }
    else {
      return new Promise<IMotivation>((resolve, reject) => {
        axios.post(this.add_url, {
          id: 2,
          name: name_,
          strength: strength_
        },
      
        {headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }}
      ).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }
  async update(id_: number, strength_: number, name_: string): Promise<void> {
    this.setStatus()
    if (this.getStatus() === this.STATUS_OFF) {
      alert('connection lost to server')
      this.storageQueue.add("update", [id_, strength_, name_])
      return new Promise<void>((resolve, reject) => {
        reject("connection lost :P")
      })
    }
    return axios.put(this.base_url + "/update/" + id_, {
        id: id_,
        strength: strength_,
        name: name_
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }
      }
    );
  }
  async sort(): Promise<void> {
    this.setStatus()
    return axios.put(this.base_url + "/sort",

        {headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }}

    )
  }
  async filter(filter_name: string): Promise<void> {
    this.setStatus()
    return axios.put(this.base_url + "/filter", {
      name_filter_key: filter_name
    },
  
        {headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }}
  )
  }

  filterStrength(strenght: number): Promise<void> {
    this.setStatus()
    return axios.put(this.base_url + "/filter/strength", {
      strength_key: strenght
    },
        {headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }}
  )
  }

  getStrengths() {
    this.setStatus()
    let data: number[] = [1, 2, 3]
    while (data.length > 0)
      data.pop()
    axios.get(this.base_url + "/get/strengths",

        {headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }}

    ).then((response) => {
      for (let x of response.data)
        data.push(x)
    })
    return data
  }
  async getChartData():Promise<IChartDataPoint[]>{
    return new Promise((accept, reject)=>{
      axios.get(this.base_url + "/chart_data",

        {headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }}
      )
      .then((response) => {
        accept( response.data)
      }).catch((reason)=>{
        reject(reason)
      })
    })
  }
}
