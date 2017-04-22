/// <reference path="../typings/modules/react/index.d.ts" />
/// <reference path="./interfaces.d.ts"/>

export class Utils {

    public static uuid():string {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

}