import { IChartDataPoint } from "../domain/chart_data"
import { IMotivation } from "../domain/imotivation"
import { IPage } from "../domain/page"
import { IMotivationService } from "./imotivation_service"
import { MemoryService } from "./memory_service"


export class DualService implements IMotivationService{
  currentService:IMotivationService
  childService:IMotivationService
  constructor(currentService:IMotivationService, childService:IMotivationService){
    this.currentService=currentService
    this.childService=childService
    // this.childService.getAll().then((all)=>{
    //   this.currentService.setData(all)
    // })
    this.game_loop()
  }
  setData(): void {
    throw new Error("Method not implemented.")
  }
  addWithId(id_: number, strenght_: number, name_: string): Promise<IMotivation> {
    throw new Error("Method not implemented.")
  }
  async getAll(): Promise<IMotivation[]> {
    // this.currentService.getAll()
    // this.childService.getAll()
    return new Promise<IMotivation[]>((resolve, reject)=>{
      this.currentService.getAll().then((response)=>{
        resolve(response)
      }).catch((errror)=>{
        this.childService.getAll()
        .then((all)=>{
          resolve(all)
        }).catch((error)=>{
          reject(error)
        })
      })
    })
    // return new Promise<IMotivation[]>((resolve, reject)=>{
    //   let errorsCnt=0
    //   this.currentService.getAll().then((response)=>{
    //     resolve(response)
    //   }).catch((errror)=>{
    //     errorsCnt++
    //   })
    //   this.childService.getAll().then((response)=>{
    //     resolve(response)
    //   }).catch((errror)=>{
    //     errorsCnt++
    //   })
    //   if (errorsCnt==2)
    //     reject()
    // })
    // throw new Error('Method not implemented.');
  }
  async sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms || 1000));
  }
  async game_loop(){
    while(true){
      if (this.childService.fetchData()){
        // this.childService.getPage(0,3,"",3,false).then((page)=>{
        //   this.currentService.setData(page.elements)
        // })
        // this.childService.getAll().then((all)=>{
        //   this.currentService.setData(all)
        // }
      }
      await this.sleep(10*1000)
    }
  }
  fetchData(): Boolean {
    throw new Error('Method not implemented.');
  }
  async getPage(index:number, size:number, name_key:string, strength_key:number, sort_by_name:Boolean): Promise<IPage> {
    return new Promise<IPage>((accept, reject)=>{
      this.childService.getPage(index,size,name_key,strength_key,sort_by_name).then((page)=>{
          this.currentService.setData(page.elements)
          accept(page)
      }).catch( (reason)=>{
        this.currentService.getPage(index,size,name_key,strength_key,sort_by_name).then( (page)=>{
            accept(page)
          }).catch( (args)=>{
            reject(args)
          })
      })
    })
  }
  async remove(remove_id: number): Promise<void> {
    this.childService.remove(remove_id)
    this.currentService.remove(remove_id)
    return new Promise<void>((accept, reject)=>{
      accept()
    })
  }
  async getById(id: number): Promise<IMotivation> {
    return new Promise<IMotivation>((resolve, reject)=>{
      this.currentService.getById(id).then((motivation)=>{
        resolve(motivation)
      })    
    })
  }
  async add(strength_: number, name_: string): Promise<IMotivation> {
    return new Promise<IMotivation>((resolve, reject)=>{
      this.childService.add(strength_, name_).then((motivation)=>{
        this.currentService.addWithId(motivation.id, motivation.strength, motivation.name)
        resolve(motivation)
      }).catch((reason)=>{
        this.currentService.add(strength_, name_).then((motivation)=>{
          resolve(motivation)
        }).catch((reason)=>{
          reject({name:"Error with both services"})
        })
      })
    })
  }
  async update(id_: number, strength_: number, name_: string): Promise<void> {
    this.childService.update(id_, strength_, name_)
    this.currentService.update(id_, strength_, name_)
    return new Promise<void>((accept, reject)=>{
      accept()
    })
  }
  sort(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  filter(filter_name: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  filterStrength(strenght: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getStrengths(): void {
    throw new Error('Method not implemented.');
  }
  async getChartData():Promise<IChartDataPoint[]>{
    return new Promise((resolve, reject)=>{
      this.childService.getChartData()
      .then((response)=>{
        resolve(response)
      }).catch((reason)=>{
        resolve([])
      })
    });
  }
}

