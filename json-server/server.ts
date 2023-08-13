import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TypeDocuments } from "src/app/Model/TypeDocuments";

// const axios = require('axios');
var http: HttpClient;
const baseUrl = 'http://localhost:3000/';

// Get all documents
// export async  function getAllDocuments(page: number, limit: number): Promise<Document[]> {
//   try {
//     const response = await http.get(baseUrl+'documents', { params: { _page: page, _limit: limit } });
//     return response.data;
//   } catch (error) {
//     console.error('Error getting documents:', error);
//     return [];
//   }
// }

export function getAllTypeDocuments(): Observable<TypeDocuments[]> {
  return http.get<TypeDocuments[]>(baseUrl+'typeDocuments');
}

// // Get document by id
// export async function getDocumentById(id: number, page: number, limit: number): Promise<Document | null> {
//   try {
//     const response = await http.get(`${baseUrl+'documents'}/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error getting document with id ${id}:`, error);
//     return null;
//   }
// }

// export async function createDocument(document: Document, page: number, limit: number): Promise<Document | null> {
//   try {
//     const response = await http.post(baseUrl+'documents', document);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating document:', error);
//     return null;
//   }
// }

// export async function updateDocument(id: number, document: Document, page: number, limit: number): Promise<Document | null> {
//   try {
//     const response = await http.put(`${baseUrl+'documents'}/${id}`, document);
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating document with id ${id}:`, error);
//     return null;
//   }
// }

// export async function deleteDocument(id: number, page: number, limit: number): Promise<boolean> {
//   try {
//     await http.delete(`${baseUrl+'documents'}/${id}`);
//     return true;
//   } catch (error) {
//     console.error(`Error deleting document with id ${id}:`, error);
//     return false;
//   }
// }