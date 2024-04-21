import { Patient } from 'src/app/models/patient';
export class Appointment 
{
    patientname : string = '';
    patientid : string = '';
    email : string = '';
    doctorname : string = '';
    specialization : string = '';
    date : string = '';
    age : string = '';
    gender : string = ''
    problem : string = '';
    slot : string = '';
    appointmentstatus : string = 'false';
    admissionstatus : string = 'false';
    patient:Patient=new Patient();

    constructor() {}
}
