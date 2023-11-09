package com.mimecast.librarysystembackend.exception

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class RestExceptionHandler {
    @ExceptionHandler(AuthorNotFoundException::class)
    fun handleAuthorNotFoundException(ex: AuthorNotFoundException): ResponseEntity<String> {
        return ResponseEntity(ex.message, HttpStatus.NOT_FOUND)
    }

    @ExceptionHandler(ServiceUnavailable::class)
    fun handleServiceUnable(ex: ServiceUnavailable?): ResponseEntity<String> {
        return ResponseEntity("Service Unavailable", HttpStatus.SERVICE_UNAVAILABLE)
    }
}
