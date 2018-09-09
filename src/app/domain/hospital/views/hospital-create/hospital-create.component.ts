import { DefaultCondition } from './../../../../core/http-query/condition/default-condition';
import { HospitalDetailModel } from '../../model/hospital-detail-model';
import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../provider/hospital-service';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '../../../../../../node_modules/@ngx-formly/core';
import { BaseFormActionComponent } from '../../../../core/form/base-form-action-component';

@Component({
    selector: 'hospital-create',
    templateUrl: 'hospital-create.component.html',
    styleUrls: ['./hospital-create.component.scss']
})

export class HospitalCreateComponent extends BaseFormActionComponent<HospitalDetailModel> implements OnInit {

    public hospitalForm: FormGroup;
    public image: string[] = [];

    constructor(protected injector: Injector, 
        private formBuilder: FormBuilder, 
        private hospitalService: HospitalService, 
        private router: Router) {
        super(injector);
    }

    ngOnInit() {
        this.initForm();
    }


    public getData(): Promise<HospitalDetailModel> {
        return null;
    }
    public submitData(data: HospitalDetailModel): Promise<boolean> {
        return null;
    }
    public initFormData(data: HospitalDetailModel): void {
        return;
    }
    public createFormSchema(): FormlyFieldConfig[] {
        return [
            {
                className: 'section-label',
                template: '<div class="form-title"><strong>Thông tin bệnh viện</strong></div>',
            }, {
                key: 'name',
                type: 'input',
                wrappers: ['form-field-horizontal'],
                templateOptions: {
                    type: 'text',
                    label: 'Tên',
                    placeholder: 'Tên bệnh viện',
                    required: true,
                }
            },
            {
                key: 'address',
                type: 'textarea',
                wrappers: ['form-field-horizontal'],
                templateOptions: {
                    label: 'Địa chỉ',
                    placeholder: 'Địa chỉ',
                    required: false,
                    rows: 5
                },
            },
            {
                key: 'phone',
                type: 'input',
                wrappers: ['form-field-horizontal'],
                templateOptions: {
                    type: "number",
                    label: 'Số ĐT',
                    required: false,
                    rows: 5
                },
            },
            {
                key: 'hospital_type',
                type: 'select',
                wrappers: ['form-field-horizontal'],
                templateOptions: {
                    label: 'Loại bệnh viện',
                    required: true,
                    rows: 5,
                    attributes: { url: "type/query", condition: '{"class": "HOSPITAL_TYPE"}' }
                }
            },
            {
                className: 'section-label',
                template: '<div class="form-title"><strong>Thông tin đăng nhập</strong></div>',
            }, {
                key: 'username',
                type: 'input',
                wrappers: ['form-field-horizontal'],
                templateOptions: {
                    type: "text",
                    label: 'Tên đăng nhập',
                    required: true,
                    rows: 5
                },
            },
            {
                key: 'password',
                type: 'input',
                wrappers: ['form-field-horizontal'],
                templateOptions: {
                    type: "password",
                    label: 'Mật khẩu',
                    required: true,
                    addonRight: {
                        class: 'fa fa-eye',
                    },
                },
            }];
    }

    async submit(model) {
        //model.image = this.convertImageLib();
        model.account = { username: model.username, password: model.password };

        let [error, response] = await this.hospitalService.insert(model).await();
        if (response) {
            this.router.navigate(['hospital/list'], { replaceUrl: true });
        }
    }

    onUploadFinished(e) {
        console.log(e);
        this.model.image = e.src;
    }

    initForm() {
        this.hospitalForm = this.formBuilder.group({
            name: [null, Validators.required],
            email: [null, [Validators.email]],
            phone: [null],
            address: [null],
            image: [null],
            account: this.formBuilder.group({
                username: [null, Validators.required],
                password: [null, Validators.required]
            })
        });
    }

    async onSubmit() {
        this.convertImageLib();

        if (!this.hospitalForm.valid) {
            return;
        }

        let [error, response] = await this.hospitalService.insert(this.hospitalForm.value).await();
        if (response) {
            this.router.navigate(['hospital/list'], { replaceUrl: true });
        }

    }

    private convertImageLib() {
        console.log(this.image);
        if (this.image && this.image.length > 0) {
            return this.image[0];
        }
        return null;
    }
}