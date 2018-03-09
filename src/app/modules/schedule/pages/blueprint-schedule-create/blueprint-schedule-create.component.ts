import { Option } from './../../../../share-component/common-list-component/common-list.component';
import { Location } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonFilter } from './../../../../core/condition/filter';
import { CommonPaging } from './../../../../core/condition/paging';
import { ReceptionListService } from 'app/modules/reception/service/reception-list.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CommonSort, CommonOrder, ORDER_TYPE } from 'app/core/condition/sort';
import { PagingDto } from 'app/share-component/paging-index';
import { Observable } from 'rxjs/Observable';
import { AppConstants } from 'app/utils/app-constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import to from '../../../../utils/promise-utils'
import { WardDto } from 'app/modules/category/pages/ward/data/ward-dto';
import { TableMappingDto } from 'app/modules/category/services/data/table-mapping-dto';
import { BlueprintScheduleDto } from 'app/modules/schedule/pages/blueprint-schedule-create/data/BluePrintScheduleDto';
import { BlueprintScheduleService } from 'app/modules/schedule/service/blueprint-schedule-service';
import { CommonForm } from '../../../../core/common-form/common-form';
import { CommonService } from '../../../../core/common-services/common-service';


declare var jQuery: any;

@Component({
    templateUrl: 'blueprint-schedule-create.component.html',
    selector: "blueprint-schedule-create",
    styleUrls: ['blueprint-schedule-create.component.scss'],
    providers: [BlueprintScheduleService]
})

export class BlueprintScheduleCreateComponent extends CommonForm implements OnInit {
    @ViewChild('wardModal') wardModal: ModalDirective;
    @ViewChild('specializationModal') specializationModal: ModalDirective;

    mapWard: TableMappingDto[] = [];
    mapSpecialization: TableMappingDto[] = [];

    data: BlueprintScheduleDto = new BlueprintScheduleDto();

    option: Option;

    public mask = [new RegExp('^[0-1]?[0-1]$'), new RegExp('^[0-1]?[0-9]$'), ':', new RegExp('^[0-1]?[0-5]$'), new RegExp('^[0-1]?[0-9]$')];
    constructor(public location: Location, public router: Router, public routeP: ActivatedRoute, fb: FormBuilder, public scheduleService: BlueprintScheduleService) {
        super(location, router, routeP ,fb);
    }

    ngOnInit() {
        this.mapWard.push(new TableMappingDto('Tên', 'name'));
        this.mapSpecialization.push(new TableMappingDto('Tên', 'name'));
        this.option = new Option();
    }

    public initFormBuilder() {
        this.complexForm = this.fb.group({
            'id': [null],
            'ward_name': [null, Validators.required],
            'specialization_name': [null, Validators.compose([Validators.required])],
            'start_time': [null, Validators.required],
            'end_time': [null, Validators.required],
            'period': [null, Validators.compose([Validators.required, Validators.max(99), Validators.min(1)])],
            'specialization_id': [null, Validators.required],
            'ward_id': [null, Validators.required],
        });
    }
    public setService(): CommonService {
        return this.scheduleService;
    }
    
    public setMappingData() {
        return null;
    }

    public getSubForms() {
        return null;
    }

    selectWard($event) {
        this.wardModal.hide();
        this.complexForm.controls['ward_name'].setValue($event['name']);
        this.complexForm.controls['ward_id'].setValue($event['id']);
        this.data.ward_name = $event['name'];
        this.data.ward_id = $event['id'];

        this.wardModal.hide();
        this.complexForm.controls['specialization_name'].setValue($event['specialization_name']);
        this.complexForm.controls['specialization_id'].setValue($event['specialization_id']);
        this.data.specialization_name = $event['specialization_name'];
        this.data.specialization_id = $event['specialization_id'];
    }

    selectSpecialization($event) {
        this.specializationModal.hide();
        this.complexForm.controls['specialization_name'].setValue($event['name']);
        this.complexForm.controls['specialization_id'].setValue($event['id']);
        this.data.specialization_name = $event['name'];
        this.data.specialization_id = $event['id'];
    }

    clear() {
        this.complexForm.reset();
    }

}
