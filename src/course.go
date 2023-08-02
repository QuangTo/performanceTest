package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {

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
