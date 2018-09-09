import { HttpService } from './../../../../core/http/http.service';
import { HttpClient } from '@angular/common/http';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, ViewChild, Injector } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { CommonForm } from '../../../../core/form/common-form';
import { CommonFiler } from '../../../../core/http-query/filter/common-filter';
import { ConditionOperator } from '../../../../core/http-query/condition/condition-operator';
import { DefaultCondition } from '../../../../core/http-query/condition/default-condition';
import { LocalConfigService } from '../../../../core/local-config/local-config-service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BaseFormActionComponent } from '../../../../core/form/base-form-action-component';
import { DoctorDto } from './data/doctor-dto';


declare var jQuery: any;

@Component({
  templateUrl: 'doctor-create.component.html',
  selector: 'doctor-create',
  styleUrls: ['doctor-create.component.scss']
})

export class DoctorCreateComponent extends BaseFormActionComponent<DoctorDto> implements OnInit {
  @ViewChild(ModalDirective) myModal: ModalDirective;
  constructor(public location: Location,
    public router: Router,
    public routeP: ActivatedRoute,
    public fb: FormBuilder,
    public localConfig: LocalConfigService,
    public categoryService: HttpService,
    public injector: Injector,
    public configService: LocalConfigService) {
      super(injector);
  }

  async ngOnInit() {
    const user = await this.localConfig.getConfig('user');
    this.model.hospital_id = user.hospital_id;
  }

  public getData(): Promise<DoctorDto> {
    return null;
  }

  public async submitData(data: DoctorDto): Promise<boolean> {
    this.isLoading = true;
    let [error, response] = await this.categoryService.insert("doctor/insert", data, null).await();

    if(!error && response) {
      this.router.navigateByUrl(this.linkAfterSubmit());
    }
    
    this.isLoading = false;
    return true;
  }
  public initFormData(data: DoctorDto): void {
    return null;
  }
  public createFormSchema(): FormlyFieldConfig[] {
    return [
      {
        className: 'section-label',
        template: '<div class="form-title"><strong>Thông tin bác sĩ</strong></div>',
      }, {
        key: 'firstname',
        type: 'input',
        wrappers: ['form-field-horizontal'],
        templateOptions: {
          type: 'text',
          label: 'Họ',
          required: true,
        }
      },
      {
        key: 'lastname',
        type: 'input',
        wrappers: ['form-field-horizontal'],
        templateOptions: {
          label: 'Tên',
          required: true
        },
      },
      {
        key: 'gender',
        type: 'select',
        wrappers: ['form-field-horizontal'],
        templateOptions: {
          label: 'Giới tính',
          required: false,
          attributes: { url: "type/query", condition: '{"class": "GENDER_TYPE"}' }
        },
      },
      {
        key: 'birthday',
        type: 'datetime',
        wrappers: ['form-field-horizontal'],
        templateOptions: {
          label: 'Năm sinh',
          required: false
        }
      },
      {
        key: 'address',
        type: 'input',
        wrappers: ['form-field-horizontal'],
        templateOptions: {
          label: 'Địa chỉ',
          required: false,
          change: function (event) {
          }
        }
      },
      {
        key: 'specialization_id',
        type: 'select',
        wrappers: ['form-field-horizontal'],
        templateOptions: {
          label: 'Chuyên khoa',
          required: false,
          attributes: { url: "specialization/query" }
        }
      },
      {
        className: 'section-label',
        template: '<div class="form-title"><strong>Thông tin tài khoản</strong></div>',
      },
      {
        key: 'username',
        type: 'input',
        wrappers: ['form-field-horizontal'],
        templateOptions: {
          label: 'Tên đăng nhập',
          required: false,
        }
      },
      {
        key: 'password',
        type: 'input',
        wrappers: ['form-field-horizontal'],
        templateOptions: {
          type:"password",
          label: 'Mật khẩu',
          required: false,
        },
      }
    ];
  }

  public linkAfterSubmit(): string {
    super.linkAfterSubmit();
    return "doctor/list";
  }
}
