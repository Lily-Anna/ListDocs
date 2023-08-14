import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeDocuments } from '../Model/TypeDocuments';
import { Document } from '../Model/Document';
import { Organisation } from '../Model/Organization';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {


  apiurl="http://localhost:3000/"; 

  constructor(private _http:HttpClient){}

  //основное получение данных и фильтрация
  getForTypeDocuments(start:number,pageSize:number, type:number, number:string, isArchive:boolean){
    var parms = "";
    if (isArchive == false)
      parms += '&isArchive=' + isArchive;
    if (type != null)
      parms += '&type=' + type;
    if (number != null)
      parms += '&number_like=^' + number;
    if(start == -1 || type == -1){
       return this._http.get<Document[]>(this.apiurl+'documents?'+parms)
    }     
    else{
      return this._http.get<Document[]>(this.apiurl+'documents?'+parms,{ params: { _start: start.toString(), _limit: pageSize.toString() } });
    }      
  }

  //получение типов документов
  getTypeDocuments(){
    return this._http.get<TypeDocuments[]>(this.apiurl+'typeDocuments');  
  }

  //получение организаций
  getOrganisation(){
    return this._http.get<Organisation[]>(this.apiurl+'organisation');  
  }

  //Добавление документа
  postData(document:any){
    return this._http.post<any>(this.apiurl+'documents', document);
  }
  
  //Обновление документа
  update(id:number, document:Document){
    return this._http.put(`${this.apiurl+'documents'}/${id}`, document)
  }
  
  //Удаение документа
  delete(id:any, document:any){
    return this._http.delete(`${this.apiurl+'documents'}/${id}`, document)
  }
}
