import { HospitalDetailModel } from '../../model/hospital-detail-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../provider/hospital-service';
import { Router } from '@angular/router';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'hospital-create',
    templateUrl: 'hospital-create.component.html',
    styleUrls: ['./hospital-create.component.scss']
})

export class HospitalCreateComponent implements OnInit {

    private hospital: HospitalDetailModel = new HospitalDetailModel();
    public hospitalForm: FormGroup;
    public image: string[] = [];
    constructor(private formBuilder: FormBuilder, private hospitalService: HospitalService, private router: Router) { }

    ngOnInit() {
        this.initForm();
    }

    onUploadFinished(e) {
        console.log(e);
        this.hospitalForm.controls["image"].setValue(e.src);
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
        
        if(!this.hospitalForm.valid) {
            return;
        }

        let[error, response] = await this.hospitalService.insert(this.hospitalForm.value).await();
        if(response) {
            this.router.navigate(['hospital/list'], { replaceUrl: true });
        }

    }

    private convertImageLib() {
        if(this.image && this.image.length > 0) {
            this.hospitalForm.controls['image'].setValue(this.image);
        }
    }
}