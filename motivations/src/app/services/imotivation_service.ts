import { ChartData } from "chart.js"
import { IMotivation } from "../domain/imotivation"
import { IPage } from "../domain/page"
import { IChartDataPoint } from "../domain/chart_data"

export class IMotivationService{
  constructor() {
  }
  async getAll():Promise<IMotivation[]>{
    return []
  }
  fetchData():Boolean{
    return false
  }
  setData(data:IMotivation[]){
    
  }
  async getPage(index:number, size:number, name_key:string, strength_key:number, sort_by_name:Boolean):Promise<IPage>{
    throw Error("Paging not implemented :p")
  }
  async remove(remove_id:number) {

  }
  async getById(id:number):Promise<IMotivation>{
    return new Promise<IMotivation>((response, reject)=>{})
  }

  async add(strength_:number, name_:string):Promise<IMotivation>{
    throw Error("Not implemented by Mihh")
  }
  async addWithId(id_:number, strenght_:number, name_:string):Promise<IMotivation>{
    throw Error("Not implemented by Mihh")
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
  async getChartData():Promise<IChartDataPoint[]>{
    throw "Not implemented interface"
  }
}
