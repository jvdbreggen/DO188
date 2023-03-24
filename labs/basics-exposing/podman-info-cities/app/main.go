package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
)

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

func cityHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	cityCode, found := vars["city_code"]
	if !found {
		writeError(w, fmt.Errorf("city_code is missing in parameters"))
		return
	}

	cityInfo, err := GetCityInfo(cityCode)
	if err != nil {
		writeError(w, err)
		return
	}

	bytes, err := json.Marshal(cityInfo)
	if err != nil {
		writeError(w, err)
		return
	}

	w.WriteHeader(200)
	w.Write(bytes)
}

func main() {

	r := mux.NewRouter()
	r.HandleFunc("/cities/{city_code}", cityHandler)

	fmt.Println("Running server at :8090")
	http.ListenAndServe(":8090", r)
}
