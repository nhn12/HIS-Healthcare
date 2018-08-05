import { HospitalAccountModel } from './hospital-account-model';
export class HospitalDetailModel {
    public id: Number;
    public name: string;

    public address: string;
    public phone: string;
    public email: string;
    public image: string;
    public status: boolean;
    public account: HospitalAccountModel;


    public updated_date: Date;
}