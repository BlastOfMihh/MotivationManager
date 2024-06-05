import {Component, inject} from '@angular/core';
import {RouterLink, RouterModule, ROUTES} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {MotivationService} from "../../services/motivation.service";

@Component({
  selector: 'app-home-bar',
  standalone: true,
  imports: [
    RouterLink,
  ],
  template: `
    <h1>
      <a routerLink="">
        MOTIVATIONS
      </a>
    </h1>
  `,
  styleUrl: './home-bar.component.css'
})
export class HomeBarComponent {
}
