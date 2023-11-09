package com.mimecast.librarysystembackend.service

import com.mimecast.librarysystembackend.dto.Book
import javax.naming.ServiceUnavailableException

interface BookProvider {
    @Throws(ServiceUnavailableException::class)
    fun getBooksByAuthor(authorName: String): List<Book>
}
