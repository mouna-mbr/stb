import { Time } from "@angular/common";

export class Demandecartes{
    nombreDeCartes!:number;
    idUser!:any;
    commentaire!:string;
    validationI!:boolean;
    validationF!:boolean;
    user?: any; // Remplacez `any` par l'interface utilisateur appropriée si elle existe
    idCarte!:any;
    statut!:string;
    time!:any;
}
export class Demandecarteswithoutid{
    nombreDeCartes!:number;
    idUser!:any;
    commentaire!:string;
    validationI!:boolean;
    validationF!:boolean;
    user?: any; // Remplacez `any` par l'interface utilisateur appropriée si elle existe
    statut!:string;
    time!:Date;
}
