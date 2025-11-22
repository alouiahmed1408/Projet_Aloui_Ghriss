import { Component, inject } from '@angular/core';
import { SiteKoulTounsi } from '../../model/site-koul-tounsi';
import { RepasService } from '../../services/repas-service';
import { JsonPipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DtPipe } from '../../pipe/dt-pipe';

@Component({
  selector: 'app-liste-repas',
  imports: [RouterLink,FormsModule,DtPipe],
  templateUrl: './liste-repas.html',
  styleUrl: './liste-repas.css'
})
export class ListeRepas {


repas:SiteKoulTounsi[]=[];
filteredRepas: SiteKoulTounsi[] = [];
searchTerm: string = '';

searchLocation: string = '';
private readonly repasService:RepasService=inject(RepasService);
ngOnInit(): void {
    this.repasService.getRepas().subscribe(data1 => {
      this.repas = data1;
      this.filteredRepas = [...this.repas]; 
    });
  }
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
supprimeRepas(id: string) {
    if (confirm("Voulez-vous supprimer ce repas ?")) {
      this.repasService.deleteRepas(id).subscribe(() => {
        this.repas = this.repas.filter(r => r.id !== id);
      });
    }
  }
   filterRepas() {
  const nameTerm = this.searchTerm.toLowerCase().trim();
  const locationTerm = this.searchLocation.toLowerCase().trim();

  this.filteredRepas = this.repas.filter(r => {
    const matchesName = nameTerm ? r.nom.toLowerCase().includes(nameTerm) : true;
    const matchesLocation = locationTerm ? r.localisation.toLowerCase().includes(locationTerm) : true;
    return matchesName && matchesLocation;
  });
}
}
