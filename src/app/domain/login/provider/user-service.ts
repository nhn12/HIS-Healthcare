import { HttpService } from '../../../core/http/http.service';
import { LoginContext } from '../../../core/authentication/authentication.service';
import { UserModel } from '../model/user-model';
import { Injectable } from "@angular/core";
import { AuthenticationService } from '../../../core';
import { ResponseModel } from '../../../core/http-service/model/response-model';
import { reject } from 'q';
import { EnterprisePromise } from '../../../core/async/enterprise-promise';
import { TechnicalExceptionObject } from '../../../core/exception/technical-exception-object';
import { MessageConst } from '../../../variable-defination/message/message';
import { HttpOptional } from '../../../core/http/model/optional';

/**
 * @author NamNguyen
 * @email nhn12.hoangnam@gmail.com
 * @create date 2018-07-27 12:09:38
 * @modify date 2018-07-27 12:09:38
 * @desc [description]
*/

@Injectable()
export class UserService {
    constructor(private httpService: HttpService, private authentication: AuthenticationService) {

    }

    public async login(userModel: UserModel): EnterprisePromise<UserModel> {
        let httpOptional = new HttpOptional();
        httpOptional.disableToast = true;
        let [error, response] = await this.httpService.insert<UserModel>("staff-account/login", userModel, httpOptional).await();

        if(error) {
            return EnterprisePromise.reject(error);
        }

        if(!response || !response.data || response.status != '200') {
            return EnterprisePromise.reject(new TechnicalExceptionObject("ERR_001", MessageConst.ERR_001, "Un - authentication"));
        }

        await this.authentication.login({username:response.data.username, password: null, token: response.data.token}).toPromise();
        
        return response.data;
    }
}