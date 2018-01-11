import { UserDto } from './data/UserDto';
import { AuthenticationService, LoginContext } from './../../../core/authentication/authentication.services';
import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CommonService } from 'app/core/common-services/common-service';

@Injectable()
export class LoginService extends CommonService {


    login(user: UserDto): Observable<UserDto> {
        return new Observable((observer) => {
            this.http.post("login", user).subscribe(result => {
                let temp = result.json();
                if (temp && temp.status == "200") {
                    user.token = temp.data.token;
                    this.setAuthentication(user).subscribe(checkFlag => {
                        observer.next(user);
                    }, err => {
                        observer.error();
                    })
                    return;
                }
                observer.error();
            }, error => {
                observer.error(error);
            })
        })
    }

    private setAuthentication(user: UserDto) {
        return this.auth.login({ username: user.username, token: user.token, password: null, remember: true });
    }

    protected getBodyRequestForDelete() {
        return null;
    }

    protected getBodyRequestForInsert() {
        return null;
    }

    protected getBodyRequestForList() {
        return null;
    }

    protected getBodyRequestForUpdate() {
        return null;
    }

    protected getUrlForAdd() {
        return null;
    }

    protected getUrlForDelete() {
        return null;
    }

    protected getUrlForList() {
        return null;
    }

    protected getUrlForOne() {
        return null;
    }

    protected getUrlForUpdate() {
        return null;
    }
}