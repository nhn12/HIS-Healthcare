import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Injector } from '@angular/core';
import { BaseComponent } from "./base-component";

/**
 * @author NamNguyen
 * @email nhn12.hoangnam@gmail.com
 * @create date 2018-09-02 05:33:18
 * @modify date 2018-09-02 05:33:18
 * @desc [description]
*/
export abstract class BaseFormActionComponent<T> extends BaseComponent {

    private route: ActivatedRoute;

    // Form schema variable;
    form = new FormGroup({});
    model: any = {};
    fields: FormlyFieldConfig[];

    constructor(protected injector: Injector) {
        super();
        this.route = this.injector.get(ActivatedRoute);
        this.fields = this.createFormSchema();

        if(this.detectMode() == FormActionMode.EDIT) {
            async () =>{
                let model = await this.getData();
                this.initFormData(model);
            }
        }
    }

    /**
     * Detect mode add/edit. 0: Add, 1: Edit
     */
    public detectMode(): number {
        if(this.route.snapshot.url.join('').indexOf("edit") != -1) {
            return FormActionMode.EDIT;
        }
        return FormActionMode.ADD;
    }

    /**
     * Get params from url. Example blog/1, return 1
     */
    public getKeyParameter(): Promise<string> {
        return new Promise((resolve)=>{
            this.route.params.subscribe(result=>{
                resolve(result['id']);
            })
        });
    }

    public abstract async getData(): Promise<T>;

    public abstract async submitData(data: T): Promise<boolean>;

    public abstract initFormData(data: T): void;

    public abstract createFormSchema(): FormlyFieldConfig[];

    /**
     * Handle navigate after submit success
     */
    public linkAfterSubmit(): string {
        return '';
    }
}

export enum FormActionMode {
    ADD, EDIT
}