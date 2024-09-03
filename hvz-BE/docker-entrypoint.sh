#!/bin/bash

# Extract database components from the Heroku DATABASE_URL
if [[ $DATABASE_URL =~ ^postgres://([^:]+):([^@]+)@([^:]+):([0-9]+)/(.+)$ ]]; then
    DB_USER=${BASH_REMATCH[1]}
    DB_PASSWORD=${BASH_REMATCH[2]}
    DB_HOST=${BASH_REMATCH[3]}
    DB_PORT=${BASH_REMATCH[4]}
    DB_NAME=${BASH_REMATCH[5]}

    # Set Spring Boot database environment variables
    export SPRING_DATASOURCE_URL="jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}"
    export SPRING_DATASOURCE_USERNAME=$DB_USER
    export SPRING_DATASOURCE_PASSWORD=$DB_PASSWORD
fi

# Run the Spring Boot application
exec java -jar /app/app.jar \
    -Dserver.port=${PORT:-5000} \
    -Dspring.profiles.active=${SPRING_PROFILE:-production} \
    -Dspring.datasource.url=$SPRING_DATASOURCE_URL \
    -Dspring.datasource.username=$SPRING_DATASOURCE_USERNAME \
    -Dspring.datasource.password=$SPRING_DATASOURCE_PASSWORD \
    -Dspring.jpa.database-platform=${POSTGRESQL_DIALECT:-org.hibernate.dialect.PostgreSQLDialect} \
    -Dspring.jpa.hibernate.ddl-auto=${DDL_AUTO:-update} \
    -Dspring.security.oauth2.resourceserver.jwt.issuer-uri=$KEYCLOAK_JWT_ISSUER_URI \
    -Dspring.security.oauth2.resourceserver.jwt.jwk-set-uri=$KEYCLOAK_JWT_JWK_SET_URI
