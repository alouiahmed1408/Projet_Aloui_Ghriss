import { Component, inject, OnInit } from '@angular/core';
import { SiteKoulTounsi } from '../../model/site-koul-tounsi';
import { ActivatedRoute } from '@angular/router';
import { RepasService } from '../../services/repas-service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { firstValueFrom, min } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Compte } from '../../model/compte';
import { ClientsService } from '../../services/clients-service';
import { MinPipe } from '../../pipe/min-pipe';

    const currentUser = localStorage.getItem("username") ?? 'Anonyme';
@Component({
  selector: 'app-selected-repas',
  imports: [CommonModule, FormsModule,MinPipe],
  standalone: true, 
  templateUrl: './selected-repas.html',
  styleUrl: './selected-repas.css'
})
export class SelectedRepas implements OnInit {
  repas!: SiteKoulTounsi; 
  private route = inject(ActivatedRoute);
  private repasService = inject(RepasService);
  currentClient!: Compte;
  isFavorite = false; 

  private clientsService = inject(ClientsService);
  

  ngOnInit(): void {
  this.route.params.subscribe(p => {
    const id = p['idP'];

    this.repasService.getRepas().subscribe(data => {
      this.repas = data.find(r => r.id === id)!;

      this.clientsService.getClients().subscribe(clients => {
        const client = clients.find(c => c.username === currentUser);
        if (client) {
          this.currentClient = { ...client };
          this.isFavorite = this.currentClient.fav_repas.includes(this.repas.nom);
        }
      });

    });
  });
}

  newComment = { nom: '', message: '' };

  addComment() {
    
    if (this.newComment.message.trim()) {
      this.newComment = { nom: currentUser, message: this.newComment.message};
      
      this.repas.commentaires.push({ nom: currentUser, message: this.newComment.message });
this.newComment.message = '';

      this.repasService.editRepas(this.repas.id, this.repas).subscribe();
      
    }
  }

toggleFavorite() {
  if (this.isFavorite) {
    this.currentClient.fav_repas = this.currentClient.fav_repas.filter(
      r => r !== this.repas.nom
    );
  } else {
    this.currentClient.fav_repas.push(this.repas.nom);
  }

  this.isFavorite = !this.isFavorite;

  this.clientsService.updateClient(this.currentClient.id, this.currentClient).subscribe({});
}

  get isClient(): boolean {
  return localStorage.getItem('state') === 'connected_Client';
}
}