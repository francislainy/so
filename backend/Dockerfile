#FROM openjdk:8-jdk-alpine
#ARG JAR_FILE=target/*.jar
#COPY ${JAR_FILE} app.jar
#ENTRYPOINT ["java","-jar","/app.jar"]
#
##    ./mvnw package && java -jar target/so.jar
##     docker build -f Dockerfile -t so .
##     docker run -p 8082:8081 so

FROM openjdk:11
ADD target/so.jar so.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","/so.jar"]
