package com.mimecast.librarysystembackend.service

import com.mimecast.librarysystembackend.dto.Book
import com.mimecast.librarysystembackend.exception.AuthorNotFoundException
import com.mimecast.librarysystembackend.exception.ServiceUnavailable
import lombok.RequiredArgsConstructor
import org.springframework.beans.factory.annotation.Value
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
        val response: NYTimesResponse? = try {
            restTemplate.getForObject<NYTimesResponse>(url, NYTimesResponse::class.java)
        } catch (e: Exception) {
            throw ServiceUnavailable()
        }
        val books: MutableList<Book> = ArrayList<Book>()
        if (response != null && "OK" == response.status) {
            for (review in response.results!!) {
                val book = Book()
                book.name = review.bookTitle
                book.summary = review.summary
                books.add(book)
            }
        }
        if (books.isEmpty()) throw AuthorNotFoundException("Authur:$authorName not found")
        return books
    }
}
