import { AndCondition } from './../../../../core/http-query/condition/and-condition';
import { ConditionOperator } from './../../../../core/http-query/condition/condition-operator';
import { DefaultCondition } from './../../../../core/http-query/condition/default-condition';
import { CommonFiler } from './../../../../core/http-query/filter/common-filter';
import { BlueprintScheduleModel } from './../../model/blueprint-schedule-model';
import { HttpService } from './../../../../core/http/http.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonForm } from '../../../../core/form/common-form';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalConfigService } from '../../../../core/local-config/local-config-service';

@Component({
    selector: 'blueprint-schedule-create',
    templateUrl: 'blueprint-schedule-create.component.html',
    styleUrls: ['blueprint-schedule-create.component.scss']
})

export class BlueprintScheduleCreateComponent extends CommonForm implements OnInit {
    @ViewChild('wardModal') wardModal: ModalDirective;
    @ViewChild('specializationModal') specializationModal: ModalDirective;
    data: BlueprintScheduleModel = new BlueprintScheduleModel();

    specializationList: any[] = [];
    wardList: any[] = [];


    public mask = [new RegExp('^[0-1]?[0-1]$'), new RegExp('^[0-1]?[0-9]$'), ':', new RegExp('^[0-1]?[0-5]$'), new RegExp('^[0-1]?[0-9]$')];
    constructor(public location: Location,
        public router: Router,
        public routeP: ActivatedRoute,
        public fb: FormBuilder,
        public localConfig: LocalConfigService,
        public http: HttpService) {
        super(location, router, routeP, fb, http);
    }

    async ngOnInit() {
        super.ngOnInit();

        this.complexForm.controls['hospital_id'].setValue((await this.localConfig.getConfig("user")).hospital_id);
        this.getSpecializationType();
        this.getWardType();
    }

    public async initFormBuilder() {
        this.complexForm = this.fb.group({
            'id': [null],
            'start_time': [null, Validators.required],
            'end_time': [null, Validators.required],
            'period': [null, Validators.compose([Validators.required, Validators.max(99), Validators.min(1)])],
            'specialization_id': [null, Validators.required],
            'ward_id': [null, Validators.required],
            'hospital_id': [null]
        });
    }

    public getUrlAction() {
        return "blueprint-schedule";
    }

    public setService() {
        return this.http;
    }

    public setMappingData() {
        return null;
    }

    public getSubForms() {
        return null;
    }

    clear() {
        this.complexForm.reset();
    }

    async getSpecializationType() {
        const [err, response] = await this.http.search<any>('specialization/query',
            new CommonFiler(new DefaultCondition(ConditionOperator.EQ, 'hospital_id',
                this.complexForm.controls['hospital_id'].value)), null, null, null).await();
        if (response && response.results && response.results.length > 0) {
            this.specializationList = response.results.map(value => {
                value.id = value.id;
                value.text = value.name;
                return value;
            });
        }
    }

    async getWardType() {
        const [err, response] = await this.http.search<any>('ward/query',
            new CommonFiler(new AndCondition([new DefaultCondition(ConditionOperator.EQ, 'hospital_id',
                this.complexForm.controls['hospital_id'].value),
            new DefaultCondition(ConditionOperator.EQ, 'deleted_flag', false)])), null, null, null).await();
        if (response && response.results && response.results.length > 0) {
            this.wardList = response.results.map(value => {
                value.id = value.id;
                value.text = value.name;
                return value;
            });
        }
    }

}