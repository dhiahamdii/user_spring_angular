import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {Reclamation} from "../model/reclamation";
import {CostumHttpResponse} from "../model/custom-http-response";
import {Poste} from "../model/poste";
import {LigneProduction} from "../model/ligneProduction";

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {


  private host  = environment.apiUrl ;

  constructor(private http : HttpClient ) { }



  //list
  public getListReclamation ():Observable < Reclamation[] > {
    return this.http.get<Reclamation[]>(`${this.host}/reclamation/list`);
  }
//delete
  public deleteReclamation (id : number ):Observable < Reclamation > {
    return this.http.delete<Reclamation>(`${this.host}/reclamation/delete/${id}`);
  }

  public getTotalReclamation(): Observable<number> {
    return this.http.get<number>(`${this.host}/reclamation/count`);
  }


  //add
  public addReclamation(formData: FormData):Observable<Reclamation> {
    return this.http.post<Reclamation>(`${this.host}/reclamation/addReclamation`, formData);
  }
  addEmployee(reclamation: Reclamation): Observable<Object>{
    return this.http.post(`${this.host}`, reclamation);
  }







  public createFormData(reclamation :  Reclamation) : FormData {
    const formData = new FormData();

    formData.append('email',reclamation.email) ;
    formData.append('descrRec',reclamation.descrRec) ;
    return formData ;
  }


}
