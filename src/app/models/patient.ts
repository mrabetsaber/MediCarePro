import { Appointment } from 'src/app/models/appointment';

export class Patient {
    id:string='';
    nom : string = '';
    prenom : string = '';
    region : string = '';
    numTel : string = '';
    dateNaissance:string= '';
    profession : string = '';
    couvertureSocial : string = '';
    gender : string = '';
    numDossier:string='';
    dateNaissanceFilter:string='';
    appointments:Appointment[]=[];
   

    constructor() {}
}
