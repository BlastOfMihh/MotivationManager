import { Component, inject } from '@angular/core';
import axios from 'axios';
import { MotivationService } from '../../services/motivation.service';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  template:`
    <h1> LOGIN pls</h1>
    USERNAME : <input [(ngModel)]="user.username">
    <br>
    PASSWORD : <input type="password" [(ngModel)]="user.password">
    <br>
    <button (click)="this.login()"> enter the matrix</button>
  `,
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  service:MotivationService=inject(MotivationService)
  user={
    username:"",
    password:""
  }
  constructor(){
  }
  set_token(){
  }
  login(){
    axios.post(this.service.base_url+"/login", 
    {
      "username":this.user.username,
      "user_type":"basic",
      "password":this.user.password
    }).then(function (response) {
      localStorage.setItem("jwt_token", response.data.access_token)
    }).catch(function (error) {

    });
  }
}
