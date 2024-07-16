import { Time } from "@angular/common";

export class Demandecartes{
    nombredescarte!:number;
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
    nombredescarte!:number;
    idUser!:any;
    commentaire!:string;
    validationI!:boolean;
    validationF!:boolean;
    user?: any; // Remplacez `any` par l'interface utilisateur appropriée si elle existe
    statut!:string;
    time!:Date;
}
