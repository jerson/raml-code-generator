import {Serializable} from "../util/model";
import {Schema} from "./schema";
import {Resource} from "./resource";
import {UriParameter} from "./resource";

/**
 * RAML
 */
export class RAML extends Serializable {

    title:string;
    version:string;
    baseUri:string;
    traits:any[];
    schemas:Schema[];
    resources:Resource[];
    protocols:string[];
    baseUriParameters:UriParameter[];

    /**
     *
     */
    constructor() {
        super();
        this.title = '';
        this.version = '';
        this.baseUri = '';
        this.traits = [];
        this.schemas = [];
        this.resources = [];
        this.protocols = [];
        this.baseUriParameters = [];
    }

    /**
     *
     * @param jsonObject
     */
    public fillFromJSON(jsonObject:any):void {
        super.fillFromJSON(jsonObject);

        let self:RAML = this;
        Object.keys(jsonObject).forEach(function (propertyName:string) {

            if (propertyName === 'schemas') {

                let schemasList = jsonObject[propertyName];
                self.schemas = [];
                schemasList.forEach(function (schemaObject:any) {

                    Object.keys(schemaObject).forEach(function (name:string) {
                        let schema:Schema = new Schema();
                        schema.fillFromJSON(JSON.parse(schemaObject[name]));
                        schema.name = name;
                        self.schemas.push(schema);

                    });
                });


            } else if (propertyName === 'resources') {

                let resources = jsonObject[propertyName];
                self.resources = [];
                resources.forEach(function (value:any) {
                    let resource:Resource = new Resource();
                    resource.fillFromJSON(value);
                    self.resources.push(resource);
                });


            } else if (propertyName === 'baseUriParameters') {

                let uriParametersObject = jsonObject[propertyName];
                self.baseUriParameters = [];
                Object.keys(uriParametersObject).forEach(function (name:any) {
                    let uriParameter:UriParameter = new UriParameter();
                    uriParameter.fillFromJSON(uriParametersObject[name]);
                    self.baseUriParameters.push(uriParameter);
                });


            }
        });


    }
}