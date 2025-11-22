import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-menu',
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
get isLogged(): boolean {
  return localStorage.getItem('state') === 'connected_Client' ||
         localStorage.getItem('state') === 'connected_Admin';
}

get isClient(): boolean {
  return localStorage.getItem('state') === 'connected_Client';
}

get isAdmin(): boolean {
  return localStorage.getItem('state') === 'connected_Admin';
}

logout() {
  localStorage.clear();
  location.reload();
}

}
