package com.mimecast.librarysystembackend.rest

import com.mimecast.librarysystembackend.config.ResponseData
import com.mimecast.librarysystembackend.dto.Author
import com.mimecast.librarysystembackend.dto.Book
import com.mimecast.librarysystembackend.exception.AuthorNotFoundException
import com.mimecast.librarysystembackend.repository.AuthorRepository
import com.mimecast.librarysystembackend.service.BookProvider
import lombok.RequiredArgsConstructor
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.naming.ServiceUnavailableException

@RestController
@RequestMapping("/author")
@RequiredArgsConstructor
@CrossOrigin
class AuthorController( private val bookProvider: BookProvider,private val authorRepository: AuthorRepository ) {
//    private val bookProvider: BookProvider? = null
//    private val authorRepository: AuthorRepository? = null
    @PostMapping
    @Throws(ServiceUnavailableException::class)
    fun createAuthor(@RequestParam name: String?): ResponseEntity<ResponseData> {
        val responseData = ResponseData()
        val books: List<Book>
        books = this.bookProvider.getBooksByAuthor(name) as List<Book>
        val author1: Optional<Author?>? = authorRepository?.findByName(name)
        val author: Author
        if (author1 != null && author1.isEmpty == true) {
            author = Author()
            author.name  = name
        } else {
            author = author1!!.get()
        }
        author.books = books
        authorRepository?.save(author)
        val responseBody = "Author books created successfully."
        responseData.message = responseBody
        val headers = HttpHeaders()
        headers.add("Access-Control-Allow-Methods", "OPTIONS, POST")
        return ResponseEntity<ResponseData>(responseData, HttpStatus.CREATED)
    }

    @GetMapping
    fun getAuthorByName(@RequestParam name: String): ResponseEntity<Author> {
        val author: Optional<Author?>? = authorRepository.findByName(name)
        if (author?.isEmpty == true) {
            throw AuthorNotFoundException("Author with name $name not found")
        }
        return ResponseEntity<Author>(author?.get(), HttpStatus.OK)
    } // Define an "OPTIONS" handler for the same endpoint
    //    @CrossOrigin(origins = "*", methods = {RequestMethod.OPTIONS})
    //    @RequestMapping(method = RequestMethod.OPTIONS)
    //    public ResponseEntity<Void> optionsForGetAuthorByName() {
    //        HttpHeaders headers = new HttpHeaders();
    //        headers.add("Access-Control-Allow-Origin", "*");
    //        headers.add("Access-Control-Allow-Methods", "*");
    //        // Add more CORS headers if needed
    //        return new ResponseEntity<>(headers, HttpStatus.OK);
    //    }
    //    @RequestMapping(value = "/author", method = RequestMethod.OPTIONS)
    //    public ResponseEntity<Void> handleOptionsRequest() {
    //        // You can add CORS headers here if needed
    //        HttpHeaders headers = new HttpHeaders();
    //        headers.add("Access-Control-Allow-Origin", "http://localhost:64560/");
    //        headers.add("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
    //
    //        // Return a ResponseEntity with the appropriate headers
    //        return new ResponseEntity<>(headers, HttpStatus.OK);
    //    }
    //    @GetMapping
    //    @CrossOrigin(origins = "http://127.0.0.0.1:8080", methods = {RequestMethod.OPTIONS, RequestMethod.GET})
    //    @RequestMapping(method = {RequestMethod.OPTIONS, RequestMethod.GET})
    ////    @CrossOrigin(methods = {RequestMethod.OPTIONS, RequestMethod.GET})
    //    public ResponseEntity<Author> getAuthorByName(@RequestParam String name) {
    //        Optional<Author> author = authorRepository.findByName(name);
    //        if (author.isEmpty()) {
    //            throw new AuthorNotFoundException("Author with name " + name + " not found");
    //        }
    //        HttpHeaders headers = new HttpHeaders();
    //        headers.add("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
    //        headers.add("Access-Control-Allow-Methods", "OPTIONS, GET");
    //        // Add more CORS headers if needed
    ////        Optional<Author> authorOptional = // ...
    //
    //                // Use orElse to retrieve the Author or a default value if it's not present
    ////                Author author = author.stream().findAny();
    //
    ////        return ResponseEntity.ok(author);
    //
    //
    ////        return new ResponseEntity<>(author.stream().findAny(), headers, HttpStatus.CREATED);
    //        return ResponseEntity.of(author.stream().findAny());
    //    }
}
