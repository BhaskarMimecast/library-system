package com.mimecast.librarysystembackend.service

import com.fasterxml.jackson.annotation.JsonProperty
import lombok.Data

@Data
class NYTimesBookReview {
     val url: String? = null

    @JsonProperty("publication_dt")
     val publicationDate: String? = null
     val byline: String? = null

    @JsonProperty("book_title")
    var bookTitle: String? = null

    @JsonProperty("book_author")
     val bookAuthor: String? = null
     val summary: String? = null
     val isbn13: List<String>? = null
}