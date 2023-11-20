package com.mimecast.librarysystembackend.service

import com.mimecast.librarysystembackend.dto.Author
import com.mimecast.librarysystembackend.dto.Book
import com.mimecast.librarysystembackend.exception.AuthorNotFoundException
import com.mimecast.librarysystembackend.exception.ServiceUnavailable
import lombok.RequiredArgsConstructor
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.ParameterizedTypeReference
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import javax.naming.ServiceUnavailableException

@Service
@RequiredArgsConstructor
class NYTimesBookProvider(private val restTemplate: RestTemplate) : BookProvider {
    @Value("\${nytimes.api.key}")
    private val apiKey: String? = null

    @Throws(ServiceUnavailableException::class)
    override fun getBooksByAuthor(authorName: String): List<Book> {
        val url = "https://api.nytimes.com/svc/books/v3/reviews.json?author=$authorName&api-key=$apiKey"

            val responseType: ParameterizedTypeReference<NYTimesResponse<NYTimesBookReview>> = object : ParameterizedTypeReference<NYTimesResponse<NYTimesBookReview>>() {}
            val response: ResponseEntity<NYTimesResponse<NYTimesBookReview>>? = try {
                restTemplate.exchange(url, HttpMethod.GET, null, responseType)
            } catch (e: Exception) {
                throw ServiceUnavailable()
            }
//
//
//        val response: NYTimesResponse? = try {
//            restTemplate.getForObject<NYTimesResponse>(url, NYTimesResponse::class.java)
//        } catch (e: Exception) {
//            throw ServiceUnavailable()
//        }
        val books: MutableList<Book> = ArrayList<Book>()
            if (response != null && response.statusCode == HttpStatus.OK) {
            for (review in response.body?.results.orEmpty()) {
                val book = Book()
                book.name = review.bookTitle
                book.summary = review.summary
                books.add(book)
            }
        }

//        if (response != null && "OK" == response.status) {
//            for (review in response.results!!) {
//                val book = Book()
//                book.name = review.bookTitle
//                book.summary = review.summary
//                books.add(book)
//            }
//        }
        if (books.isEmpty()) throw AuthorNotFoundException("${authorName}: No book Found")
        return books
    }

    override fun getAuthors(page: Int): List<String> {
        val offset: Int = page * 20
        val url = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?offset=${offset}&api-key=$apiKey"
        val responseType: ParameterizedTypeReference<NYTimesResponse<NYTimesBook>> = object : ParameterizedTypeReference<NYTimesResponse<NYTimesBook>>() {}
        val response: ResponseEntity<NYTimesResponse<NYTimesBook>>? = try {
            restTemplate.exchange(url, HttpMethod.GET, null, responseType)
        } catch (e: Exception) {
            println("get author error ${e}")
            throw ServiceUnavailable()
        }

        val authorList: MutableList<String> = ArrayList<String>()
        if (response != null && response.statusCode == HttpStatus.OK) {
            for (book in response.body?.results.orEmpty()) {
//                val author = Author()
////                author.name = book.author
                authorList.add(book.author);
            }
        }

        return authorList
    }
}
