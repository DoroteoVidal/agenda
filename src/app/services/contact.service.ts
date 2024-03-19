import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';
import { Contact } from '../model/contact.interface';
import { DTOContact } from '../model/DTOcontact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient : HttpClient) { }

  public getList() {
    return this.httpClient.get<Contact[]>(`${baseUrl}/api/contacts`);
  }

  public get(id : string) {
    return this.httpClient.get<Contact>(`${baseUrl}/api/contacts/${id}`);
  }

  public create(contact : DTOContact) {
    return this.httpClient.post<Contact>(`${baseUrl}/api/contacts/`, contact);
  }

  public update(id : string, contact : DTOContact) {
    return this.httpClient.put<Contact>(`${baseUrl}/api/contacts/${id}`, contact);
  }

  public delete(id : string) {
    return this.httpClient.delete<void>(`${baseUrl}/api/contacts/${id}`);
  }

}
