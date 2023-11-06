// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-author-details',
// //   templateUrl: './author-details.component.html',
// //   styleUrls: ['./author-details.component.scss']
// // })
// // export class AuthorDetailsComponent {

// // }


// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { AuthorService } from '../author.service';

// @Component({
//   selector: 'app-author-details',
//   templateUrl: './author-details.component.html',
//   styleUrls: ['./author-details.component.scss'],
// })
// export class AuthorDetailsComponent implements OnInit {
//   author: any;

//   constructor(
//     private route: ActivatedRoute,
//     private authorService: AuthorService
//   ) {}

//   ngOnInit(): void {
//     this.route.paramMap.subscribe((params) => {
//       const authorName = params.get('name');

//       if (authorName) {
//         this.authorService.getAuthorDetails(authorName).subscribe(
//           (data) => {
//             this.author = data;
//           },
//           (error) => {
//             console.error('Error fetching author details:', error);
//           }
//         );
//       }
//     });
//   }
// }

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

    //   this.author = {
    //     "id": "65456508f806477ae3c7e13c",
    //     "name": "Haruki Murakami",
    //     "books": [
    //         {
    //             "name": "1Q84",
    //             "summary": "In “1Q84,” the Japanese novelist Haruki Murakami writes about characters in a Tokyo with two moons."
    //         },
    //         {
    //             "name": "South of the Border, West of the Sun",
    //             "summary": ""
    //         },
    //         {
    //             "name": "Wind-Up Bird Chronicle",
    //             "summary": ""
    //         },
    //         {
    //             "name": "Elephant Vanishes : Stories",
    //             "summary": ""
    //         },
    //         {
    //             "name": "1Q84",
    //             "summary": "Haruki Murakami has translated Raymond Chandler into Japanese, and there’s a lot of Marlowe to his madness."
    //         },
    //         {
    //             "name": "Colorless Tsukuru Tazaki and His Years of Pilgrimage",
    //             "summary": "Patti Smith reviews Haruki Murakami’s dreamlike new novel, in which a man seeks out old friends to understand why he was banished from their circle."
    //         },
    //         {
    //             "name": "Blind Willow, Sleeping Woman: Twenty-Four Stories",
    //             "summary": "A career-spanning grab bag of short stories from Haruki Murakami."
    //         },
    //         {
    //             "name": "The Elephant Vanishes: Stories",
    //             "summary": ""
    //         },
    //         {
    //             "name": "Dance Dance Dance: A Novel",
    //             "summary": ""
    //         },
    //         {
    //             "name": "The Wind-Up Bird Chronicle",
    //             "summary": ""
    //         },
    //         {
    //             "name": "Norwegian Wood",
    //             "summary": ""
    //         },
    //         {
    //             "name": "Sputnik Sweetheart",
    //             "summary": ""
    //         },
    //         {
    //             "name": "After the Quake",
    //             "summary": ""
    //         },
    //         {
    //             "name": "After the Quake",
    //             "summary": ""
    //         },
    //         {
    //             "name": "After the Quake",
    //             "summary": ""
    //         },
    //         {
    //             "name": "After Dark",
    //             "summary": "Haruki Murakami’s novel features two sisters, one in an enchanted sleep, the other up all night."
    //         },
    //         {
    //             "name": "What I Talk About When I Talk About Running",
    //             "summary": "In his latest book -- part training guide, part memoir -- Haruki Murakami connects the disciplines of running and writing."
    //         },
    //         {
    //             "name": "Kafka on the Shore",
    //             "summary": "<p> KAFKA ON THE SHORE By Haruki Murakami. Translated by Philip Gabriel. 436 pp. Alfred A. Knopf. $25.95.</p>."
    //         },
    //         {
    //             "name": "Men Without Women: Stories",
    //             "summary": "In the seven stories that make up “Men Without Women,” Haruki Murakami strikes a blue note: a rainy Tokyo full of unfaithful women."
    //         },
    //         {
    //             "name": "Killing Commendatore",
    //             "summary": "The Japanese novelist’s latest book, “Killing Commendatore,” features a stymied artist, a haunted painting and a host of paranormal mysteries."
    //         }
    //     ]
    // }

      // let config = {
      //   method: 'get',
      //   maxBodyLength: Infinity,
      //   url: 'http://127.0.0.1:8080/author?name=Haruki%20Murakami',
      //   headers: { 
      //     'Accept': '*/*', 
      //     'Accept-Language': 'en-GB,en;q=0.9', 
      //     'Access-Control-Request-Headers': 'content-type', 
      //     'Access-Control-Request-Method': 'POST', 
      //     'Connection': 'keep-alive', 
      //     'Origin': 'http://localhost:64560', 
      //     'Referer': 'http://localhost:64560/', 
      //     'Sec-Fetch-Dest': 'empty', 
      //     'Sec-Fetch-Mode': 'cors', 
      //     'Sec-Fetch-Site': 'cross-site', 
      //     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36'
      //   }
      // };
      
      // axios.request(config)
      // .then((response) => {
      //   console.log(JSON.stringify(response.data));
      // })
      // .catch((error) => {
      //   console.log(error);
      // });

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