import {RAML} from '../model/raml'

/**
 * ITemplate
 */
export interface ITemplate {
    raml:RAML;
    render():void;
}