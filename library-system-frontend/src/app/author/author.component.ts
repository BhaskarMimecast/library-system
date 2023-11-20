import { Component, HostListener, OnInit } from '@angular/core';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-author-create',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorComponent implements OnInit {
  authorName: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;
  authors: any = [];
  page: number = 0;
  selectedAuthor: string | null = null;

  constructor(private authorService: AuthorService) {}

  ngOnInit() {
    this.getAuthors(this.page);
  }


  onChange() {
    console.log("onchange", this);
  }

  createAuthor() {
    console.log("inside create author ", this);
    if (this.authorName) {
      const authorData = { name: this.authorName };

      this.authorService.createAuthor(this.authorName).then(
        (data: any) => {
          console.log('data', data);
          this.authorName = this.authorName;
          if (data.message) {
            this.successMessage = data.message;
            this.errorMessage = null;
          } else {
            this.errorMessage = data;
            this.successMessage = null;
          }
        }
      ).catch((error: any) => {
        this.successMessage = null;
        this.errorMessage = 'Error creating author';
        console.error('Error creating author:', error);
      });
    }
  }

  // @HostListener('window:scroll', ['$event'])
  onAuthorListScroll() {
    console.log("calling... on scroll event", event, this);
    // const scrollPosition = window.scrollY + window.innerHeight;
    // const pageHeight = document.documentElement.scrollHeight;

    // // Load more authors when the user is near the bottom
    // if (scrollPosition >= pageHeight - 200) {
      this.getAuthors(++this.page);
    // }
  }

  // onSelectAuthor(author: string) {
  //   console.log("author change", author);
  //   this.selectedAuthor = author;
  // }

  getAuthors(page: number) {
    this.authorService.getAllAuthors(page).then(
      (authors: string[]) => {

        this.authors = [...this.authors, ...authors]
        this.authors = new Set(this.authors);
        this.authors = Array.from(this.authors);
        console.log("auhtor all", this.authors);
      }
    ).catch((error: any) => {
      console.error('Error fetching authors:', error);
    });
  }
}