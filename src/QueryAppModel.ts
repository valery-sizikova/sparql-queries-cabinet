/// <reference path="../typings/modules/react/index.d.ts" />
/// <reference path="./interfaces.d.ts"/>

export class QueryAppModel implements IQueryAppModel {
    public key:string;
    public name:string;

    constructor(key:string) {
        this.key = key;
        this.name = 'List of SPARQL queries';
    }

    public select(queryId:string) {
        console.log(queryId);
    }
}