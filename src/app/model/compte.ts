import { Fidele } from "./fidele";
import { SiteKoulTounsi } from "./site-koul-tounsi";

export interface Compte {
    id: string;
    username: string;
    nomClient: string;
    prenom: string;
    age: number;
    password: string;
    fav_repas: string[];
    photoClient: string;
    nombrevisite: number;
    ClientFidele: boolean;
    role:string;
}

