import {Serializable} from '../util/model'

/**
 * Schema
 */
export class Schema extends Serializable {

    type:string;
    additionalProperties:boolean;
    title:string;
    description:string;
    name:string;
    properties:SchemaProperty[];
    required:string[];

    /**
     *
     */
    constructor() {
        super();
        this.type = 'object';
        this.additionalProperties = false;
        this.title = '';
        this.description = '';
        this.name = '';
        this.required = [];
        this.properties = [];
    }

    /**
     *
     * @param jsonObject
     */
    public fillFromJSON(jsonObject:any):void {
        super.fillFromJSON(jsonObject);

        let self:Schema = this;
        Object.keys(jsonObject).forEach(function (propertyName:string) {
            if (propertyName === 'properties') {
                var propertiesObj:any = jsonObject[propertyName];
                self.properties = [];
                Object.keys(propertiesObj).forEach(function (propertyName:string) {
                    let property:SchemaProperty = new SchemaProperty();

                    property.fillFromJSON(propertiesObj[propertyName]);
                    self.properties.push(property)
                })
            }
        });

    }
}

/**
 * SchemaProperty
 */
export class SchemaProperty extends Serializable {
    name:string;
    type:string;
    maximum:number;
    minimum:number;
    minLength:number;
    maxLength:number;
    exclusiveMaximum:boolean;
    exclusiveMinimum:boolean;
    title:string;
    description:string;
    autoIncrement:boolean;
    primary:boolean;
    default:any;

    /**
     *
     */
    constructor() {
        super();
        this.name = '';
        this.type = '';
        this.maximum = 0;
        this.minimum = 0;
        this.minLength = 0;
        this.maxLength = 0;
        this.exclusiveMaximum = false;
        this.exclusiveMinimum = false;
        this.title = '';
        this.description = '';
        this.autoIncrement = false;
        this.primary = false;
        this.default = null;
    }

}
