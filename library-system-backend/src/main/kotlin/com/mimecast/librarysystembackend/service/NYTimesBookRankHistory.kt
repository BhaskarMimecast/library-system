package com.mimecast.librarysystembackend.service

import com.fasterxml.jackson.annotation.JsonProperty
import lombok.Data

@Data
class NYTimesBookRankHistory {
    @JsonProperty("primary_isbn10")
    val primaryIsbn10: String? = null

    @JsonProperty("primary_isbn13")
    val primaryIsbn13: String? = null

    val rank: Int = 0 // Remove the comma here

    @JsonProperty("list_name")
    val listName: String = ""

    @JsonProperty("display_name")
    val displayName: String = ""

    @JsonProperty("published_date")
    val publishedDate: String = ""

    @JsonProperty("bestsellers_date")
    val bestsellersDate: String = ""

    @JsonProperty("weeks_on_list")
    val weeksOnList: Int = 0

    @JsonProperty("ranks_last_week")
    val ranksLastWeek: Int? = null

    val asterisk: Int = 0
    val dagger: Int = 0
}
