import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SiteKoulTounsi } from '../../model/site-koul-tounsi';
import { ActivatedRoute, Router } from '@angular/router';
import { RepasService } from '../../services/repas-service';

@Component({
  selector: 'app-add-new-repas',
  imports: [FormsModule],
  templateUrl: './add-new-repas.html',
  styleUrl: './add-new-repas.css',
})
export class AddNewRepas implements OnInit {
  repas: SiteKoulTounsi = {
    id: '',
    nom: '',
    localisation: '',
    photo: '',
    dateDecouverte: new Date(),
    prixEntree: 0,
    commentaires: [],
    recette: [],
    Personnes: 0,
    temps_preparation: 0,
    Preparation: [],
    ClientFidéle: []
  };

  private repasService = inject(RepasService);
  private router = inject(Router);

  ngOnInit(): void {}

  addRepas() {
    this.repas.id = Date.now().toString();

    this.repasService.addRepas(this.repas).subscribe(() => {
      alert('Repas ajouté avec succès !');
      this.router.navigate(['/repas']);
    });
  }
}
