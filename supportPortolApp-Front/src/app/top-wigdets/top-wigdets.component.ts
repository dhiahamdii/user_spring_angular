import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LigneProdctionService } from '../service/ligneProdction.service';
import { PlanActionService } from '../service/plan-action.service';
import { UserService } from '../service/user.service';
import {ReclamationService} from "../service/reclamation.service";

@Component({
  selector: 'app-top-wigdets',
  templateUrl: './top-wigdets.component.html',
  styleUrls: ['./top-wigdets.component.css']
})
export class TopWigdetsComponent {

  currentDateTime: Date;

  temperature: number;
  apiKey = 'ccbfcce5d35f0ad5d70f833181d5ee2b';
  latitude: number;
  longitude: number;
  humidity : number ;
  globalTRG: number;
  totalActions: number;
  totalUsers: number;
  activeUsers: number;
  blockedUser: number;
  totalReclamation: number;

  constructor(private http: HttpClient, private ligneProdctionService : LigneProdctionService,
              private planActionService : PlanActionService, private userService : UserService, private reclamationService: ReclamationService) {
    this.updateDateTime();
  }

  ngOnInit() {
    setInterval(() => {
      this.updateDateTime();
    }, 1000);

    this.getLocation();
    this.fetchGlobalTRG();
    this.getTotalActions();
    this.getTotalUsers();
    this.getAvtivelUsers();
    this.getLockedUsersCount();
    this.getTotalReclamation();
  }

  getTotalActions() {
    this.planActionService.getTotalPlanActions().subscribe((total: number) => {
      this.totalActions = total;
    });
  }

  getTotalReclamation(){
    this.reclamationService.getTotalReclamation().subscribe((total: number)=>{
      this.totalReclamation=total;
    })
  }

  getTotalUsers() {
    this.userService.getTotalUsers().subscribe((total: number) => {
      this.totalUsers = total;
    });
  }

  getAvtivelUsers() {
    this.userService.getActiveUsers().subscribe((total: number) => {
      this.activeUsers = total;
    });
  }
  getLockedUsersCount(){
    this.userService.getLockedUsersCount().subscribe((total: number) => {
      this.blockedUser= total ;
    });
  }
  updateDateTime() {
    this.currentDateTime = new Date();
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
  }

  // temperature logic
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.getCurrentTemperature();
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  getCurrentTemperature() {

    const apiUrl = `${environment.apiUrl}/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${this.apiKey}&units=metric`;

    this.http.get(apiUrl).subscribe((data: any) => {
      this.temperature = data.main.temp;
      this.humidity = data.main.humidity;
    });
  }

  // TRG Globale

  public fetchGlobalTRG() {
    this.ligneProdctionService.getGlobalTRG().subscribe(trg => {
      this.globalTRG = trg;
    });
  }

}
