import { Routes } from '@angular/router';
import {Motivationlist} from "./ui_components/motivationslist/motivationlist";
import {UpdateComponent} from "./ui_components/update.component/update.component";
import {AddMotivationComponent} from "./ui_components/add-motivation/add-motivation.component";
import { BarchartComponent } from './ui_components/barchart/barchart.component';
import { DetailsPageComponent } from './ui_components/details-page/details-page.component';
import { LoginPageComponent } from './ui_components/login-page/login-page.component';

export const routes: Routes = [
  {
    path:'',
    component:Motivationlist,
    title:'All',
  },
  {
    path:'login',
    component:LoginPageComponent,
    title:'Login',
  },
  {
    path:'add',
    component:AddMotivationComponent,
    title:'ADD'
  },
  {
    path:'update/:id',
    component:UpdateComponent,
    title:'Update',
  },
  {
    path:'details/:id',
    component: DetailsPageComponent,
    title:'Details Motivation',
  },
  {
    path:'barchart',
    component:BarchartComponent,
    title:'Barchart',
  }
];

// So it's like an component which chnges vased on whihc link is opened

