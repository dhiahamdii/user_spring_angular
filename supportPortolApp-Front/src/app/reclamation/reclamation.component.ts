import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReclamationService} from "../service/reclamation.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Reclamation} from "../model/reclamation";
import {Observable, Subscription} from "rxjs";
import {User} from "../model/user";
import {Poste} from "../model/poste";
import {NotificationType} from "../enum/notification-type.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "../service/notification.service";
import {Role} from "../enum/role";
import {AuthenticationService} from "../service/authentication.service";
import {CostumHttpResponse} from "../model/custom-http-response";

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit{
  private subscriptions : Subscription [] = [] ;
  public reclamations :Reclamation[] ;
  public reclamation = new Reclamation() ;
  p: number = 1;
  public selectedReclamation : Reclamation ;
  itemsPerPage : number = 6;
  totalElements: any ;
  selectedRole: string = 'ROLE_USER'; // Default role
  otherRole: string = ''; // To store custom role input

  checkOther() {
    if (this.selectedRole !== 'other') {
      this.otherRole = ''; // Reset otherRole input when selection changes
    }
  }


  ngOnInit(): void {
  }

  constructor(
    private reclamationService : ReclamationService,
    private router: Router,
    private notificationService : NotificationService,
    private authenticationService : AuthenticationService
  ) { }



  public onSelectReclamation(selectedReclamation: Reclamation): void {
    this.selectedReclamation = selectedReclamation;
    this.clickButton('openUserInfo'); // button id = (openUserInfo) data-target = #viewUserModal
  }


  public getListreclamation(showNotification : boolean ):void {
    this.subscriptions.push(
      this.reclamationService.getListReclamation().subscribe(
        (response : Reclamation[] ) => {
          this.reclamations  = response ;
          this.totalElements=response.length;
          if (showNotification){
            this.sendNotification(NotificationType.SUCCESS, `${response.length} reclamation trouvee . `) ;
          }
        },
        (errorResponse : HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR , errorResponse.error.message) ;
        }
      )
    );
  }

  public deleteReclamation (id  : number ):void{
    // @ts-ignore
    // @ts-ignore
    this.subscriptions.push(
      this.reclamationService.deleteReclamation(id).subscribe(
        // @ts-ignore

        (response : CostumHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS , response.message);
          this.getListreclamation(false);
        },
        (errorResponse : HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR , errorResponse.error.message) ;
        }
      )
    )
  }
  public saveReclamation () : void {
    this.clickButton('new-Poste-save');
  }

  public get isAdmin() : boolean {
    return this.getUserRole() === Role.ADMIN  || this.getUserRole() ===  Role.SUPER_ADMIN ;
  }
  private getUserRole() : string {
    return this.authenticationService.getUserFromLocalCache().role ;
  }
  public searchReclamation (searchTerm : string) : void {
    const results : Reclamation[] = [] ;
    for (const reclamation of this.reclamations){
      if ( reclamation.email.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1  ||
        reclamation.descrRec.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1  ){
        results.push(reclamation) ;
      }
    }
    this.reclamations=results ;
    if (results.length === 0 || ! searchTerm){
      this.getListreclamation(false) ;
    }
  }
  public addReclamation (reclamationForm : NgForm) : void {
    const formData = this.reclamationService.createFormData(reclamationForm.value );
    this.subscriptions.push(
      this.reclamationService.addReclamation(formData).subscribe(
        (response : Reclamation) => {
          this.clickButton('new-Poste-close');
          this.getListreclamation(false);
          reclamationForm.reset();
          this.sendNotification(NotificationType.SUCCESS , `${response.email} reclamation ajoutee avec success`) ;
        },
        (errorResponse : HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR , errorResponse.error.message) ;
        }
      )
    );
  }
  private clickButton(buttonId : string) : void {
    document.getElementById(buttonId).click();
  }

  private sendNotification(notificationType: NotificationType, message: string) :void{
    if(message){
      this.notificationService.notify(notificationType,message) ;
    } else {
      this.notificationService.notify(notificationType, 'An error occure . please try again ');
    }
  }

}



