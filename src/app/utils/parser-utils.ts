import { FormGroup, FormArray } from "@angular/forms";

/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
export function parseObject(value: any, map: any): any {

    if(!value || !map) {
        return map;
    }

    if(Array.isArray(value)) {
        //case array
        value.forEach(element => {
            element = parseObject(element, map);
        });

        return value;
    }

    for(var item in value) {
        if(Array.isArray(value[item])) {
            //case array
            value[item].forEach(element => {
                element = parseObject(element, map);
            });
    
            return value;
        }


        if(map[item] == 'number') {
            if((typeof value[item]) == 'string') {
                value[item] = parseInt(value[item]);
            }
        }

        if(map[item] == 'date') {
            if((typeof value[item]) == 'string') {
                value[item] = new Date(value[item]);
            }
        }

        if(map[item] == 'string') {
            if((typeof value[item]) == 'number') {
                value[item] = value[item] + '';
            }
        }
    }

    return value;
}

export default parseObject