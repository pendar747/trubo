import Template from "./Template";
import { JSDOM } from 'jsdom';

export default class DocumentTemplate extends Template {

  private _dom: JSDOM;
 
  constructor (filePath: string, fileContent: string) {
    const dom = new JSDOM(fileContent);
    super(dom.window.document.body, filePath, fileContent);
    this._dom = dom;
    this._content = this.element;
  }

  toString () {
    return this._dom.serialize();
  }
}