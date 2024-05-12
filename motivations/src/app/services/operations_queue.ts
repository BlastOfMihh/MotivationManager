// import { LocalStorageService } from "ngx-webstorage";
import { inject, Injectable } from "@angular/core";
import { local } from "d3";


@Injectable({
  providedIn: 'root'
})
export class OperationsQueue{
//   localStorageService: LocalStorageService = inject(LocalStorageService);
  key='BEOperationsQueue'
  queue:Array<Array<any>>=[]
  constructor(){
    // this.localStorageService.observe('key')
    // .subscribe((value)=> alert('new value' + String(value)) )
    let queueFromStorage=localStorage.getItem(this.key)
    if (queueFromStorage!=null)
        this.queue=JSON.parse(queueFromStorage)
  }
  add(opeartion:string, operation_arguments:any[]){
    this.queue.push([opeartion, operation_arguments])
    let queue_json_string=JSON.stringify(this.queue)
    localStorage.setItem(this.key, queue_json_string)
    // this.localStorageService.store('key', 100)
  }
  getAllAndPop(){
    let oldQueue=this.queue
    this.queue=[]
    localStorage.setItem(this.key, JSON.stringify(this.queue))
    return oldQueue
  }
}