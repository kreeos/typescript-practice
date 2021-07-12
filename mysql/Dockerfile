FROM ubuntu/mysql:8.0-20.04_beta

COPY ./myconf.sql /docker-entrypoint-initdb.d

ENV MYSQL_ROOT_PASSWORD=mastervotmdnjem3306
ENV MYSQL_DATABASE=users
ENV MYSQL_USER=serveradmin
ENV MYSQL_PASSWORD=serveradminpassword3306
ENV MYSQL_TCP_PORT=3306


