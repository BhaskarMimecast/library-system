import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author.service';
import axios from 'axios';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss'],
})
export class AuthorDetailsComponent implements OnInit{
  authorName: string = '';
  author: any;
  showNoDetailsMessage: boolean = false;

  constructor(private authorService: AuthorService, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log("params", params);
      this.authorName = params['authorName'] || null;
      this.getAuthorDetails();
    });
  }

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