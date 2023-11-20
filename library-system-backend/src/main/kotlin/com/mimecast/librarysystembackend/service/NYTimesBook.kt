package com.mimecast.librarysystembackend.service

import com.fasterxml.jackson.annotation.JsonProperty
import lombok.Data

@Data
class NYTimesBook(
        val title: String? = "",
        val description: String? = "",
        val contributor: String? = "",
        val author: String = "",
        @JsonProperty("contributor_note")
        val contributorNote: String? = "",
        val price: Double = 0.0, // Use Double for representing prices accurately
        @JsonProperty("age_group")
        val ageGroup: String? = "",
        val publisher: String? = "",
        val isbns: List<NYTimesBookISBN> = emptyList(),
        @JsonProperty("ranks_history")
        val ranksHistory: List<NYTimesBookRankHistory> = emptyList(),
        val reviews: List<NYTimesBookReview> = emptyList()
)
