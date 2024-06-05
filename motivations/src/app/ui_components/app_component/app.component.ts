import { Component, Injectable} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MotivationOperationsComponent} from "../motivation-operations/motivation-operations.component";
import {MotivationDisplayComponent} from "../motiviation-display/motivation-display.component";
import {Motivationlist} from "../motivationslist/motivationlist";
import {HomeBarComponent} from "../home-bar/home-bar.component";
import {BarchartComponent} from "../barchart/barchart.component";
import {FilterComponent} from "../filter/filter.component";
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { BrowserModule } from '@angular/platform-browser';
import { ServerUrls } from '../../services/url';

import { Socket , SocketIoModule} from 'ngx-socket-io';

@Injectable()
export class SocketOne extends Socket {
  constructor() {
    super({ url: ServerUrls.base, options: {} });
  }
}

// @ts-ignore
// @ts-ignore

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MotivationOperationsComponent, MotivationDisplayComponent, Motivationlist, HomeBarComponent, BarchartComponent, FilterComponent, HttpClientModule,
    SocketIoModule
  ],
  template: `
    <div style="text-align: center">
      <br>
      <br>
      <br>
      <app-home-bar></app-home-bar>
      <br>
      <router-outlet></router-outlet>
    </div>
    `,
  styleUrl: './app.component.css',
  providers:[SocketOne]
})
export class AppComponent {
  title = 'Motivations';
}
