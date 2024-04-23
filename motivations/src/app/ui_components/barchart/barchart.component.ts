import {Component, inject} from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import {MotivationService} from "../../services/motivation.service";
import {Observer} from "rxjs";
import {IMotivation} from "../../domain/imotivation";

@Component({
  selector: 'app-barchart',
  standalone: true,
  imports: [AgChartsAngular],
  template:`<ag-charts-angular style="height: 50%" [options]="chartOptions">
   </ag-charts-angular>`,
  styleUrl: './barchart.component.css'
})
export class BarchartComponent {
  public chartOptions: AgChartOptions;
  service=inject(MotivationService)
  motivations:IMotivation[]=[]
  constructor() {
    this.service.register(this)
    this.chartOptions = {
      data: this.motivations,
      series: [{ type: 'bar', xKey: 'name', yKey: 'strength' }]
    };
    this.service.getAll().then((response)=>{
      this.motivations=response
      this.chartOptions = {
        data: this.motivations,
        series: [{ type: 'bar', xKey: 'name', yKey: 'strength' }]
      };
    })
  }
  notify(){
    // this.motivations=this.service.getAll()
    this.update()
  }
  async update(){
    // let updated_data=this.service.getAll()
    // while(this.motivations.length>0)
      // this.motivations.pop()
    // for (let x of updated_data)
    // this.motivations.push(updated_data[0])
    this.service.getAll().then((response)=>{
      this.motivations=response
      this.chartOptions = {
        data: this.motivations,
        series: [{ type: 'bar', xKey: 'name', yKey: 'strength' }]
      };
    })
  }
}
