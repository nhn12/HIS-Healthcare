import { DataTableModel, TableMappingDto } from '../../../../shared-component/common-data-table/model/data-table-model'
import { Optional } from '../../../../shared-component/common-data-table/model/optional'
import { Component, OnInit } from '@angular/core';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'operation-managment',
    templateUrl: 'operation-managment.component.html',
    styleUrls: ['operation-managment.component.scss']
})

export class OperationManagmentComponent implements OnInit {

    optionTable: Optional = new Optional();
    dataTable: DataTableModel = new DataTableModel();
    constructor() { }

    ngOnInit() { 
        this.dataTable.tableMapping = [
            new TableMappingDto("ID", "id"),
            new TableMappingDto("Mã", "code"),
            new TableMappingDto("Tên", "name")
        ]

        this.dataTable.url = "operation";
        this.optionTable.quantityPerPage = 5;
    }
}