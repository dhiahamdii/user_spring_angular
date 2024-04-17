import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { LigneProdctionService } from '../service/ligneProdction.service';
import { PosteService } from '../service/poste.service';

@Component({
  selector: 'app-dashbord-trg',
  templateUrl: './dashbord-trg.component.html',
  styleUrls: ['./dashbord-trg.component.css']
})
export class DashbordTrgComponent  implements OnInit {


  totalPostes : number;
  totalUsers : number;


  constructor(private userService: UserService , private ligneProductionService: LigneProdctionService ,
    private  posteService : PosteService) { }



  ngOnInit(): void {
    this.getTotalPostes(),
    this.getTotalUsers()
  }

  public getTotalPostes() {
    this.posteService.getTotalPostes() 
      .subscribe((total: number) => {
        this.totalPostes = total; 
      });
  }

  public getTotalUsers() {
    this.userService.getTotalUsers() 
      .subscribe((totalUsers: number) => {
        this.totalUsers = totalUsers; 
      });
  } 


}
