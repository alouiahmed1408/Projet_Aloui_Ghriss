import { Commentaire } from "./commentaire";
import { Fidele } from "./fidele";
import { Preparation } from "./preparation";
import { Produit } from "./produit";

export interface SiteKoulTounsi {
    id: string;
    nom: string;
    localisation: string;
    photo: string;
    dateDecouverte: Date;
    prixEntree: number;
    commentaires: Commentaire[];
    recette: Produit[];
    Personnes: number;
    temps_preparation: number;
    Preparation: Preparation[];
    ClientFidéle:Fidele[];
}
