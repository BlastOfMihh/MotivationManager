import { Component, inject } from '@angular/core';
import { MotivationService } from '../services/motivation.service';
import { IUser } from '../domain/user';
import { SocketOne } from '../ui_components/app_component/app.component';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserType } from '../services/current_user_service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink,NgFor, NgForOf, NgIf],
  template: `
    <table>
      <tr>
        <th> TYPE </th> 
        <th> USERNAME </th> 
        <th> </th> 
        <th> </th>
      </tr>
      <tr *ngFor="let user of currentUsers">
        <td [textContent]="user.user_type"> </td>
        <td [textContent]="user.username"> </td>
        <td>
          <a routerLink="/update_user/{{user.id}}"> <button> update </button> </a>
        </td>
        <td>
          <button *ngIf="user.user_type!='admin'" (click)="remove(user.id)"> remove </button>
        </td>
      </tr>
    </table>
  `,
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  service=inject(MotivationService)
  currentUsers:IUser[]=[]
  socket=inject(SocketOne)
  constructor(){
    this.socket.on('refresh-users', (data:any)=>{
      this.update()
    })
    this.update()
  }
  async update(){
    this.service.getUserPage(1,100).then((response)=>{
      this.currentUsers=response
    }).catch((error)=>{
      alert(error)
    })
  }
  async remove(id:number){
    this.service.removeUser(id)
      .then((response) => { 
        alert('User removed')
      })
      .catch((response)=>{
        alert(response.message)
      })
  }
}
