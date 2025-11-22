import { Component, inject, OnInit } from '@angular/core';
import { SiteKoulTounsi } from '../../model/site-koul-tounsi';
import { ActivatedRoute } from '@angular/router';
import { RepasService } from '../../services/repas-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-repas',
  imports: [FormsModule],
  templateUrl: './edit-repas.html',
  styleUrl: './edit-repas.css',
})
export class EditRepas implements OnInit{
 repas!: SiteKoulTounsi;
  private route = inject(ActivatedRoute);
  private repasService = inject(RepasService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.repasService.getRepas().subscribe(allRepas => {
    this.repas = allRepas.find(r => r.id === id)!;
  });
  }

  save() {
    this.repasService.editRepas(this.repas.id, this.repas).subscribe(() => {
      alert("Repas modifié !");
    });
  }
}
