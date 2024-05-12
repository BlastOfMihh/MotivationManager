import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { OnlineStatusModule, OnlineStatusService, OnlineStatusType } from 'ngx-online-status';
import { asapScheduler } from 'rxjs';


@Component({
  selector: 'app-network-status-checker',
  standalone: true,
  imports: [OnlineStatusModule],
  template:`
    <button (click)="update()"> check network status </button>
    NETWORK STATUS {{salut}}
  `,
  styleUrl: './network-status-checker.component.css'
})
export class NetworkStatusCheckerComponent {
  salut:string="_"
  update(){
    let online=new OnlineStatusService()
    if (online.getStatus()==OnlineStatusType.ONLINE)
      this.salut="ONLINE"
    else this.salut="OFFLINE"
  }
  
}
