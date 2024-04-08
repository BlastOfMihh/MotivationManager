import { Routes } from '@angular/router';
import {Motivationlist} from "./ui_components/motivationslist/motivationlist";
import {UpdateComponent} from "./ui_components/update.component/update.component";
import {AddMotivationComponent} from "./ui_components/add-motivation/add-motivation.component";

export const routes: Routes = [
  {
    path:'',
    component:Motivationlist,
    title:'All',
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
  }
];

// So it's like an component which chnges vased on whihc link is opened

