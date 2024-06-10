import {Component, inject} from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import {MotivationService} from "../../services/motivation.service";
import {IMotivation} from "../../domain/imotivation";
import { SocketOne } from '../app_component/app.component';
import { IChartDataPoint } from '../../domain/chart_data';

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
  socket=inject(SocketOne)

  data:IChartDataPoint[]=[]
  constructor() {
    this.socket.on('refresh', (data:any)=>{
      this.update()
    })
    this.chartOptions = {
    };
    this.update()
  }
  async update(){
    this.service.getChartData().then((response)=>{
      this.data=response
      this.chartOptions = {
        data: this.data,
        series: [{ type: 'bar', xKey: 'strength', yKey: 'count', fill:'#007BFF', fillOpacity:0.7 }]
      };
    })
  }
}
