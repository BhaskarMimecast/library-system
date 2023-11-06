// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-author',
//   templateUrl: './author.component.html',
//   styleUrls: ['./author.component.scss']
// })
// export class AuthorComponent {

// }


import { Component } from '@angular/core';
import { AuthorService } from '../author.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-author-create',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorComponent {
  authorName: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private authorService: AuthorService) {}

  createAuthor() {
    if (this.authorName) {
      const authorData = { name: this.authorName };
      
      this.authorService.createAuthor(this.authorName).then(
        (data: any) => {
          console.log("data", data);
          this.authorName=this.authorName;
          if(data.message) {
          this.successMessage = data.message;
          this.errorMessage = null;
          } else{
            this.errorMessage = data;
            this.successMessage = null;
          }
        }).catch((error: any) => {
          this.successMessage = null;
          this.errorMessage = 'Error creating author';
          console.error('Error creating author:', error);
        })
      // this.authorService.createAuthor(authorData).subscribe(
      //   (data) => {
      //     this.successMessage = 'Author created successfully';
      //     this.errorMessage = null;
      //     this.authorName = ''; // Clear the input field
      //   },
      //   (error) => {
      //     this.successMessage = null;
      //     this.errorMessage = 'Error creating author';
      //     console.error('Error creating author:', error);
      //   }
      // );
    }
  }
}