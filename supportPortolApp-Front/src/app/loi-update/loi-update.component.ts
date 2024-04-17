import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loi } from '../Models/Loi';
import {LoiService} from "../service/loi.service";

@Component({
  selector: 'app-Loi-update',
  templateUrl: './Loi-update.component.html',
  styleUrls: ['./Loi-update.component.css']
})
export class LoiUpdateComponent implements OnInit {


    id!: number;
    Loi:any = new Loi();
    constructor(private Loiservice:LoiService ,private router: Router,private route: ActivatedRoute) { }

    ngOnInit(): void {

      this.Loi = new Loi();

      this.id = this.route.snapshot.params['id'];

      this.Loiservice.getLoi1(this.id)
        .subscribe(data => {
          console.log(data)
          this.Loi = data;
        }, error => console.log(error));
    }
    onSubmit() {
      this.updateLoi();
    }
    updateLoi() {
      this.Loiservice.updateLoi(this.id, this.Loi)
        .subscribe(data => {
          console.log(data);
          this.Loi = new Loi();
          this.gotoList();
        }, error => console.log(error));
        this.gotoList();
    }
    gotoList() {

      this.router.navigate(['/loi']);    }
  }
