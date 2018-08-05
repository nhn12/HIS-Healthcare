/**
 * Config temp for system. Required lib: @ngx-pwa/local-storage
 * @author: NamNguyen
 */

import { Injectable } from "@angular/core";
import { EnterprisePromise } from "../async/enterprise-promise";
import { LocalConfigModel } from "./model/local-config-model";
import { ILocalConfigService } from "./local-config-service.d";
import { LocalStorage } from '@ngx-pwa/local-storage';
import { TechnicalExceptionObject } from "../exception/technical-exception-object";
import { CoreConstants } from "../constant/constant";
import { Observable, of } from "rxjs";

@Injectable()
export class LocalConfigService implements ILocalConfigService {
    private setting: object;

    constructor(private localStorage: LocalStorage) {
        this.loadAllConfig();
    }

    /**
     * Insert config
     */
    public insertConfig(config: LocalConfigModel): EnterprisePromise<boolean> {
        if(!this.setting) {
            this.setting = {};
        }
        this.setting[config.key] = config.value;
        return this.saveConfig();
    }

    /**
     * Get config by key
     */
    public async getConfig(key: string): EnterprisePromise<any> {
        if (this.setting) {
            return this.setting[key];
        }
        await this.loadAllConfig();
        return this.setting[key];
    }

    /**
     * Get all configuration in localstorage
     */
    private async loadAllConfig(): Promise<boolean> {
        this.setting = await this.localStorage.getItem(CoreConstants.EBM_CONFIG_SETTING).toPromise();
        return true;
    }

    public removeConfig(key: string): EnterprisePromise<boolean> {
        this.setting[key] = undefined;
        return this.saveConfig();
    }

    public async resetConfig(): EnterprisePromise<boolean> {
        this.setting = {};
        return this.saveConfig();
    }

    private saveConfig(): EnterprisePromise<boolean> {
        return new EnterprisePromise<boolean>((resolve, reject) => {
            this.localStorage.setItem(CoreConstants.EBM_CONFIG_SETTING, this.setting).subscribe(result => {
                resolve(true);
            }, err => {
                reject(new TechnicalExceptionObject('ERR_001', CoreConstants.ERR_001, err));
            });
        });
    }
}