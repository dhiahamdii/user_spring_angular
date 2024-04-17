import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-trg-by-day',
  templateUrl: './trg-by-day.component.html',
  styleUrls: ['./trg-by-day.component.css']
})
export class TrgByDayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  chart = new Chart({
    chart: {
      type: 'line',
      height: 325
    },
    title: {
      text: 'quotidien TRG'
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    },
    yAxis: {
      title: {
        text: 'TRG in %'
      }
    },
    series: [
      {
        name: "Ligne-4",
        type: "line",
        color: '#044342',
        data: [70, 69, 95, 145, 182, 215, 252, 265, 233, 183, 139, 396]
      }
      ,
      {
        name: 'Ligne-7',
        type: 'line',
        color: '#7e0505',
        data: [
          47, 52, 44, 35, 58, 69, 32, 53, 71, 82, 99, 159
        ]
      },
      {
        name: 'Ligne-3',
        type: 'line',
        color: '#ed9e20',
        data: [
          17, 22, 14, 25, 18, 19, 22, 43, 11, 32, 29, 59
        ]
      },
      {
        name: 'Ligne-2',
        type: 'line',
        color: 'blue',
        data: [
          28, 222, 114, 155, 128, 155, 220, 143, 160, 132, 229, 159
        ]
      },
    ],
    credits: {
      enabled: false
    }
  })

}