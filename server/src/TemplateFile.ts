import { JSDOM } from 'jsdom';
import { MAIN_TEMPLATE_KEY } from './constants';
import Template from './Template';
import DocumentTemplate from './DocumentTemplate';

export default class TemplateFile {

  private _templates: Map<string, Template>;
  private _filePath: string;
  private _fileContent: string;
  private _templatesRootPath: string;
  private _dom: JSDOM;


  constructor (path: string, fileContent: string, templatesRootPath: string) {
    this._filePath = path; 
    this._fileContent = fileContent;
    this._templatesRootPath = templatesRootPath;
    this._dom = new JSDOM(fileContent);
    // TODO: what happens if template file has more than one unnamed template in it?
    this._templates = new Map(Array.from(this._dom.window.document.querySelectorAll('template') || [])
      .map(template => {
        const id = template.id || MAIN_TEMPLATE_KEY;
        return [id, new Template(template, this._filePath, fileContent)];
      })
    );
  }

  getTemplate (path: string) {
    return this._templates.get(path);
  }

  getDocumentTemplate () {
    return new DocumentTemplate(this._filePath, this._fileContent);    
  }
  
}