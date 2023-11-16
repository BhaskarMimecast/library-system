# Use the official OpenJDK base image
#FROM  adoptopenjdk:11-jre-hotspot-bionic
FROM  --platform=linux/amd64 openjdk:11-jre-slim
#FROM  adoptopenjdk:11-jre-hotspot
#FROM adoptopenjdk/openjdk11:alpine
#FROM squashtest/squash-tm

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file into the container at /app
COPY build/libs/library-system-backend-0.0.1-SNAPSHOT.jar /app/library-system-backend.jar

# Expose the port that the Spring Boot application will run on
EXPOSE 8080

# Command to run the Spring Boot application with in-memory MongoDB

#EXPOSE 27017

# Install MongoDB (official image)
#RUN apt-get update && apt-get install -y mongodb

# Command to run MongoDB
#CMD ["mongod", "--bind_ip_all"] &
#
#ENTRYPOINT ["tail", "-f", "/dev/null"]
CMD ["java", "-jar", "library-system-backend.jar"]
#"--spring.data.mongodb.uri=mongodb://localhost:27017/testdb"]
