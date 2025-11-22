import { Component, inject, OnInit } from '@angular/core';
import { Compte } from '../../model/compte';
import { ClientsService } from '../../services/clients-service';


@Component({
  selector: 'app-liste-clients',
  imports: [],
  templateUrl: './liste-clients.html',
  styleUrl: './liste-clients.css'
})
export class ListeClients implements OnInit {

lesclients:Compte[]=[];
private readonly clientsService:ClientsService=inject(ClientsService);
ngOnInit(): void {
 this.clientsService.getClients().subscribe((clients) => {
      this.lesclients = clients.filter(client => client.role !== 'Admin');}
 )
}
deleteClient(id:string){
  if (confirm("Voulez-vous supprimer ce Client ?")) {
this.clientsService.deleteClient(id).subscribe(()=>{this.lesclients=this.lesclients.filter(r => r.id !== id)});}
}
toggleFidele(client: Compte) {
    client.ClientFidele = !client.ClientFidele; 
    this.clientsService.updateClient(client.id, client).subscribe({});
  }



}
