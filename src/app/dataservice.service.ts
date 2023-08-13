import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeDocuments } from './Model/TypeDocuments';
import { Observable } from 'rxjs';
import { Document } from './Model/Document';
import { Organisation } from './Model/Organization';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {


  apiurl="http://localhost:3000/"; 

  constructor(private _http:HttpClient){}
  
  getDocuments(start:number,pageSize:number){
    return this._http.get<Document[]>(this.apiurl+'documents',{ params: { _start: start.toString(), _limit: pageSize.toString() } });
  }
  getAllDocuments(){
    return this._http.get<Document[]>(this.apiurl+'documents');
  }
  getTypeDocuments(){
    return this._http.get<TypeDocuments[]>(this.apiurl+'typeDocuments');  
  }
  getOrganisation(){
    return this._http.get<Organisation[]>(this.apiurl+'organisation');  
  }
  postData(document:any){
    return this._http.post<any>(this.apiurl+'documents', document);
  }
  
  update(id:number, document:Document){
    return this._http.put(`${this.apiurl+'documents'}/${id}`, document)
  }
  
  delete(id:any, document:any){
    return this._http.delete(`${this.apiurl+'documents'}/${id}`, document)
  }
}
