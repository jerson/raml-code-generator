import {PHPSilex} from './templates/php-silex/template';
import {ITemplate} from './templates/itemplate';
import {RAML} from './model/raml'

import * as util from 'util';
import * as RAMLParser from 'raml-parser';
import * as Q from 'q';

/**
 * Generator
 */
export class Generator {


    /**
     *
     * @param inputFile
     * @param outputDir
     * @param templateName
     */
    constructor(private inputFile:string, private outputDir:string, private templateName:string) {

    }

    /**
     *
     * @returns {Q.Promise<any>}
     */
    parseRAML():Q.Promise<any> {
        return RAMLParser.loadFile(this.inputFile);
    }

    /**
     *
     */
    generate() {

        let self = this;
        let promise = this.parseRAML();
        promise.then(function (ast:any) {

            console.log(self.templateName);
            let raml = new RAML();
            raml.fillFromJSON(ast);

            var template:ITemplate;
            switch (self.templateName) {
                case 'php-silex':
                    template = new PHPSilex(raml);
                    break;
                default :
                    throw new Error(util.format('%s dont exists', self.templateName));
                    break;
            }

            //console.log(raml);
            console.log(JSON.stringify(raml, null, 2));
            // console.log(ast);
            template.render();

        }).catch(function (error:any) {
            console.error(error);
        });

    }

}
