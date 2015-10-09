
/**
 * Serializable
 */
export class Serializable {

    /**
     *
     */
    constructor() {
    }

    /**
     *
     * @param jsonObject
     */
    public fillFromJSON(jsonObject:any):void {
        var self:any = this;
        Object.keys(jsonObject).forEach(function (propertyName:string) {
            self[propertyName] = jsonObject[propertyName];

        });
    }
}