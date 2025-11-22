import { inject, Injectable } from '@angular/core';
import { SiteKoulTounsi } from '../model/site-koul-tounsi';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const url="http://localhost:3001/koultounsi";
@Injectable({
  providedIn: 'root',
})

export class RepasService {
  
  
  private readonly http:HttpClient=inject(HttpClient);
  public getRepas():Observable<SiteKoulTounsi[]>{
    return this.http.get<SiteKoulTounsi[]>(url);
  }
  public addRepas(r:SiteKoulTounsi):Observable<SiteKoulTounsi>{
      return this.http.post<SiteKoulTounsi>(url,r);
    }
  public  deleteRepas(id:string):Observable<SiteKoulTounsi>{
    return this.http.delete<SiteKoulTounsi>(url+"/"+id);
  }
  public editRepas(id:string,r:any):Observable<SiteKoulTounsi>{
    return this.http.put<SiteKoulTounsi>(url+"/"+id, r);
  }
  

  
}
