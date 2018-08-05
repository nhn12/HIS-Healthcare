import { LocalConfigService } from '../../../../core/local-config/local-config-service'
import { OnInit, Component } from '@angular/core';
import { BaseDataListComponent } from '../../../../core/form/base-data-list-component';
import { UserModel } from '../../model/user-model';
import { UserService } from '../../provider/user-service';
import { Router } from '@angular/router';
import { LocalConfigModel } from '../../../../core/local-config/model/local-config-model';

@Component({
    selector: 'app-login-page',
    templateUrl: 'login-page.component.html',
    styleUrls: ['login-page.component.scss']
})

export class LoginPageComponent implements OnInit {

    isLoading = false;
    isError = false;
    userModel: UserModel = new UserModel();
    constructor(private userService: UserService,
        private router: Router,
        private configService: LocalConfigService) {
    }

    ngOnInit() {

    }

    /**
     * Handle login click
     */
    public async login() {
        this.isLoading = true;
        const [err, response] = await this.userService.login(this.userModel).await();
        this.isLoading = false;

        if (err) {
            this.isError = true;
            return;
        }


        this.configService.insertConfig(new LocalConfigModel('user', response.user));
        this.router.navigate(['/dashboard'], { replaceUrl: true });
    }


}