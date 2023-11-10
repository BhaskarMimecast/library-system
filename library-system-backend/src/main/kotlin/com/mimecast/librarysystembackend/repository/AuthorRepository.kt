package com.mimecast.librarysystembackend.repository

import com.mimecast.librarysystembackend.dto.Author
import org.springframework.data.mongodb.repository.MongoRepository
import java.util.*

interface AuthorRepository : MongoRepository<Author, String> {
    fun findByName(name: String): Optional<Author>
}
