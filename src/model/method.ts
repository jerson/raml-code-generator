import {Response} from './response';
import {Serializable} from '../util/model'

/**
 * Method
 */
export class Method extends Serializable {

    method:string;
    protocols:string[];
    responses:Response[];


    /**
     *
     */
    constructor() {
        super();
        this.method = 'get';
        this.protocols = [];
        this.responses = [];
    }

    /**
     *
     * @param jsonObject
     */
    public fillFromJSON(jsonObject:any):void {
        super.fillFromJSON(jsonObject);
        let self:Method = this;
        Object.keys(jsonObject).forEach(function (propertyName:string) {

            if (propertyName === 'responses') {

                let schemasObject = jsonObject[propertyName];
                self.responses = [];
                Object.keys(schemasObject).forEach(function (name:string) {
                    let response:Response = new Response();
                    response.code = parseInt(name,10);
                    response.fillFromJSON(schemasObject[name]);
                    self.responses.push(response);
                });


            }
        });
    }
}