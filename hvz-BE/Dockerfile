# Build stage
FROM gradle:jdk17 AS gradle
WORKDIR /app
COPY . .
RUN gradle bootJar

# Runtime stage
FROM openjdk:17 as runtime
WORKDIR /app
ENV PORT=5000 \
    SPRING_PROFILE=production \
    DDL_AUTO=create
COPY --from=gradle /app/build/libs/*.jar /app/app.jar
ENTRYPOINT ["java", "-jar", "app.jar", \
           "-Dserver.port=$PORT", \
           "-Dspring.profiles.active=$SPRING_PROFILE", \
           "-Dspring.datasource.url=$POSTGRESQL_URL", \
           "-Dspring.datasource.username=$POSTGRESQL_USERNAME", \
           "-Dspring.datasource.password=$POSTGRESQL_PASSWORD", \
           "-Dspring.jpa.database-platform=$POSTGRESQL_DIALECT", \
           "-Dspring.jpa.hibernate.ddl-auto=$DDL_AUTO", \
           "-Dspring.security.oauth2.resourceserver.jwt.issuer-uri=$KEYCLOAK_JWT_ISSUER_URI", \
           "-Dspring.security.oauth2.resourceserver.jwt.jwk-set-uri=$KEYCLOAK_JWT_JWK_SET_URI"]

