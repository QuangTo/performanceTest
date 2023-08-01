# Performance Test Demo

### Set up data
* Create a routing and web server for demo ('GET /courses_list/course_id') course_id -> randomly distributed (NOT 1 .. 1000) (100 9090390123 23432 312312  545 4313  41231 1) then return course data
* Create  a DB (mySQL) (indexing) with 10 mil records and  design database schema
* Gomysql  connect to DB query data
* Cache layer cache course data
* Docker start mysql, docker cache
* Start server
* Stress test

### Run test 
* Install k6
* Run script 
```
k6 run src/api_script.js 
```