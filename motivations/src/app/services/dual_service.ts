import { IMotivation } from "../domain/imotivation"
import { IMotivationService } from "./imotivation_service"
import { MemoryService } from "./memory_service"


export class DualService implements IMotivationService{
  currentService:IMotivationService
  childService:IMotivationService
  constructor(currentService:IMotivationService, childService:IMotivationService){
    this.currentService=currentService
    this.childService=childService
    this.childService.getAll().then((all)=>{
      this.currentService.setData(all)
    })
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
        this.childService.getAll().then((all)=>{
          this.currentService.setData(all)
        })
      }
      await this.sleep(1000)
    }
  }
  fetchData(): Boolean {
    throw new Error('Method not implemented.');
  }
  getPage(): Promise<IMotivation[]> {
    // return this.getAll()
    throw new Error('Method not implemented.');
  }
  async remove(remove_id: number): Promise<void> {
    this.childService.remove(remove_id)
    this.currentService.remove(remove_id)
    return new Promise<void>((accept, reject)=>{
      accept()
    })
  }
  async getById(id: number): Promise<IMotivation> {
    throw new Error('Method not implemented.');
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
    await this.childService.update(id_, strength_, name_)
    await this.currentService.update(id_, strength_, name_)
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

