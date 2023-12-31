package com.mimecast.librarysystembackend.service

import com.fasterxml.jackson.annotation.JsonProperty
//import com.mimecast.librarysystembackend.service.NYTimesBookReview
import lombok.Data

@Data
class NYTimesResponse<T> {
    var status: String? = null
    var copyright: String? = null

    @JsonProperty("num_results")
    var numResults = 0
    var results: List<T>? = null
}
