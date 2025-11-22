import { Component, inject, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients-service';
import { Compte } from '../../model/compte';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-client',
  imports: [FormsModule],
  templateUrl: './profile-client.html',
  styleUrl: './profile-client.css',
})
export class ProfileClientComponent implements OnInit {

  private clientService = inject(ClientsService);
  client!: Compte;

  async ngOnInit():Promise<void>{
    const username = localStorage.getItem("username");

    this.clientService.getClients().subscribe(clients => {
      this.client = clients.find(c => c.username === username)!;
    });
  }
  removeFavorite(repas: string) {
    this.client.fav_repas = this.client.fav_repas.filter(r => r !== repas);

    this.clientService.updateClient(this.client.id, this.client).subscribe();
  }
}
