import { Component } from '@angular/core';
import { AuthorService } from '../author.service';
import axios from 'axios';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss'],
})
export class AuthorDetailsComponent {
  authorName: string = '';
  author: any;
  showNoDetailsMessage: boolean = false;

  constructor(private authorService: AuthorService) {}

  getAuthorDetails() {
    if (this.authorName) {  

      this.authorService.getAuthorDetails(this.authorName).then(
        (data: any) => {
          console.log("data");
          if(data.name) {
          this.author = data;
          this.showNoDetailsMessage = false; 
          } else{
            this.author =null;
            this.showNoDetailsMessage = true; 
          }
        }).catch((error: any) => {
          this.author = null;
          this.showNoDetailsMessage = true;
          console.error('Error fetching author details:', error);
        })
    }
  }
}