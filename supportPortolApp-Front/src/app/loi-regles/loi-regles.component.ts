
  import { Component, OnInit } from '@angular/core';
  import { Regle } from '../Models/Regle';
  import { HttpErrorResponse } from '@angular/common/http';
  import { ActivatedRoute, Router } from '@angular/router';
  import {RegleService} from "../service/regle.service";


  @Component({
    selector: 'app-loi-regles',
    templateUrl: './loi-regles.component.html',
    styleUrls: ['./loi-regles.component.css']
  })
  export class LoiReglesComponent implements OnInit {

    constructor(private Regleservice:RegleService,
      private router: Router,private route: ActivatedRoute
     ) {}
     id!: number;

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
  public getRegle():void{
    this.Regleservice.getRegle(this.id).subscribe(
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
    this.getRegle();
   }
  deleteRegle(id:number){
    this.Regleservice.deleteRegleById(id).subscribe(
    );
    location.reload()
  }

     ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.getRegle();

    }

    addRegle(){
      this.Regleservice.addRegle(this.Regle).subscribe();


      }


  }
