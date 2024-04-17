import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PlanAction } from '../model/PlanAction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanActionService {

  private host  = environment.apiUrl ;

  constructor(private http : HttpClient ) { }

  public getAllPlanActions(): Observable<PlanAction[]> {
    return this.http.get<PlanAction[]>(`${this.host}/planAction/list`);
  }

  public getTotalPlanActions(): Observable<number> {
    return this.http.get<number>(`${this.host}/planAction/count`);
  }

  public addNewPlanAction(formData: FormData): Observable<PlanAction> {
    return this.http.post<PlanAction>(`${this.host}/planAction/add`, formData);
  }

  public updatePlanAction(formData: FormData): Observable<PlanAction> {
    return this.http.post<PlanAction>(`${this.host}/planAction/update`, formData);
  }

  public deletePlanAction(planActionId: number): Observable<any> {
    return this.http.delete<any>(`${this.host}/planAction/delete/${planActionId}`);
  }

  public createFormData(planAction : PlanAction) : FormData {
    const formData = new FormData();

    if (planAction.id) {
    formData.append('planActionId', planAction.id.toString());
  }else {
    formData.append('planActionId', '');
  }
    
    formData.append('theme',planAction.theme) ;
    formData.append('cause',planAction.cause) ;
    formData.append('action',planAction.action) ;
    formData.append('responsable',planAction.responsable) ;
    formData.append('delai', planAction.delai) ;

    if (planAction.dateRealise) {
    formData.append('dateRealise',planAction.dateRealise  as any);
    }else {
      formData.append('dateRealise', '');
    }
    console.log(planAction.dateRealise);

    if (planAction.efficacite) {
      formData.append('efficacite', planAction.efficacite);
    }else {
      formData.append('efficacite', '');
    }


    if (planAction.commentaire) {
      formData.append('commentaire', planAction.commentaire);
    }else {
      formData.append('commentaire', '');
    }

    return formData ; 
  }


}
