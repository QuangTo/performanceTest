package main

import (
	"database/sql"
	"fmt"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func main() {
	connectToDB()
}

func startServer() {
	r := mux.NewRouter()
	r.HandleFunc("/course-list/{id}", getCourseIDHandler).
		Methods("GET")
	http.ListenAndServe(":8080", r)
}

func getCourseIDHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	fmt.Fprintf(w, "course id : %s", id)
}

func connectToDB() {

	db, err := sql.Open("mysql", "root:12341234@(127.0.0.1:3306)/mysql?parseTime=true")
	// Initialize the first connection to the database, to see if everything works correctly.
	// Make sure to check the error.
	err := db.Ping()

	// select the query
	query := `Select * from course_go;`

	// Executes the SQL query in our database. Check err to ensure there was no error.
	_, err := db.Exec(query)

	// fmt.Println(err)
}
