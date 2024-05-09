# Use the official OpenJDK image as a parent image
FROM openjdk:17-jdk-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the application JAR file and the application.properties file into the container
COPY build/libs/*.jar app.jar
COPY application.properties .

# Expose the port that the application will run on
EXPOSE 5000

# Specify the command to run on container startup
CMD ["java", "-jar", "app.jar"]
