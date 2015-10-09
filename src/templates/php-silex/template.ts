import {ITemplate} from '../itemplate'
import {RAML} from './model/all'
import * as swig from 'swig'

/**
 *  PHPSilex
 */
export class PHPSilex implements ITemplate {

    constructor (public raml: RAML) {

        console.log('dd invoked');
    }

    /**
     *
     */
    render():void {
        //swig.renderFile()
        console.log('f');
    }




}