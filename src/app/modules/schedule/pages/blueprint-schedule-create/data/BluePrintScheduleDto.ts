export class BlueprintScheduleDto {
    public ward_id: number;
    public ward_name: string;
    public specialization_id: number;
    public specialization_name: string;

    public id: Number;
    public start_time: Date;
    public end_time: Date;
    public doctor_id: Number;
    public period: Number;

    public has_sync: {type: Boolean; default: false};

    //audit tbl
    public created_by: String;
    public created_date: Date;
    public updated_date: Date;
    public deleted_flag: Date; 
}