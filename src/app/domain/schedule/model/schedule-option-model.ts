export class ScheduleOptionModel {
    public option: string;
    public start_time: Date;
    public end_time: Date;

    public selected: boolean;
    public title: string;
    public isSub: boolean;
    public subSchedule: ScheduleOptionModel[];

    public type: string;
    public isEdit: boolean;
    public hospital_id: Number;


    constructor(option: string,
        startDate: Date,
        endDate: Date,
        title: string,
        isSub,
        selected,
        type: string,
        isEdit: boolean,
        subSchedule: ScheduleOptionModel[]) {
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