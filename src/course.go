package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/go-sql-driver/mysql"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

type Course struct {
	ID    int    `json:"id"`
	TITLE string `json:"title"`
}

var db *sql.DB

func main() {
	startServer()

}

func startServer() {
	r := mux.NewRouter()
	r.HandleFunc("/course-list", getCourseListHandler).
		Methods("GET")
	http.ListenAndServe(":8080", r)
}

func getCourseListHandler(w http.ResponseWriter, r *http.Request) {
	//connect db
	db, err := sql.Open("mysql", "root:12341234@(127.0.0.1:3306)/mysql?parseTime=true")
	if err != nil {
		log.Fatal("failed to connect to db")
	}
	pingErr := db.Ping()
	if pingErr != nil {
		log.Fatal(pingErr)
	}
	fmt.Println("Connected!")

	// query data
	query := `SELECT id, title FROM course_go;`
	rows, err := db.Query(query)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	courses := make([]*Course, 0)
	// loop throguh rows
	for rows.Next() {
		c := new(Course)
		if err := rows.Scan(&c.ID, &c.TITLE); err != nil {
			log.Fatal(err)
		}
		courses = append(courses, c)
	}

	// parse data to json
	byteArray, err := json.Marshal(courses)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Fprintf(w, (string(byteArray)))
}

func loadSCVData() {
	// load file adn insert into course table ( now is 2 mil records)
	filePath := "course_title.csv"
	mysql.RegisterLocalFile(filePath)
	res, err := db.Exec("LOAD DATA LOCAL INFILE '" + filePath + "' INTO TABLE course_go(title)")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Insert 10k rows into DB Success!", res)
}
