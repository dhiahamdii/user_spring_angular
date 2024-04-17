import { Component , OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-top3-ligne',
  templateUrl: './top3-ligne.component.html',
  styleUrls: ['./top3-ligne.component.css']
})
export class Top3LigneComponent  implements OnInit {

  chart = new Chart({
    chart: {
      type: 'bar',
      height: 225
    },
    title: {
      text: 'Top 3 Ligne'
    },
    xAxis: {
      categories: [
        'Lenova Thinkpad E15',
        'Nectar Orange Juice',
        'Axe Deodarant',
      ]
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    series: [
     {
      type: 'bar',
      showInLegend: false,
      data: [
        {
          name: 'Lenova Thinkpad E15',
          y: 395,
          color: '#044342',
        },
        {
          name: 'Nectar Orange Juice',
          y: 385,
          color: '#7e0505',
        },
        {
          name: 'Axe Deodarant',
          y: 275,
          color: '#ed9e20',
        },
      ]
     }
    ],
    credits: {
      enabled: false
    }
  })

  constructor() { }

  ngOnInit(): void {
  }

}
