import { Component } from '@angular/core';
import {RouterLink, RouterModule, ROUTES} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

@Component({
  selector: 'app-home-bar',
  standalone: true,
  imports: [
    RouterLink,
  ],
  template: `
    <a routerLink="">
      <h1> MOTIVATIONS </h1>
    </a>
  `,
  styleUrl: './home-bar.component.css'
})
export class HomeBarComponent {

}
