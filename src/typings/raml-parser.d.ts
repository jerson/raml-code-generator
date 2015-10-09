
declare module "raml-parser" {
   export function loadFile(fileName:string): Q.Promise<any>;
}