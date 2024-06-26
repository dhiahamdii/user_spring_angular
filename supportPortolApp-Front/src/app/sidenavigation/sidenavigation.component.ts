import { Component, ElementRef, OnInit, AfterViewInit,  ViewChild, Renderer2 } from '@angular/core';
import { NotificationType } from '../enum/notification-type.enum';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { User } from '../model/user';
import { Role } from '../enum/role';
import {Chat} from "../model/chat";
import {ChatService} from "../service/chat.service";

declare const bx: any;


@Component({
  selector: 'app-sidenavigation',
  templateUrl: './sidenavigation.component.html',
  styleUrls: ['./sidenavigation.component.css']
})
export class SidenavigationComponent  implements AfterViewInit , OnInit{

  @ViewChild('sidebar') sidebarRef!: ElementRef;

  public connectedUser : User ;


   constructor(private renderer: Renderer2, private el: ElementRef , private router : Router  ,
               private authenticationService :AuthenticationService , private notificationService : NotificationService) {}

  ngOnInit(): void {
    this.connectedUser=this.authenticationService.getUserFromLocalCache();
  }

  ngAfterViewInit() {
    const arrowElements = this.el.nativeElement.querySelectorAll('.arrow');
    arrowElements.forEach((arrowElement: any) => {
      this.renderer.listen(arrowElement, 'click', () => {
        const arrowParent = arrowElement.parentElement.parentElement;
        arrowParent.classList.toggle('showMenu');
      });
    });
  }

  toggleSidebar(): void {
    const sidebar = this.sidebarRef.nativeElement;
    sidebar.classList.toggle('close');
  }

  public onLogOut() : void {
    this.authenticationService.lougOut() ;
    this.router.navigate(['/acceuil']) ;
    this.sendNotification(NotificationType.SUCCESS , `you have been Successfully Logout`) ;
  }


  private sendNotification(notificationType: NotificationType, message: string) :void{
    if(message){
        this.notificationService.notify(notificationType,message) ;
      } else {
        this.notificationService.notify(notificationType, 'An error occure . please try again ');
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

  public get isChefLigne() : boolean {
    return this.getUserRole() ===  Role.USER ;
 }

  private getUserRole() : string {
     return this.authenticationService.getUserFromLocalCache().role ;
  }















}
