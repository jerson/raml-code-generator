import {Method} from './method';
import {Serializable} from '../util/model'

/**
 * Resource
 */
export class Resource extends Serializable {

    relativeUri:string;
    methods:Method[];
    resources:Resource[];
    relativeUriPathSegments:string[];
    uriParameters:UriParameter[];


    /**
     *
     */
    constructor() {
        super();
        this.relativeUri = '';
        this.methods = [];
        this.resources = [];
        this.relativeUriPathSegments = [];
        this.uriParameters = [];
    }

    /**
     *
     * @param jsonObject
     */
    public fillFromJSON(jsonObject:any):void {
        super.fillFromJSON(jsonObject);

        let self:Resource = this;
        Object.keys(jsonObject).forEach(function (propertyName:string) {
            if (propertyName === 'resources') {

                let resources = jsonObject[propertyName];
                self.resources = [];
                resources.forEach(function (value:any) {
                    let resource:Resource = new Resource();
                    resource.fillFromJSON(value);
                    self.resources.push(resource);

                });


            } else if (propertyName === 'uriParameters') {

                let uriParametersObject = jsonObject[propertyName];
                self.uriParameters = [];
                Object.keys(uriParametersObject).forEach(function (name:string) {
                    let uriParameter:UriParameter = new UriParameter();
                    uriParameter.fillFromJSON(uriParametersObject[name]);
                    self.uriParameters.push(uriParameter);
                });


            } else if (propertyName === 'methods') {

                let methods = jsonObject[propertyName];
                self.methods = [];
                methods.forEach(function (value:any) {
                    let method:Method = new Method();
                    method.fillFromJSON(value);
                    self.methods.push(method);
                });


            }
        });

    }
}
/**
 * UriParameter
 */
export class UriParameter extends Serializable {

    type:string;
    required:boolean;
    displayName:string;

    /**
     *
     */
    constructor() {
        super();
        this.type = 'string';
        this.required = false;
        this.displayName = '';
    }


}