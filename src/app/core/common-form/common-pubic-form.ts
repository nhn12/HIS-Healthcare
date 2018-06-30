import { Input, SimpleChanges } from "@angular/core";
import { CheckboxOptions } from "../../share-component/check-box-component/check-box-component.component";

export abstract class CommonPublicForm {
    public description: string;
    public dataList: any[] = [];
    public resource: string;
    public optional: CheckboxOptions;

    @Input() callbackSubmit;
    @Input() data;

    protected initComponent() {
        this.resource = this.registerResource();
        this.optional = this.registerOptional();
        this.mapData();
        this.callbackSubmit = () => {
            return this.getData();
        }
    }

    public ngOnChanges(change: SimpleChanges) {
        if(change['data'].currentValue) {
            this.mapData();
        }
    }

    protected getData(): any {
        return { data: this.dataList, description: this.description };    
    }

    protected mapData() {
        if (this.data) {
            this.dataList = this.data.data;
            this.description = this.description;
        }
    }

    protected abstract registerResource();
    protected abstract registerOptional();
}