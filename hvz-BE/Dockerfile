# Build stage
FROM gradle:jdk17 AS gradle
WORKDIR /app
COPY . .
RUN gradle bootJar

# Runtime stage
FROM openjdk:17-slim as runtime
WORKDIR /app
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

COPY --from=gradle /app/build/libs/*.jar /app/app.jar

ENV DATABASE_URL=""
ENV KEYCLOAK_JWT_ISSUER_URI=""
ENV KEYCLOAK_JWT_JWK_SET_URI=""

ENTRYPOINT ["/app/docker-entrypoint.sh"]

CMD ["java", "-jar", "/app/app.jar"]



