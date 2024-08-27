FROM maven:3.8.3-openjdk-17 AS build

WORKDIR /app

COPY pom.xml /app/
COPY src /app/src

RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar /app/canva-api.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/canva-api.jar"]
