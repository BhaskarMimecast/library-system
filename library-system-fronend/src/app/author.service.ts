import { Injectable } from '@angular/core';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private apiUrl = 'http://127.0.0.1:8080/author?name=';


  async createAuthor(name: string): Promise<any> {
    try {
      let data = await axios.post(`${this.apiUrl}${name}`);
      console.log("data: ", data.data);
      return data.data;
    } catch (error) {
      console.log("getAuthorDetails", error);
      return "Author not found";
    }
  }

  async getAuthorDetails(name: string): Promise<any> {
    try {
      let data = await axios.get(`${this.apiUrl}${name}`);
      console.log("data: ", data.data);
      return data.data;
    } catch (error) {
      console.log("getAuthorDetails", error);
    }
  }

}