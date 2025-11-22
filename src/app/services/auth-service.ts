import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const ADMIN_STATE_STRING = 'connected_Admin';
const CLIENT_STATE_STRING = 'connected_Client';
const DISCONNECTED_STATE_STRING = 'disconnected';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  typesession: string = "";
  
  login(username: string, pwd: string, role: 'Client' | 'Admin'): Observable<boolean> {
    const connected = username !== "" && pwd !== "";
    if (connected) {
      const stateString = role === 'Admin' ? ADMIN_STATE_STRING : CLIENT_STATE_STRING;
      localStorage.setItem("state", stateString);
      localStorage.setItem("username", username); 
      return of(connected);
    } else {
      this.logout();
      return of(connected);
    }
  }

  logout() {
    localStorage.setItem('state', DISCONNECTED_STATE_STRING);
  }
}
