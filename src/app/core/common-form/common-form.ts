import { to } from 'app/utils/promise-utils';
import { CommonService } from 'app/core/common-services/common-service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { mapValueToField } from "../../utils/form-mapping";
import { Location } from '@angular/common';
import { parseObject } from '../../utils/parser-utils';

export abstract class CommonForm {

    public actionText: string;

    _service: any;

    complexForm: FormGroup;
    mode: string; //mode component

    isLoading: boolean = false;

    data: any = {};

    controls: any;
    constructor(private _location: Location, public router: Router, public routeP: ActivatedRoute, public fb: FormBuilder) {
        this.initComponent();
    }

    public async initComponent() {
        this.initFormBuilder();
        let params = await this.detechMode();
        if(params == undefined) { 
            this.mode = 'add';
            this.actionText = 'Lưu';

            for(var item in this.complexForm.controls) {
                if(this.complexForm.controls[item] instanceof FormArray) {
                    (this.complexForm.controls[item] as FormArray).push(this.getSubForms());
                }
            }
        } else {
            this.data = params;
            this.mode = 'update';
            this.actionText = 'Lưu';
            console.log(params);
            mapValueToField(params, this.complexForm, ()=>{ return this.getSubForms()});
        }
    }

    public abstract initFormBuilder();

    public cancel() {
        this.complexForm.reset();
        this._location.back();
    }

    public async submit(data) {
        let functionAction;

        this.isLoading = true;
        if(this.mode == 'add') {
            functionAction = ((data)=>{return this.setService().insertOne(data);})
        } 

        if(this.mode == 'update') {
            functionAction = ((data)=>{return this.setService().updateOne(data);})
        }

        let [error, response] = await to(functionAction(data).toPromise());
        this.isLoading = false;

        if(response) {
            this._location.back();
            return;
        }

        return [error, response];
    }

    /**
     * @description: Set service to save and update data
     */
    public abstract setService(): CommonService;

    public abstract setMappingData(): any;

    /**
     * @description: Set sub form
     */
    public abstract getSubForms();

    private async detechMode() {
        return await new Promise((resolve)=>{
            this.routeP.queryParams.subscribe(result=>{
                if(!result) {
                    resolve(undefined);
                    return;
                }

                let count = 0;
                for(var item in result) {
                    count++;
                }

                if(count == 0) {
                    resolve(undefined);
                    return;
                }

                let data = JSON.parse(result.data);
                parseObject(data, this.setMappingData());
                resolve(data);
            })
        })
    }
}