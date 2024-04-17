import { Component, OnInit } from '@angular/core';
import { Regle } from '../Models/Regle';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {RegleService} from "../service/regle.service";


@Component({
  selector: 'app-Regle',
  templateUrl: './Regle.component.html',
  styleUrls: ['./Regle.component.css']
})
export class RegleComponent implements OnInit {

  constructor(private Regleservice:RegleService,
    private router: Router
   ) {}
   public Regles: any[] = [];
  Regle:any = new Regle();
  title ='pagination';
  page: number=1;
count: number=0;
tableSize: number = 5;
tableSizes: any = [5, 10, 15, 20];

  updateRegle(id: number){
    this.router.navigate(['/regle', id]);
  }
public getRegles():void{
  this.Regleservice.getRegles().subscribe(
    (response:any[])=>{
      this.Regles=response;
      console.log(response);
    },
      (error:HttpErrorResponse)=>
      {
        alert(error.message);
      }
    );


}
onTableDataChange (Regle: any){
  this.page=Regle;
  this.getRegles();
 }
deleteRegle(id:number){
  this.Regleservice.deleteRegleById(id).subscribe(
  );
  location.reload()
}

   ngOnInit(): void {
    this.getRegles();

  }

  addRegle(){
    this.Regleservice.addRegle(this.Regle).subscribe();


    }


}
