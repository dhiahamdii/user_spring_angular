import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { LigneProdctionService } from '../service/ligneProdction.service';

@Component({
  selector: 'app-trg-by-produit',
  templateUrl: './trg-by-produit.component.html',
  styleUrls: ['./trg-by-produit.component.css']
})
export class TrgByProduitComponent implements OnInit {

  chart : Chart ;

  constructor(private ligneProductionService : LigneProdctionService) { }

  ngOnInit(): void {
    // Initialisez le graphique avec les options nécessaires
    this.chart = new Chart({
      chart: {
        type: 'column',
        height: 225,
      },
      title: {
        text: 'TRG BY Produit %',
      },
      xAxis: {
        categories: [], // Initialiser avec des catégories vides
        title: {
          text: 'Product Reference',
        },
      },
      yAxis: {
        title: {
          text: 'Values in %',
        },
        max: 100,
        tickInterval: 20,
      },
      series: [
        {
          type: 'column',
          showInLegend: false,
          data: [], // Initialiser avec des données vides
          pointWidth: 40,
        },
      ],
      credits: {
        enabled: false,
      },
    });
  
    // Appel du méthode pour obtenir les données TRG par produit
    this.getTRGByProduit().subscribe((data: Map<string, number>) => {
      // Définissez une palette de couleurs
      const colorPalette = ['#78CD76', '#41B1D2', '#8B48D3', '#EE9E53', '#635547', '#EE5FB8', '#f72f71'];
  
      // Convertissez les données en un format approprié pour Highcharts tout en assignant une couleur à chaque produit
      const chartData = Object.entries(data).map(([name, y], index) => ({
        name,
        y,
        color: colorPalette[index % colorPalette.length], // Utilisez la couleur de la palette
      }));

  
      // Mettez à jour les catégories et les données du graphique
      this.chart.ref.xAxis[0].setCategories(chartData.map(item => item.name));
      this.chart.ref.series[0].setData(chartData);
  
    });
  }

  
getTRGByProduit() {
  return this.ligneProductionService.getTRGByProduit();
}

 

}
