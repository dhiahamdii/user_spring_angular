import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule ,  HTTP_INTERCEPTORS }  from '@angular/common/http' ;
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from './service/authentication.service';
import { UserService } from './service/user.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AuthenticationGuard } from './guard/authentication.guard';
import { NotificationModule } from './notification.module';
import { NotificationService } from './service/notification.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GroupComponent } from './group/group.component';
import { SettingComponent } from './setting/setting.component';
import { UniteFabricationComponent } from './unite-fabrication/unite-fabrication.component';
import { LigneProductionComponent } from './ligne-production/ligne-production.component';
import {NgxPaginationModule} from 'ngx-pagination' ;
import { PosteComponent } from './poste/poste.component' ;
import { ProfileComponent } from './profile/profile.component';
import { PicklisteComponent } from './pickliste/pickliste.component';
import { DashbordChartComponent } from './dashbord-chart/dashbord-chart.component' ;
import { NgChartsModule  } from 'ng2-charts';
import { SidenavigationComponent } from './sidenavigation/sidenavigation.component';
import { AcceuilPageComponent } from './acceuil-page/acceuil-page.component';
import { ChatComponent } from './chatc/chat.component';
import { ReclamationComponent } from './reclamation/reclamation.component';

import { NgxSocialShareModule } from 'ngx-social-share';
import { MainComponent } from './main/main.component';
import { TrgByDayComponent } from './trg-by-day/trg-by-day.component';
import { TrgByLigneComponent } from './trg-by-ligne/trg-by-ligne.component';
import { TrgPlanActionComponent } from './trg-plan-action/trg-plan-action.component';
import { Top3LigneComponent } from './top3-ligne/top3-ligne.component';
import { DashbordTrgComponent } from './dashbord-trg/dashbord-trg.component';
import { TopWigdetsComponent } from './top-wigdets/top-wigdets.component';
import { ChartModule } from 'angular-highcharts';
import { TrgByProduitComponent } from './trg-by-produit/trg-by-produit.component';
import { TrgByShiftComponent } from './trg-by-shift/trg-by-shift.component';
import {CommonModule} from "@angular/common";




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    GroupComponent,
    SettingComponent,
    UniteFabricationComponent,
    LigneProductionComponent,
    PosteComponent,
    ProfileComponent,
    PicklisteComponent,
    DashbordChartComponent,
    SidenavigationComponent,
    AcceuilPageComponent,
    ChatComponent,
    ReclamationComponent,

    MainComponent,
    TrgByDayComponent,
    TrgByLigneComponent,
    TrgPlanActionComponent,
    Top3LigneComponent,
    DashbordTrgComponent,
    TopWigdetsComponent,
    TrgByProduitComponent,
    TrgByShiftComponent,



  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NotificationModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        NgxPaginationModule,
        NgChartsModule,
        NgxSocialShareModule,
      CommonModule,

        ChartModule,
        ReactiveFormsModule,


    ],
  providers: [NotificationService , AuthenticationGuard ,AuthenticationService , UserService ,
     { provide :HTTP_INTERCEPTORS , useClass : AuthInterceptor , multi :true }] ,
  bootstrap: [ AppComponent ]
})
export class AppModule {}


