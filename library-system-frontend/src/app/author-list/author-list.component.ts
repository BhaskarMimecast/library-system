import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-authors-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {
  authorList: any[] = []; // Replace 'any[]' with your actual author model/interface
  page: number = 0;

  constructor(private router: Router, private authorService: AuthorService) {}


  ngOnInit(): void {
      this.getAuthorList(this.page);
  }

  getAuthorList(page: number) {
    this.authorService.getAuthorList(page).then(
      (authors: any) => {


       this.authorList = authors['content'];
        console.log("auhtor List", this.authorList);
      }
    ).catch((error: any) => {
      console.error('Error fetching authors:', error);
    });
  }

  navigateToDetails(authorName: string): void {
    // Navigate to details component with author name as a parameter
    this.router.navigate(['/details'], { queryParams: { authorName: authorName } });
  }
}