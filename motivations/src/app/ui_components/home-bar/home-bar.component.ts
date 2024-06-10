import {Component, inject} from '@angular/core';
import {RouterLink, RouterModule, ROUTES} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {MotivationService} from "../../services/motivation.service";
import { NgIf } from '@angular/common';
import { CurrentUserService } from '../../services/current_user_service';

@Component({
  selector: 'app-home-bar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  template: `
    <h1>
      <a routerLink="">
        MOTIVATIONS
      </a>
      <a *ngIf="currentUserService.isAdmin()" routerLink="/admin_panel/">
      | MANAGER PANEL
      </a>
      <a routerLink="/login/">
        | LOGIN
      </a>
    </h1>
  `,
  styleUrl: './home-bar.component.css'
})
export class HomeBarComponent {
  currentUserService=inject(CurrentUserService)
}
