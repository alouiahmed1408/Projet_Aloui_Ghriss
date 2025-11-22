import { Component, inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Compte } from '../../model/compte';
import { ClientsService } from '../../services/clients-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modifier-compte',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modifier-compte.html',
  styleUrls: ['./modifier-compte.css'],  
})
export class ModifierCompte implements OnInit {

  form!: FormGroup;
  client!: Compte|undefined ;

  private readonly clientsService = inject(ClientsService);
  private readonly fb = inject(FormBuilder);

  ngOnInit(): void {

    
    this.form = this.fb.nonNullable.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });


    const username = localStorage.getItem("username");

    if (!username) {
      console.error("Aucun username trouvé dans le localStorage");
      return;
    }

   
   this.clientsService.getClients().subscribe((clients: Compte[]) => {
  this.client = clients.find(c => c.username === username);
  if (this.client) {
    this.form.patchValue({
      username: this.client.username,
      password: this.client.password
    });
  }
});


  }
  
  get isClient(): boolean {
  return localStorage.getItem('state') === 'connected_Client';
}

get isAdmin(): boolean {
  return localStorage.getItem('state') === 'connected_Admin';
}
router=inject(Router);

  modifier(): void {
  if (!this.client) return console.error("Client non chargé");

  const id = this.client.id.toString();
  const username = this.form.value.username;
  const password = this.form.value.password;

  this.clientsService.updateClientCredentials(id, username, password).subscribe({
    
  });
  if (this.isClient) {
   this.router.navigate(['client/profile']);}
   else if (this.isAdmin) {
   this.router.navigate(['admin/profile']);
}
}  

  




}
