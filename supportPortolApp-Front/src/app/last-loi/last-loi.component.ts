import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Loi } from '../Models/Loi';
import {LoiService} from "../service/loi.service";
 @Component({
  selector: 'app-last-loi',
  templateUrl: './last-loi.component.html',
  styleUrls: ['./last-loi.component.css']
})
export class LastLoiComponent implements OnInit {


  constructor(private Loiervice:LoiService,
    private router: Router
   ) {}
   public Lois: any[] = [];
  Loi:any = new Loi();
  title ='pagination';
  page: number=1;
count: number=0;
tableSize: number = 5;
tableSizes: any = [5, 10, 15, 20];

updateLoi(id: number){
  this.router.navigate(['/loi', id]);
}
loi(id: number){
  this.router.navigate(['/regleLois', id]);
}

public getLoi():void{
  this.Loiervice.getLoiLast().subscribe(
    (response:any[])=>{
      this.Lois=response;
      console.log(response);
    },
      (error:HttpErrorResponse)=>
      {
        alert(error.message);
      }
    );


}
onTableDataChange (Loi: any){
  this.page=Loi;
  this.getLoi();
 }
deleteLoi(id:number){
  this.Loiervice.deleteLoiById(id).subscribe(
  );
  location.reload()
}

   ngOnInit(): void {
    this.getLoi();

  }

  addLoi(){
    this.Loiervice.addLoi(this.Loi).subscribe();
    location.reload();

    }

}
