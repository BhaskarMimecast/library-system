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
class AuthorController(private val bookProvider: BookProvider, private val authorRepository: AuthorRepository) {
    //    private val bookProvider: BookProvider? = null
//    private val authorRepository: AuthorRepository? = null
    @PostMapping
    @Throws(ServiceUnavailableException::class)
    fun createAuthor(@RequestParam name: String): ResponseEntity<ResponseData> {
        val responseData = ResponseData()
        val books: List<Book>
        books = this.bookProvider.getBooksByAuthor(name)
        val author1: Optional<Author> = authorRepository.findByName(name)
        val author: Author
        if (author1.isEmpty) {
            author = Author()
            author.name = name
        } else {
            author = author1!!.get()
        }
        author.books = books
        authorRepository.save(author)
        val responseBody = "Author books created successfully."
        responseData.message = responseBody
        return ResponseEntity<ResponseData>(responseData, HttpStatus.CREATED)
    }

    @GetMapping
    fun getAuthorByName(@RequestParam name: String): ResponseEntity<Author> {
        val author: Optional<Author> = authorRepository.findByName(name)
        if (author.isEmpty) {
            throw AuthorNotFoundException("Author with name $name not found")
        }
        return ResponseEntity<Author>(author.get(), HttpStatus.OK)
    }
}
