/**
 * @author NamNguyen
 * @email nhn12.hoangnam@gmail.com
 * @create date 2018-09-02 04:28:37
 * @modify date 2018-09-02 04:28:37
 * @desc Form engine - component factory - custom from angular 6
*/

import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
@Injectable()
export class ComponentEngine {
    constructor() { }

    public createInstanceComponent<T>(resolver: ComponentFactoryResolver, viewContainer: ViewContainerRef, componentTemplate: any, optional?: {ignoreClear: boolean}): ComponentRef<T> {
        const componentFactory = resolver.resolveComponentFactory(componentTemplate);
        if(!viewContainer) {
            console.log("Cannot compile component with undefined container")
            return null;
        }
        if(!optional || !optional.ignoreClear) {
            viewContainer.clear();
        }
        let refComponent:any = viewContainer.createComponent(componentFactory);
        return refComponent;
    }

    public createComponentFactory(resolver: ComponentFactoryResolver, componentTemplate: any): any {
        return resolver.resolveComponentFactory(componentTemplate);
    }
}

