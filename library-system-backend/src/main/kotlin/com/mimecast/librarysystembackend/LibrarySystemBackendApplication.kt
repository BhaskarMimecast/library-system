package com.mimecast.librarysystembackend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class LibrarySystemBackendApplication

fun main(args: Array<String>) {
	runApplication<LibrarySystemBackendApplication>(*args)
}

