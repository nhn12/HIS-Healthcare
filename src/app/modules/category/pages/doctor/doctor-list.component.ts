import { Option } from './../../../../share-component/common-list-component/common-list.component';
import { Router } from '@angular/router';
import { TableMappingDto } from './../../services/data/table-mapping-dto';
import { CommonFilter } from './../../../../core/condition/filter';
import { CommonPaging } from './../../../../core/condition/paging';
import { ReceptionListService } from 'app/modules/reception/service/reception-list.service';
import { Component, OnInit } from '@angular/core';
import { CommonSort, CommonOrder, ORDER_TYPE } from 'app/core/condition/sort';
import { PagingDto } from 'app/share-component/paging-index';
import { Observable } from 'rxjs/Observable';
import { AppConstants } from 'app/utils/app-constants';
import { CategoryService } from 'app/modules/category/services/category.service';
import { Http, RequestOptions, Headers } from '@angular/http';

@Component({
  templateUrl: 'doctor-list.component.html',
  selector: "doctor-list",
  styleUrls: ['doctor-list.component.scss'],
  providers: [CategoryService]
})
export class DoctorListComponent implements OnInit {

  mapTable: TableMappingDto[] = [];
  option: Option
  constructor(private route: Router, public http: Http) {
  }

  ngOnInit() {
    this.mapTable.push(new TableMappingDto('Tên', 'name'));
    this.mapTable.push(new TableMappingDto('Giới tính', 'gender_name'));
    this.mapTable.push(new TableMappingDto('Năm sinh', 'birthday', 'date'));
    this.mapTable.push(new TableMappingDto('Chuyên khoa', 'specialization_name'));


    this.option = new Option();
    this.option.urlCreate = "/category/bac-si-create";

  //   this.getJSON().subscribe(async result=>{
  //     var send: any[] = [];
  //     for(var item in result) {
  //       let temp = result[item];
  //        temp.district_code = temp.parent_code;
  //       send.push(temp);

  //       // if(count == 100 || ) {
          
  //       // }
  //     }
  //     let tempSend = [];
  //     var count = 0;
  //     for(var i = 0; i<send.length; i++) {
  //       tempSend.push(send[i]);
  //         count ++;
  //         if(count == 60 || (i == send.length - 1)) {
  //           let dbd = await this.http.post("http://localhost:3000/api/commune/insertmany", tempSend, new RequestOptions({ headers: this.buildAuthentication() })).toPromise()
  //           console.log(dbd);
  //           tempSend = [];
  //           count = 0;
  //         }
  //     }
      


    
  // })
}

//   protected buildAuthentication(): Headers {
//     let headers = new Headers();
//     headers.append('Content-Type', 'application/json');
//     headers.append('Authorization', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5objEyIiwiZnVsbG5hbWUiOiJOZ3V5ZW4gSG9hbmcgTmFtIiwiY3JlYXRlZCI6IjIwMTgtMDMtMTdUMTU6MDQ6MTAuNjI5WiIsImlhdCI6MTUyMTI5OTA4NX0.qCvvGJFgNjqrRQlOv82jL9-QYQPFeRhskYgs1LgjwLU");
//     return headers;
// }

//     public getJSON(): Observable<any> {
//       return this.http.get("http://localhost:4200/assets/data/xa_phuong.json")
//                       .map((res:any) => res.json())
//                       .catch(err=>{return err});

//   }
}
