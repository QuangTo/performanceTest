# Performance Test

## Table of contents

### Set up data

- Use golang to create a server
- Create a DB (mySQL) (indexing) with 10 mil records and design database schema
- Gomysql connect to DB query data
- Docker start mysql, docker cache
- Start server
- Cache layer cache course data
- Stress test

### Install docker and access db

Macos

```
https://docs.docker.com/desktop/install/mac-install/
```

Start up docker

```
docker-compose up
```

Connect DB

```
sudo apt install mysql-client
sudo mysql -h 127.0.0.1 -P 3308 -u root -proot
```

Admin page with index\
Navigate http://localhost:8080

```
Server: db-10m-index
Username: root
Passoword: root
```

Clean up

```
docker ps -a | grep "intro_db" | cut -d' ' -f1 | xargs docker stop
docker ps -a | grep "intro_db" | cut -d' ' -f1 | xargs docker rm
docker volume prune
```

### Start server

Local url: http://localhost:8081/course-list

```
go run src/course.go
```

### Run performance test test

- Install k6 macos

```
brew install k6

```

- Run test suite script

```
k6 run src/performanceTest/api_script.js
```
