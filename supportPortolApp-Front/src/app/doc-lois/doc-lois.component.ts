import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 import { Loi } from '../Models/Loi';
import {LoiService} from "../service/loi.service";

@Component({
  selector: 'app-doc-lois',
  templateUrl: './doc-lois.component.html',
  styleUrls: ['./doc-lois.component.css']
})
export class DocLoisComponent implements OnInit {

id!:number;
  constructor(private Loiervice:LoiService,private route: ActivatedRoute,
    private router: Router
   ) {}
  Loi:any = new Loi();

  public Lois: any[] = [];
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
  this.Loiervice.getLoi(1).subscribe(
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

    this.id = this.route.snapshot.params['id'];
    this.getLoi();

  }

  addLoi(){
    this.Loiervice.addLoi(this.Loi).subscribe();
    location.reload();

    }

}
