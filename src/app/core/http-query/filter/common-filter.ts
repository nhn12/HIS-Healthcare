
/**
 * @description: Implement Common filter. It wall generate condition to http request filter.
 * @author: NamNguyen
 */

import { Filter } from "./filter";

export class CommonFiler extends Filter {

    public printPretty(): object {
        return this.condition.printPretty();
    }
}