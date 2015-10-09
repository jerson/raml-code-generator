//!/usr/bin/env node
import * as program from 'commander';
import {Generator} from '../generator';


export class Console {

    constructor(protected program:commander.IExportedCommand) {
        program.version('0.0.1')
            .option('-i, --input [type]', 'Input file', 'api.raml')
            .option('-o, --output [type]', 'Output file', 'output')
            .option('-t, --template [type]', 'Template', 'php-silex')
            .parse(process.argv);
    }

    options():any {
        return this.program.opts();
    }
}

let console:Console = new Console(program);
var options = console.options();

var generator = new Generator(options.input, options.output, options.template);
generator.generate();