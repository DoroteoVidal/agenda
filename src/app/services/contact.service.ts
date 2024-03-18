import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient : HttpClient) { }

  public getList() {
    return this.httpClient.get(`${baseUrl}/api/contacts`);
  }

  public get(id : any) {
    return this.httpClient.get(`${baseUrl}/api/contacts/${id}`);
  }

  public create(contact : any) {
    return this.httpClient.post(`${baseUrl}/api/contacts`, contact);
  }

  public update(id : any, contact : any) {
    return this.httpClient.put(`${baseUrl}/api/contacts/${id}`, contact);
  }

  public delete(id : any) {
    return this.httpClient.delete(`${baseUrl}/api/contacts/${id}`);
  }

}
