// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthorService {

//   constructor() { }
// }



import { Injectable } from '@angular/core';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private apiUrl = 'http://127.0.0.1:8080/author?name=';

  // createAuthor(authorData: any) {
  //   return axios.post(this.apiUrl, authorData);
  // }

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

  // createAuthor(authorData: any): Observable<any> {
  //   return new Observable((observer) => {
  //     axios
  //       .post(`${this.apiUrl}${authorData['name']}`, {})
  //       .then((response: AxiosResponse) => {
  //         observer.next(response.data);
  //         observer.complete();
  //       })
  //       .catch((error: AxiosError) => {
  //         observer.error(error);
  //       });
  //   }).pipe(
  //     catchError((error) => {
  //       // Handle error, e.g., log it or display an error message
  //       console.error('Error creating author:', error);
  //       return throwError(error);
  //     })
  //   );
  // }

  async getAuthorDetails(name: string): Promise<any> {
    try {
      let data = await axios.get(`${this.apiUrl}${name}`);
      console.log("data: ", data.data);
      return data.data;
    } catch (error) {
      console.log("getAuthorDetails", error);
    }
  }

  // getAuthorDetails(authorName: string): Observable<any> {
  //   return new Observable((observer) => {
  //     axios
  //       .get(`${this.apiUrl}${authorName}`)
  //       .then((response: AxiosResponse) => {
  //         observer.next(response.data);
  //         observer.complete();
  //       })
  //       .catch((error: AxiosError) => {
  //         observer.error(error);
  //       });
  //   }).pipe(
  //     catchError((error) => {
  //       // Handle error, e.g., log it or display an error message
  //       console.error('Error fetching author details:', error);
  //       return throwError(error);
  //     })
  //   );
  // }
}