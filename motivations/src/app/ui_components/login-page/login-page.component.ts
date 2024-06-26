import { Component, inject } from '@angular/core';
import axios from 'axios';
import { MotivationService } from '../../services/motivation.service';
import {FormsModule} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  template:`
    USERNAME <input [(ngModel)]="user.username">
    <br>
    PASSWORD <input type="password" [(ngModel)]="user.password">
    <br>
    <button (click)="this.login()"> enter the matrix</button>
  `,
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  service:MotivationService=inject(MotivationService)
  router:Router=inject(Router)
  user={
    username:"",
    password:""
  }
  constructor(){
  }
  set_token(){
  }
  async login(){
    let response = await axios.post(this.service.base_url+"/login", 
    {
      "username":this.user.username,
      "user_type":"basic",
      "password":this.user.password
    })
    if (response.status === 200){
      localStorage.setItem("jwt_token", response.data.access_token)
      localStorage.setItem("user_type", response.data.user_type)
      if (response.data.user_type=='admin')
        this.router.navigate(["/admin_panel"])
      else
        this.router.navigate(["/"])
    }else{
      alert("bad login attempt")
    }
  }
}
