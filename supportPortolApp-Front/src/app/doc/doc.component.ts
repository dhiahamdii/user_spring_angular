import { Component, OnInit } from '@angular/core';
import { Doc } from '../Models/Doc';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {DocService} from "../service/doc.service";
 @Component({selector: 'app-doc',templateUrl: './doc.component.html',styleUrls: ['./doc.component.css']})
export class DocComponent implements OnInit {constructor(private Docservice:DocService,private router: Router)
  {}chartOptions: any;
  public Docs: any[] = [];
  Doc:any = new Doc();
  title ='pagination';
  page: number=1;
  count: number=0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  updateDoc(id: number){this.router.navigate(['/doc', id]);}
  public getDocs():void
  {this.Docservice.getDocs().subscribe(
    (response:any[])=>{this.Docs=response;console.log(response);}
    ,(error:HttpErrorResponse)=>{alert(error.message);});}
    onTableDataChange
    (Doc: any){this.page=Doc;this.getDocs();}
    deleteDoc(id:number){this.Docservice.deleteDocById(id).subscribe();location.reload()}
    ngOnInit(): void {
      this.chartOptions = {
        title: {text: "Documentation Statuss"
        // Fix typo in the title
      },data: [{type: "pie",startAngle: -90,indexLabel: "{name}: {y}",yValueFormatString: "#,###.##'%'",dataPoints:[]}]
      // Initialize data as an empty array
    };this.getDocs();this.Docservice.getDocstat().subscribe(
      (statusCounts: any[]) => {this.chartOptions.data = [{dataPoints: statusCounts.map(statusCount => ({label: statusCount.status,y: statusCount.count})),animationEnabled:true,type: "tie",startAngle: -90,indexLabel: "{label}: {y}",}];console.log(this.chartOptions);},(error) => {console.error('Error fetching status counts:', error);
     });}
     addDoc(){this.Docservice.addDoc(this.Doc).subscribe();location.reload();}
     loi(id: number){this.router.navigate(['/admin/loidoc', id]);}
    }
