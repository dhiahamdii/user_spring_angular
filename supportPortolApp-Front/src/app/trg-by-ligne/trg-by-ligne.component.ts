import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { LigneProdctionService } from '../service/ligneProdction.service';


@Component({
  selector: 'app-trg-by-ligne',
  templateUrl: './trg-by-ligne.component.html',
  styleUrls: ['./trg-by-ligne.component.css']
})
export class TrgByLigneComponent implements OnInit {

  chart: Chart;
  trgByLignesData: Map<string, number>;

  constructor(private ligneProductionService : LigneProdctionService) { }

  ngOnInit(): void {
  
   // Initialisez le graphique avec les options nécessaires
   this.chart = new Chart({
    chart: {
      type: 'pie',
      height: 325,
    },
    title: {
      text: 'TRG BY LIGNE %',
    },
    series: [
      {
        type: 'pie',
        data: [], // Les données seront mises à jour dynamiquement
      },
    ],
    credits: {
      enabled: false,
    },
  });

  // Appelez ici votre méthode pour obtenir les données et mettez à jour le graphique.
  this.updateChartWithData();
}

updateChartWithData(): void {
  // Utilize your service to get the data. Suppose you have a method in your service to fetch the data.
  this.ligneProductionService.getTRGByLigneProduction().subscribe((data: Map<string, number>) => {
    // Convert the received data into an array of objects with the 'name' and 'y' properties required by Highcharts.
    const chartData = Object.entries(data).map(([name, y]) => ({ name, y }));

    // Update the chart data. You can also update other chart properties if needed.
    this.chart.ref.series[0].update({
      type: 'pie', 
      data: chartData,
    });
  });
}

  
}
