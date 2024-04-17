import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Regle } from '../Models/Regle';
import {RegleService} from "../service/regle.service";

@Component({
  selector: 'app-regle-update',
  templateUrl: './regle-update.component.html',
  styleUrls: ['./regle-update.component.css']
})
export class RegleUpdateComponent implements OnInit {


    id!: number;
    Regle:any = new Regle();
    constructor(private Regleservice:RegleService ,private router: Router,private route: ActivatedRoute) { }

    ngOnInit(): void {

      this.Regle = new Regle();

      this.id = this.route.snapshot.params['id'];

      this.Regleservice.getRegle1(this.id)
        .subscribe(data => {
          console.log(data)
          this.Regle = data;
        }, error => console.log(error));
    }
    onSubmit() {
      this.updateRegle();
    }
    updateRegle() {
      this.Regleservice.updateRegle(this.id, this.Regle)
        .subscribe(data => {
          console.log(data);
          this.Regle = new Regle();
          this.gotoList();
        }, error => console.log(error));
        this.gotoList();
    }
    gotoList() {
      this.router.navigate(['/regle']);
    }
  }
