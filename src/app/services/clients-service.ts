import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compte } from '../model/compte';
const API_URL="http://localhost:3000/clients";
@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private readonly http:HttpClient=inject(HttpClient);
  public getClients():Observable<Compte[]>{
    return this.http.get<Compte[]>(API_URL)
  }
  public addClient(c:Compte):Observable<Compte>{
    return this.http.post<Compte>(API_URL,c);
  }
  public updateClient(id: string, client: Compte): Observable<Compte> {
    return this.http.put<Compte>(`${API_URL}/${id}`, client);
  }
  public  deleteClient(id:string):Observable<Compte>{
      return this.http.delete<Compte>(API_URL+"/"+id);
    }
}
