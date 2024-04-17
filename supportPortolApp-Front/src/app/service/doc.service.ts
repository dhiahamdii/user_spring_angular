import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doc } from '../Models/Doc';
import { RulesStatistics } from '../Models/RuleStatistics';

@Injectable({
  providedIn: 'root'
})
export class DocService {

  constructor(private http:HttpClient) { 
  }

  public getDocs():Observable<Doc[]>{
    return this.http.get<Doc[]>("http://localhost:8089/PI/Doc");
  }
  public getDocstat():Observable<RulesStatistics[]>{
    return this.http.get<RulesStatistics[]>("http://localhost:8089/PI/Regle/sss");
  }
  addDoc(Doc:Doc){
    return this.http.post<Doc>("http://localhost:8089/PI/Doc",Doc);
    }
    updateDoc(id:number ,Doc:Doc){
      return this.http.put<Doc>("http://localhost:8089/PI/Doc/"+id,Doc);
      }
      public getDoc(id:number){
        return this.http.get("http://localhost:8089/PI/Doc/"+id);
    
        }
        public deleteDocById(id:number){
          return this.http.delete("http://localhost:8089/PI/Doc/"+id);
      
          }
}
