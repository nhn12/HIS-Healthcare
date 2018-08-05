/**
 * System config defination
 * @author: NamNguyen
 */

import { EnterprisePromise } from "../async/enterprise-promise";
import { LocalConfigModel } from "./model/local-config-model";
import { Observable } from "rxjs";

export interface ILocalConfigService {
    getConfig(key: string): EnterprisePromise<any>;
    insertConfig(config: LocalConfigModel): EnterprisePromise<boolean>;
    removeConfig(key: string): EnterprisePromise<boolean>;
    resetConfig(): EnterprisePromise<boolean>;
}