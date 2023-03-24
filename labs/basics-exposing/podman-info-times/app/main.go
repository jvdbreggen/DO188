package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
)

var DateLayout = "2006-01-02T15:04:05.000Z"

type ErrorMessage struct {
	Error string `json:"error"`
}

func writeError(w http.ResponseWriter, err error) {
	errorMessage := ErrorMessage{err.Error()}

	w.WriteHeader(500)

	bytes, err := json.Marshal(errorMessage)
	if err != nil {
		return
	}

	w.Write(bytes)
}

func timeHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	cityCode, found := vars["city_code"]
	if !found {
		writeError(w, fmt.Errorf("city_code is missing in parameters"))
	}

	time, err := getCurrentTime(cityCode)
	if err != nil {
		writeError(w, err)
		return
	}

	w.WriteHeader(200)
	w.Write([]byte(time.Format(DateLayout)))
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/times/{city_code}", timeHandler)

	fmt.Println("Running server at :8080")
	http.ListenAndServe(":8080", r)
}
