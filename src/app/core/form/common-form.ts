import { Location } from '@angular/common';
import { HttpService } from '../http/http.service';
import { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { mapValueToField } from './form-mapping';
import { parseObject } from './parser-utils';

export abstract class CommonForm {

    public actionText: string;

    _service: any;

    complexForm: FormGroup;
    public mode: string; //mode component

    isLoading = false;

    data: any = {};

    controls: any;
    constructor(private _location: Location,
        public router: Router,
        public routeP: ActivatedRoute,
        public fb: FormBuilder, public http: HttpService) {
    }

    ngOnInit() {
        this.initComponent();
    }

    public async initComponent() {
        this.initFormBuilder();
        let params = await this.detechMode();
        if (params == undefined) {
            this.mode = 'add';
            this.actionText = 'Lưu';

            for (let item in this.complexForm.controls) {
                if (this.complexForm.controls[item] instanceof FormArray) {
                    (this.complexForm.controls[item] as FormArray).push(this.getSubForms());
                }
            }
        } else {
            this.data = params;
            this.mode = 'update';
            this.actionText = 'Lưu';
            console.log(params);
            mapValueToField(params, this.complexForm, () => {
                return this.getSubForms();
            });
        }
    }

    public abstract initFormBuilder();

    public cancel() {
        this.complexForm.reset();
        this._location.back();
    }

    public async submit(data) {
        let functionAction: any;

        this.isLoading = true;
        if (this.mode == 'add') {
            functionAction = ((data) => { return this.http.insert(this.getUrlAction() + "/insert", data, null) });
        }

        if (this.mode == 'update') {
            functionAction = ((data) => { return this.http.update(this.getUrlAction() + "/update", data, null) });
        }

        const [error, response] = await functionAction(data).await();
        this.isLoading = false;

        if (response) {
            this._location.back();
            return;
        }

        return [error, response];
    }

    /**
     * @description: Set service to save and update data
     */
    public abstract getUrlAction(): string;

    public abstract setMappingData(): any;

    /**
     * @description: Set sub form
     */
    public abstract getSubForms();

    private async detechMode() {
        return await new Promise((resolve) => {
            this.routeP.queryParams.subscribe(result => {
                if (!result) {
                    resolve(undefined);
                    return;
                }

                let count = 0;
                for (var item in result) {
                    count++;
                }

                if (count == 0) {
                    resolve(undefined);
                    return;
                }
                if (!result.data) {
                    resolve(null);
                    return;
                }
                let data = JSON.parse(result.data);
                parseObject(data, this.setMappingData());
                resolve(data);
            })
        })
    }
}