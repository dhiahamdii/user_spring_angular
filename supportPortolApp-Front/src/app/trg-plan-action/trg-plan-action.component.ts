import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlanActionService } from '../service/plan-action.service';
import { NotificationService } from '../service/notification.service';
import { PlanAction } from '../model/PlanAction';
import { Subscription } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../service/authentication.service';
import { Role } from '../enum/role';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-trg-plan-action',
  templateUrl: './trg-plan-action.component.html',
  styleUrls: ['./trg-plan-action.component.css']
})
export class TrgPlanActionComponent implements OnInit , OnDestroy{

  private subscriptions: Subscription[] = [];
  public planActions: PlanAction[] = [];
  public editPlanAction = new PlanAction();
  public planAction = new PlanAction();

  p: number = 1;
  itemsPerPage: number = 6;
  totalElements: number;

    constructor(private planActionService: PlanActionService, private notificationService: NotificationService,
               private authenticationService : AuthenticationService ) {}
  
  ngOnInit(): void {
    this.getPlanActions(true);
  }

  public getPlanActions(showNotification: boolean): void {
    this.subscriptions.push(
      this.planActionService.getAllPlanActions().subscribe(
        (response: PlanAction[]) => {
          this.planActions = response;
          this.totalElements = response.length;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} Actions trouvées.` );
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message );
        }
      )
    );
  }


  public addPlanAction(planActionForm: NgForm): void {
    const formData = this.planActionService.createFormData(planActionForm.value);
    this.subscriptions.push(
      this.planActionService.addNewPlanAction(formData).subscribe(
        (response: PlanAction) => {
          this.clickButton('new-PlanAction-close');
          this.getPlanActions(false);
          planActionForm.reset();
          this.sendNotification(NotificationType.SUCCESS,`${response.theme} Action ajoutée avec succès` );
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );
  }

  public savePlanAction(): void {
    this.clickButton('new-PlanAction-save');
  }

  public updatePlanAction(): void {
    const formData = this.planActionService.createFormData(this.editPlanAction);
    this.subscriptions.push(
      this.planActionService.updatePlanAction(formData).subscribe(
        (response: PlanAction) => {
          this.clickButton('edit-PlanAction-close');
          this.getPlanActions(false);
          this.sendNotification(NotificationType.SUCCESS, `${response.theme} Action est à jour avec succès` );
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(
            NotificationType.ERROR,
            errorResponse.error.message
          );
        }
      )
    );
  }


  public editPlanActionInfo(editPlanAction: PlanAction): void {
    this.editPlanAction = editPlanAction;
    this.clickButton('openEditPlanAction');
  }

  public deletePlanAction(id: number): void {
    this.subscriptions.push(
      this.planActionService.deletePlanAction(id).subscribe(
        (response: any) => {
          this.sendNotification(
            NotificationType.SUCCESS,
            response.message
          );
          this.getPlanActions(false);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(
            NotificationType.ERROR,
            errorResponse.error.message
          );
        }
      )
    );
  }

  public searchPlanAction(searchTerm: string): void {
    const results: PlanAction[] = [];
    for (const planAction of this.planActions) {
      if (
        planAction.theme.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        planAction.cause.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        planAction.action.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        planAction.responsable.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 
      ) {
        results.push(planAction);
      }
    }
    this.planActions = results;
    if (results.length === 0 || !searchTerm) {
      this.getPlanActions(false);
    }
  }


  public get isAdmin() : boolean {
    return this.getUserRole() === Role.ADMIN  || this.getUserRole() ===  Role.SUPER_ADMIN ;
   }
 
   public get isManager() : boolean {
     return this.isAdmin || this.getUserRole() ===  Role.MANAGER ;
   }
    public get isAdminOrManager() : boolean {
     return this.isManager || this.isAdmin ;
   }
 
   private getUserRole() : string {
     return this.authenticationService.getUserFromLocalCache().role ;
   }

  private sendNotification(notificationType: NotificationType, message: string) :void{
    if(message){
        this.notificationService.notify(notificationType,message) ;
      } else {
        this.notificationService.notify(notificationType, 'An error occure . please try again ');
      }
  }

  private clickButton(buttonId : string) : void {
    document.getElementById(buttonId).click();
  }

  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }

}
