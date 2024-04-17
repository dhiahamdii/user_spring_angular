import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doc } from '../Models/Doc';
import {DocService} from "../service/doc.service";

@Component({
  selector: 'app-Doc-update',
  templateUrl: './Doc-update.component.html',
  styleUrls: ['./Doc-update.component.css']
})
export class DocUpdateComponent implements OnInit {


    id!: number;
    Doc:any = new Doc();
    constructor(private Docservice:DocService ,private router: Router,private route: ActivatedRoute) { }

    ngOnInit(): void {

      this.Doc = new Doc();

      this.id = this.route.snapshot.params['id'];

      this.Docservice.getDoc(this.id)
        .subscribe(data => {
          console.log(data)
          this.Doc = data;
        }, error => console.log(error));
    }
    onSubmit() {
      this.updateDoc();
    }
    updateDoc() {
      this.Docservice.updateDoc(this.id, this.Doc)
        .subscribe(data => {
          console.log(data);
          this.Doc = new Doc();
          this.gotoList();
        }, error => console.log(error));
        this.gotoList();
    }
    gotoList() {
      this.router.navigate(['/doc']);
    }
  }
