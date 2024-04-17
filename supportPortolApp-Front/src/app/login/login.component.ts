import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderType } from '../enum/header-type.enum';
import { NotificationType } from '../enum/notification-type.enum';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit , OnDestroy {

  private subscriptions : Subscription [] =[]; 

  constructor(  private notificationService :NotificationService , private router : Router ,
                private authenticationService :AuthenticationService) {}
    
  ngOnInit(): void {
    if(this.authenticationService.isUserLoggedIn()){
      this.router.navigateByUrl('/user/management') ;
    }else{
      this.router.navigateByUrl('/login') ; 
    }
  }


  ///// share fb 
  shareOnFacebook(imageSrc: string, imageName: string, imageDescription: string) {
    // Construisez l'URL de partage Facebook avec le src de l'image
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageSrc)}&title=${encodeURIComponent(imageName)}&description=${encodeURIComponent(imageDescription)}`;

    // Ouvrir une nouvelle fenêtre ou un nouvel onglet avec l'URL de partage Facebook
    window.open(facebookShareUrl, '_blank');
  } 

  public onLogin (user : User){
    this.subscriptions.push (
      this.authenticationService.login(user).subscribe(
        (response:HttpResponse<User>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN) ;
          this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalCache(response.body);
          this.router.navigateByUrl('/user/management') ;
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );     
  }

  private sendErrorNotification(notificationType: NotificationType, message: string) :void{
    if(message){
      this.notificationService.notify(notificationType,message) ;
    } else {
      this.notificationService.notify(notificationType, 'An error occure . please try again ');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }


}
