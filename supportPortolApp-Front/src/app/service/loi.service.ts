import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loi } from '../Models/Loi';

@Injectable({
  providedIn: 'root'
})
export class LoiService {

  constructor(private http:HttpClient) { 
  } 
  public getLois():Observable<Loi[]>{
    return this.http.get<Loi[]>("http://localhost:8089/PI/Loi");
  }
  public getLoiLast():Observable<Loi[]>{
    return this.http.get<Loi[]>("http://localhost:8089/PI/Loi/last");
  }
  addLoi(Loi:Loi){
    return this.http.post<Loi>("http://localhost:8089/PI/Loi",Loi);
    }
    updateLoi(id:number ,Loi:Loi){
      return this.http.put<Loi>("http://localhost:8089/PI/Loi/"+id,Loi);
      }




      public getLoi(id:number):Observable<Loi[]>{
        return this.http.get<Loi[]>("http://localhost:8089/PI/Loi/Doc/"+id);
        }




















        public getLoi1(id:number){
          return this.http.get("http://localhost:8089/PI/Loi/"+id);
      
          }
        public deleteLoiById(id:number){
          return this.http.delete("http://localhost:8089/PI/Loi/"+id);
      
          }
}
