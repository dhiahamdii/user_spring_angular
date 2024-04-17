import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { LigneProdctionService } from '../service/ligneProdction.service';

@Component({
  selector: 'app-trg-by-shift',
  templateUrl: './trg-by-shift.component.html',
  styleUrls: ['./trg-by-shift.component.css']
})
export class TrgByShiftComponent {

  chart: Chart;

  constructor(private ligneProductionService :LigneProdctionService ) { }


  ngOnInit(): void {
    // Initialisez le graphique avec des options de base
    this.chart = new Chart({
      chart: {
        type: 'bar',
        height: 225
      },
      title: {
        text: 'TRG By Shift'
      },
      xAxis: {
        categories: []
      },
      yAxis: {
        title: {
          text: ''
        },
        max: 100,
      },
      series: [
        {
          type: 'bar',
          showInLegend: false,
          data: []
        }
      ],
      credits: {
        enabled: false
      }
    });

   // Appelez votre méthode pour obtenir les données TRG par shifts depuis le backend
   this.ligneProductionService.getTRGByShifts().subscribe((data: Map<string, number>) => {

    // Créez une palette de couleurs pour chaque shift
    const colorPalette = ['#4F9DBD', '#CDBC46', '#6E7574'];

    // Convertissez les données en un format approprié pour Highcharts et attribuez une couleur à chaque shift
    const chartData = Object.entries(data).map(([name, y], index) => ({
      name,
      y,
      color: colorPalette[index % colorPalette.length],
    }));

    // Mettez à jour les catégories et les données du graphique
    const categories = chartData.map(item => item.name);
    this.chart.ref.xAxis[0].setCategories(categories);
    this.chart.ref.series[0].setData(chartData);
  });
}
}
