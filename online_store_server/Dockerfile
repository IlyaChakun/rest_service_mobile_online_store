FROM openjdk:12-jdk-alpine
MAINTAINER ilya
VOLUME /tmp
EXPOSE 8080
ADD build/libs/online-store-0.1.0.jar online_store.jar
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/online_store.jar"]

