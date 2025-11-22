import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListeRepas } from './component/liste-repas/liste-repas';
import { Home } from "./component/home/home";
import { Menu } from "./component/menu/menu";

@Component({
  selector: 'app-root',
  imports: [Menu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Vers1');
}
