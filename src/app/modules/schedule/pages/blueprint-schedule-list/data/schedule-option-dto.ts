export class ScheduleOptionDto {
    public option: string;
    public start_time: Date;
    public end_time: Date;

    public selected: boolean;
    public title: string;
    public isSub: boolean;
    public subSchedule: ScheduleOptionDto[];

    public type: string;
    public isEdit: boolean;

    constructor(option: string, 
        startDate: Date, 
        endDate: Date, 
        title: string, 
        isSub, 
        selected, 
        type: string,
        isEdit: boolean,
        subSchedule: ScheduleOptionDto[]) {
        this.option = option;
        this.start_time = startDate;
        this.end_time = endDate;
        this.title = title;
        this.isSub = isSub;
        this.subSchedule = subSchedule;
        this.selected = selected;
        this.type = type;
        this.isEdit = isEdit;
    }
}