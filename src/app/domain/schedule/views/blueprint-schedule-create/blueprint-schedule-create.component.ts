import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CommonFiler } from './../../../../core/http-query/filter/common-filter';
import { BlueprintScheduleModel } from './../../model/blueprint-schedule-model';
import { HttpService } from './../../../../core/http/http.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { CommonForm } from '../../../../core/form/common-form';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalConfigService } from '../../../../core/local-config/local-config-service';
import { BaseFormActionComponent } from '../../../../core/form/base-form-action-component';
import { DefaultCondition } from '../../../../core/http-query/condition/default-condition';
import { ConditionOperator } from '../../../../core/http-query/condition/condition-operator';

@Component({
    selector: 'blueprint-schedule-create',
    templateUrl: 'blueprint-schedule-create.component.html',
    styleUrls: ['blueprint-schedule-create.component.scss']
})

export class BlueprintScheduleCreateComponent extends BaseFormActionComponent<BlueprintScheduleModel> implements OnInit {

    @ViewChild('wardModal') wardModal: ModalDirective;
    @ViewChild('specializationModal') specializationModal: ModalDirective;
    data: BlueprintScheduleModel = new BlueprintScheduleModel();

    specializationList: any[] = [];
    wardList: any[] = [];

    constructor(public location: Location,
        public injector: Injector,
        public router: Router,
        public routeP: ActivatedRoute,
        public fb: FormBuilder,
        public localConfig: LocalConfigService,
        public http: HttpService) {
        super(injector);
    }

    async ngOnInit() {
    }

    public getData(): Promise<BlueprintScheduleModel> {
        return null;
    }
    public async submitData(data: BlueprintScheduleModel): Promise<boolean> {
        this.isLoading = true;
        let [error, response] = await this.http.insert("blueprint-schedule/insert", data, null).await();
        this.isLoading = false;
        if (!error && response) {
            this.router.navigateByUrl(this.linkAfterSubmit());
        }
        return true;
    }
    public linkAfterSubmit() {
        super.linkAfterSubmit();
        return 'schedule/blueprint/list';
    }
    public initFormData(data: BlueprintScheduleModel): void {
        throw new Error("Method not implemented.");
    }
    public createFormSchema(): FormlyFieldConfig[] {
        let autoCorrectedDatePipe = createAutoCorrectedDatePipe('HH:MM');

        return [
            {
                className: 'section-label',
                template: '<div class="form-title"><strong>Thông tin</strong></div>',
            },
            {
                key: 'doctor_id',
                type: 'select',
                wrappers: ['form-field-horizontal'],
                templateOptions: {
                    type: 'text',
                    label: 'Bác sĩ',
                    placeholder: 'Bác sĩ',
                    required: true,
                    attributes: { url: "doctor/query", id: 'id' }
                }
            },
            {
                key: 'specialization_id',
                type: 'select',
                wrappers: ['form-field-horizontal'],
                lifecycle: {
                    onInit: () => {
                        this.form.controls['doctor_id'].valueChanges.subscribe(async flag => {
                            let value = await this.getDoctorById(this.form.controls['doctor_id'].value);
                            this.form.controls['specialization_id'].setValue(value);
                        });
                    }
                },
                expressionProperties: {

                },
                templateOptions: {
                    label: 'Chuyên khoa',
                    required: true,
                    attributes: { url: "specialization/query" },
                    disabled: true
                },
            },
            {
                key: 'date',
                type: 'datetime',
                wrappers: ['form-field-horizontal'],
                templateOptions: {
                    label: 'Ngày',
                    required: true
                }
            },
            {
                className: 'section-label',
                template: '<div class="form-title"><strong>Thời gian</strong></div>',
            },
            {
                key: 'time',
                type: 'repeat',
                fieldArray: {
                    fieldGroupClassName: 'row',
                    templateOptions: {
                        btnText: 'Thêm',
                        required: true
                    },
                    fieldGroup: [
                        {
                            className: 'col-sm-3',
                            template: '<label class=""></label>',
                        },
                        {
                            key: 'ward_id',
                            type: 'select',
                            className: 'col-sm-3',
                            templateOptions: {
                                label: 'Phòng khám',
                                required: true,
                                attributes: { url: "ward/query" }
                            }
                        },
                        {
                            key: 'start_time',
                            className: 'col-sm-2',
                            type: 'input-mask',
                            templateOptions: {
                                label: 'Từ ',
                                required: true,
                                attributes: {}
                            },
                            expressionProperties: { mask: [/\d/, /\d/, ':', /\d/, /\d/], pipe: 'HH:MM' }
                        },
                        {
                            key: 'end_time',
                            className: 'col-sm-2',
                            type: 'input-mask',
                            templateOptions: {
                                label: 'Đến',
                                required: true,
                                attributes: {}
                            },
                            expressionProperties: { mask: [/\d/, /\d/, ':', /\d/, /\d/], pipe: 'HH:MM' }
                        }
                    ],
                }
            }];
    }

    // public async initFormBuilder() {
    //     this.complexForm = this.fb.group({
    //         'id': [null],
    //         'start_time': [null, Validators.required],
    //         'end_time': [null, Validators.required],
    //         'period': [null, Validators.compose([Validators.required, Validators.max(99), Validators.min(1)])],
    //         'specialization_id': [null, Validators.required],
    //         'ward_id': [null, Validators.required],
    //         'hospital_id': [null]
    //     });
    // }

    // public getUrlAction() {
    //     return "blueprint-schedule";
    // }

    // public setService() {
    //     return this.http;
    // }

    // public setMappingData() {
    //     return null;
    // }

    // public getSubForms() {
    //     return null;
    // }

    // clear() {
    //     this.complexForm.reset();
    // }

    async getDoctorById(id) {
        const [err, response] = await this.http.search<any>('doctor/query',
            new CommonFiler(new DefaultCondition(ConditionOperator.EQ, 'id',
                id)), null, null, null).await();
        if (response && response.results && response.results.length > 0) {
            return response.results[0].specialization_id;
        }
        return null;
    }

    // async getWardType() {
    //     const [err, response] = await this.http.search<any>('ward/query',
    //         new CommonFiler(new AndCondition([new DefaultCondition(ConditionOperator.EQ, 'hospital_id',
    //             this.complexForm.controls['hospital_id'].value),
    //         new DefaultCondition(ConditionOperator.EQ, 'deleted_flag', false)])), null, null, null).await();
    //     if (response && response.results && response.results.length > 0) {
    //         this.wardList = response.results.map(value => {
    //             value.id = value.id;
    //             value.text = value.name;
    //             return value;
    //         });
    //     }
    // }

}