import { FormGroup, FormArray } from "@angular/forms";

/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
export function mapValueToField(value: any, form: FormGroup, createFormItem?: any): FormGroup {

    if (!value) {
        return form;
    }

    for (var item in value) {
        if ((typeof value[item]) == 'object' && value[item] && value[item].length != undefined) {
            // case array;
            if (form.contains(item)) {
                value[item].forEach((element, index) => {
                    let group = form.controls[item] as FormArray;
                    let formItem = mapValueToField(element, createFormItem(item), null);
                    group.push(formItem);
                });
            }
        } else {
            // case normal value
            if (form.contains(item)) {
                form.controls[item].setValue(value[item]);
            }
        }
    }

    return form;
}

export default mapValueToField