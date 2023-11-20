package com.mimecast.librarysystembackend.service

import com.fasterxml.jackson.annotation.JsonProperty
import lombok.Data

@Data
class Review(
        @JsonProperty("book_review_link")
        val bookReviewLink: String = "",

        @JsonProperty("first_chapter_link")
        val firstChapterLink: String = "",

        @JsonProperty("sunday_review_link")
        val sundayReviewLink: String = "",

        @JsonProperty("article_chapter_link")
        val articleChapterLink: String = ""
)
