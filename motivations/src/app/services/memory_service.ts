import { IChartDataPoint } from "../domain/chart_data";
import { IMotivation } from "../domain/imotivation";
import { IPage } from "../domain/page";
import { IMotivationService } from "./imotivation_service";

export class MemoryService implements IMotivationService{
  data:IMotivation[]=[]
  constructor(){ 
  }
  setData(newData:IMotivation[]): void {
    let ids=[]
    for (let motivation of this.data){
      ids.push(motivation.id)
    }
    for (let id of ids){
      this.remove(id)
    }
    for (let motivation of newData){
      this.addWithId(motivation.id, motivation.strength, motivation.name)
    }
  }
  async getAll(): Promise<IMotivation[]> {
    return new Promise<IMotivation[]>((accept, reject)=>{
      accept(this.data)
    })
  }
  fetchData(): Boolean {
    throw new Error("Data cannot be fetched in memory service")
  }
  async getPage(index:number, size:number, name_key:string, strength_key:number, sort_by_name:Boolean): Promise<IPage> {
    return new Promise<IPage>((accept, reject)=>{
      this.getAll().then((elements)=>{
        accept( {
          index:index,
          elements:elements
        })
      }).catch((reason)=>{
        reject(reason)
      })
    })
  }
  async remove(remove_id: number): Promise<void> {
    return new Promise<void>((accept, reject)=>{
      let index=this.data.findIndex(motivation=>motivation.id==remove_id)
      if (index>-1)
        this.data.splice(index, 1)
    })
  }
  async getById(id: number): Promise<IMotivation> {
    return new Promise<IMotivation>((accept, reject)=>{
      for (let motivation of this.data)
        if (motivation.id==id)
          accept(motivation)
      reject("motivation not found in memory :[")
    })
  }
  async addWithId(id_:number, strength_: number, name_: string): Promise<IMotivation> {
    return new Promise<IMotivation>((x,y)=>{
      let newMotivation={
        id:id_,
        name:name_,
        strength:strength_
      }
      this.data.push(newMotivation)
      x(newMotivation)
    })
    // throw new Error('Method not implemented.');
  }
  last_id=-1
  async add(strength_: number, name_: string): Promise<IMotivation> {
    return new Promise<IMotivation>((resolve,reject)=>{
      this.last_id-=1
      let newMotivation = {
        id:this.last_id,
        name:name_,
        strength:strength_
      }
      this.data.push(newMotivation)
      resolve(newMotivation)
    })
    // throw new Error('Method not implemented.');
  }
  async update(id_: number, strength_: number, name_: string): Promise<void> {
    // throw new Error('Method not implemented.');
    return new Promise<void>((accept, reject)=>{
      for (let motivation of this.data){
        if (motivation.id==id_){
          motivation.strength=strength_
          motivation.name=name_
          accept()
        }
      }
      reject()
    })
  }
  async sort(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async filter(filter_name: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async turn_page(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async turn_back_page(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async set_page(page_index: number, page_size: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async filterStrength(strenght: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async getStrengths(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async getChartData():Promise<IChartDataPoint[]>{
    throw new Error('Method not implemented.');
  }

}