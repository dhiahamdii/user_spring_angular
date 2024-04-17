import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { Role } from '../enum/role';
import { CostumHttpResponse } from '../model/custom-http-response';
import { Group } from '../model/group';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { GroupService } from '../service/group.service';
import { NotificationService } from '../service/notification.service';
import {Chat} from "../model/chat";
import {ChatService} from "../service/chat.service";
import {Router} from "@angular/router";
import {Reclamation} from "../model/reclamation";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit , OnDestroy  {

  private subscriptions : Subscription [] = [] ;
  public groups :Group[] ;
  public editGroup= new Group () ;
  public user = new User () ;
  public groupe= new Group () ;
  public selectedGroup : Group ;
  private currentGroupeName : string ;
  public group : Group ;
  public members :User[] ;
  public nomGroupe : string ;
  public username : string ;
  private currentUsername : string ;


  p: number = 1;
  itemsPerPage : number = 6;
  totalElements: any ;
  public connectedUser : User ;
  public alluser: any = [];
  check = sessionStorage.getItem('username');
  chatId: any = 0;
  chatObj: Chat = new Chat();
  public chatData: any = [];


  constructor( private groupService : GroupService  , private chatService: ChatService, private router : Router , private notificationService : NotificationService ,
               private authenticationService : AuthenticationService){}

  ngOnInit () : void {
    this.getGroups(true) ;
  }

  public getGroups (showNotification : boolean ):void {
    this.subscriptions.push(
    this.groupService.getGroups().subscribe(
        (response : Group[] ) => {
          this.groups  = response ;
          this.totalElements=response.length;
          if (showNotification){
            this.sendNotification(NotificationType.SUCCESS, `${response.length} group(s) loaded successfully . `) ;
          }
        },
        (errorResponse : HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR , errorResponse.error.message) ;
        }
      )
    );
  }

  public saveNewGroupe () : void { // open newUserModal
    this.clickButton('new-group-save');
  }




  public addNewGroup (groupForm : NgForm) : void {
    const formData = this.groupService.createGroupFormData(null , groupForm.value ); // formGroupe Not yet created
    this.subscriptions.push(
      this.groupService.addGroup(formData).subscribe(
        (response : Group) => {
         this.clickButton('new-Group-close'); // id de button + groupe
          this.getGroups(false);
          groupForm.reset();
          this.sendNotification(NotificationType.SUCCESS , `${response.nomGroupe} Groupe added successfully`) ;
        },
        (errorResponse : HttpErrorResponse) => {
         this.sendNotification(NotificationType.ERROR , errorResponse.error.message) ;
        }
      )
    );
  }


  public editGroupInfo (editGroup :Group):void{
    this.editGroup = editGroup ;
    this.currentGroupeName=editGroup.nomGroupe;
    this.clickButton('openGroupEdit') ; // button id = (openUserEdit) hya data-target ta modal #EditGroupModal
  }

  public updateGroup () : void{
    const formData = this.groupService.createGroupFormData( this.currentGroupeName  , this.editGroup) ;
    this.subscriptions.push(
      this.groupService.updateGroup(formData).subscribe(
        (response : Group) => {
         this.clickButton('edit-group-close') ; // id de button edit groupe
          this.getGroups(false);
          this.sendNotification(NotificationType.SUCCESS , `${response.nomGroupe} Group updated successfully `) ;
        },
        (errorResponse : HttpErrorResponse) => {
         this.sendNotification(NotificationType.ERROR , errorResponse.error.message) ;
        }
      )
      );
  }


  public deleteGroupe (nomGroupe : string ):void{
    this.subscriptions.push(
      this.groupService.deleteGroup(nomGroupe).subscribe(
        (response : CostumHttpResponse) => {
        this.sendNotification(NotificationType.WARNING , response.message);
        this.getGroups(false);
      },
       (errorResponse : HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR , errorResponse.error.message) ;
       }
      )
    )
  }

  public getGroupMembers (showNotification : boolean):void {
    this.subscriptions.push(
    this.groupService.getGroupMembers(this.groupe.nomGroupe).subscribe(
        (response : User[] ) => {
          this.members  = response ;
          if (showNotification){
            this.sendNotification(NotificationType.SUCCESS, `${response.length} Members of this Group loaded successfully . `) ;
          }
        },
        (errorResponse : HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR , errorResponse.error.message) ;
        }
      )
    );
  }




  public groupMembersList (groupe :Group):void{
    this.groupe = groupe ;
    this.nomGroupe=groupe.nomGroupe;
    this.clickButton('openMembersList') ; //  id  du button hidden (list membre du groupe)
  }


  public assignUSerTogroupe (username : string , nomGroupe : string) : void{
    const formData = this.groupService.createUserGroupForm(this.username , this.nomGroupe , this.groupe ,  this.user);
    this.subscriptions.push(
      this.groupService.assignUSerTogroupe(formData).subscribe(
        (response : CostumHttpResponse) => {
         this.clickButton('user-group-close') ; // id de button edit groupe
          this.getGroupMembers(false);
          this.sendNotification(NotificationType.SUCCESS , response.message) ;
        },
        (errorResponse : HttpErrorResponse) => {
         this.sendNotification(NotificationType.ERROR , errorResponse.error.message) ;
        }
      )
      );
  }

  public addUserToGroupModal (groupe :Group):void{
    this.groupe = groupe ;
    this.nomGroupe=groupe.nomGroupe;
    this.clickButton('openAddToUserGroup') ; // button id = (openUserEdit) hya data-target ta modal #EditGroupModal
  }

  public removeUserFromGroup (username : string ):void{
    this.subscriptions.push(
      this.groupService.removeUserFromGroup(username).subscribe(
        (response : CostumHttpResponse) => {
        this.sendNotification(NotificationType.WARNING , response.message);
        this.getGroupMembers(false);
      },
       (errorResponse : HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR , errorResponse.error.message) ;
       }
      )
    )
  }


  public searchGroups (searchTerm : string) : void {
    const results : Group[] = [] ;
    for (const group of this.groups){
      if ( group.nomGroupe.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ){
            results.push(group) ;
      }
    }
    this.groups=results ;
    if (results.length === 0 || ! searchTerm){
      this.getGroups(false) ;
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







  goToChat(username: any) {
    this.chatService.getChatByFirstUserNameAndSecondUserName(username, sessionStorage.getItem("username")).subscribe(
      (data) => {
        this.chatId = data.chatId;
        this.currentUsername=this.authenticationService.getUserFromLocalCache().username ;

        sessionStorage.setItem("chatId", this.chatId);

        sessionStorage.setItem("gotochat", "false");
        this.router.navigateByUrl('/chat');
      },
      (error) => {
        if (error.status == 404) {
          this.chatObj.firstUserName = this.currentUsername;
          this.chatObj.secondUserName = username;
          this.chatService.createChatRoom(this.chatObj).subscribe(
            (data) => {
              this.chatData = data;
              this.chatId = this.chatData.chatId;
              sessionStorage.setItem("chatId", this.chatData.chatId);

              sessionStorage.setItem("gotochat", "false");
              this.router.navigateByUrl('/chat');
            })
        } else {

        }
      });

  }





  protected readonly Chat = Chat;
}
