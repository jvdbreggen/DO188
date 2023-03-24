# Persisting Data - URL Shortener App

## Application Workflow:
* The user sends in a URL, for example POST www.redhat.com
* The application generates a code, such as ABC457
* The application saves the mapping to a database, i.e.  ABC457 -> redhat.com
* When the user sends a request to localhost:8080/ABC457, they are redirected to redhat.com
* Alternatively, if there is no mapping in the database for the given code, e.g. localhost:8080/AAABBB, the error is handled gracefully, such as informing user that there is no such short URL

## Requirements:
* The application uses an external database to save the links, in our case Postgres
* The application exposes a graphical way to enter links
* The application exposes JSON-based API that will be easy to consume

## Pre-requisites

* Create the volume `postgres` and network `lab-net`.

```
podman volume create postgres

podman network create lab-net
```


## Lab Steps:
* Start the postgres container 
```
podman run -d --name postgresql_database  -v postgres:/var/lib/pgsql/data --net lab-net -e POSTGRESQL_USER=user -e POSTGRESQL_PASSWORD=pass -e POSTGRESQL_DATABASE=db  registry.redhat.io/rhel9/postgresql-13:1
```
* Start the back end container.
```
podman run -d -p8080:8080 --name urlshortener-backend --net lab-net quay.io/redhattraining/podman-urlshortener-backend
```
* Start the front end container. You can access it on localhost:3000
```
podman run -d -p3000:8080 --name urlshortener-frontend --net lab-net quay.io/redhattraining/podman-urlshortener-frontend
```
* Enter `www.redhat.com` in the text-area on react app. It returns the shortened link.

* Paste the shortened link in the browser. You will be redirected to www.redhat.com.

* Stop and remove the database container.

* Start the database container again.
```
podman run -d --name postgresql_database  -v postgres:/var/lib/pgsql/data --net lab-net -e POSTGRESQL_USER=user -e POSTGRESQL_PASSWORD=pass -e POSTGRESQL_DATABASE=db  registry.redhat.io/rhel9/postgresql-13:1
```
* Login to the database container and check the data. Data is persisted.
```
podman exec -it postgresql_database /bin/bash
bash-5.1$ psql
postgres=# \c db
select * from "UrlMapping";
```
**Note: To run the application, start the backend and frontend container again after restarting the DB Container.**