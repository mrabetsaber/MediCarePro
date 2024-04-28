import { CustomDocument } from 'src/app/models/document';
import { Appointment } from 'src/app/models/appointment';
export class Operation {
    id:string='';
    date  : Date = new Date();
    observarions : string = '';
    // appointment:Appointment=new Appointment();
    documents:CustomDocument[]=[];
}
