import {Schema} from './schema';
import {Serializable} from '../util/model'

/**
 * Response
 */
export class Response extends Serializable{

    code:number;
    type:string;
    schemaName:string;
    isCollection:boolean;

    /**
     *
     */
    constructor() {
        super();
        this.code = 200;
        this.type = 'application/json';
        this.schemaName = '';
        this.isCollection = false;
    }

    /**
     *
     * @param jsonObject
     */
    public fillFromJSON(jsonObject:any):void {
        super.fillFromJSON(jsonObject);

        let self:any = this;
        Object.keys(jsonObject).forEach(function (propertyName:string) {
            if (propertyName === 'body') {

                let body = jsonObject[propertyName];
                Object.keys(body).forEach(function (type:string) {
                    self.type = type;
                    self.schemaName = body[type].schema ? body[type].schema.replace('[]','') : '';

                    if(self.schemaName.indexOf('[]')!==-1){
                        self.isCollection = true;
                    }

                });


                delete self['body'];

            }
        });
    }
}