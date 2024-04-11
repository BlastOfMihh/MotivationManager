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
  template:`<ag-charts-angular
    style="height: 100%"
    [options]="chartOptions">
   </ag-charts-angular>`,
  styleUrl: './barchart.component.css'
})
export class BarchartComponent {
  public chartOptions: AgChartOptions;
  service=inject(MotivationService)
  motivations:IMotivation[]
  constructor() {
    this.service.register(this)
    this.motivations=this.service.getAll()
    this.chartOptions = {
      // Data: Data to be displayed in the chart
      data: this.motivations,
      // Series: Defines which chart type and data to use
      series: [{ type: 'bar', xKey: 'name', yKey: 'strength' }]
    };
  }
  notify(){
    // this.motivations=this.service.getAll()
    this.update()
  }
  update(){
    this.chartOptions = {
      data: this.motivations,
      series: [{ type: 'bar', xKey: 'name', yKey: 'strength' }]
    };
  }
}
