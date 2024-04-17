import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupComponent } from './group/group.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { LigneProductionComponent } from './ligne-production/ligne-production.component';
import { LoginComponent } from './login/login.component';
import { PosteComponent } from './poste/poste.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SettingComponent } from './setting/setting.component';
import { UniteFabricationComponent } from './unite-fabrication/unite-fabrication.component';
import { UserComponent } from './user/user.component';
import { PicklisteComponent } from './pickliste/pickliste.component';
import { DashbordChartComponent } from './dashbord-chart/dashbord-chart.component';
import { SidenavigationComponent } from './sidenavigation/sidenavigation.component';
import { AcceuilPageComponent } from './acceuil-page/acceuil-page.component';
import { DashbordTrgComponent } from './dashbord-trg/dashbord-trg.component';
import { TrgPlanActionComponent } from './trg-plan-action/trg-plan-action.component';
import { ChatComponent } from './chatc/chat.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import {HomeFrontComponent} from "./FrontOffice/home-front/home-front.component";
import {RegleUpdateComponent} from "./regle-update/regle-update.component";
import {LoiReglesComponent} from "./loi-regles/loi-regles.component";
import {RegleComponent} from "./regle/regle.component";
import {LastLoiComponent} from "./last-loi/last-loi.component";
import {DocLoisComponent} from "./doc-lois/doc-lois.component";
import {DocUpdateComponent} from "./doc-update/doc-update.component";
import {LoiUpdateComponent} from "./loi-update/loi-update.component";
import {LoiComponent} from "./loi/loi.component";
import {DocComponent} from "./doc/doc.component";

const routes: Routes = [
  {path : 'register' , component : RegisterComponent} ,
  {path : 'user/management' , component : UserComponent , canActivate : [AuthenticationGuard]} ,
  {path : 'group' , component : GroupComponent} ,
  {path : 'setting' , component : SettingComponent} ,
  {path : 'unite-fabrication' , component : UniteFabricationComponent }  ,
  {path : 'ligneProduction' , component : LigneProductionComponent }  ,
  {path : 'poste' , component : PosteComponent } ,
  {path : 'profile' , component : ProfileComponent } ,
  {path : 'pickliste' , component : PicklisteComponent } ,
  //{path : 'dashbord-chart' , component : DashbordChartComponent } ,
  {path :  '' , redirectTo : '/acceuil' , pathMatch : 'full'},
  {path : 'side-nav' , component : SidenavigationComponent },
  {path : 'acceuil' , component : AcceuilPageComponent },
  {path : 'login' , component : LoginComponent },

  {path : 'dashbordTrg' , component : DashbordTrgComponent },
  {path : 'planAction' , component : TrgPlanActionComponent },
  {path : 'chat' , component : ChatComponent },
  {path : 'reclamation' , component : ReclamationComponent },
  {
    path: "doc",
    component:  DocComponent
  }
  ,
  {
    path: "loi",
    component:  LoiComponent
  }
  ,
  {
    path: "loi/:id",
    component:  LoiUpdateComponent
  }
  ,
  {
    path: "doc/:id",
    component:  DocUpdateComponent
  } ,
  {
    path: "LastLoi",
    component:  LastLoiComponent
  }
  ,
  {
    path: "loidoc/:id",
    component:  DocLoisComponent
  }
  ,
  {
    path: "regle",
    component:  RegleComponent
  }
  ,
  {
    path: "regleLois/:id",
    component:  LoiReglesComponent
  }
  ,
  {
    path: "regle/:id",
    component:  RegleUpdateComponent
  }
  ,
  {
    path: "",
    component:  HomeFrontComponent
  }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
