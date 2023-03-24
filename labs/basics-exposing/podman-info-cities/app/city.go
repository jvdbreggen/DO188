package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"time"
)

var Cities = map[string]*CityInfo{
	"MAD": NewCityInfo("Madrid", 3223000, "Spain"),
	"BKK": NewCityInfo("Bangkok", 10539000, "Thailand"),
	"SAN": NewCityInfo("San Diego", 1415000, "United States of America"),
}
var DateLayout = "2006-01-02T15:04:05.000Z"

type CityInfo struct {
	Name       string     `json:"name"`
	Time       *time.Time `json:"time"`
	Population int        `json:"population"`
	Country    string     `json:"country"`
}

func NewCityInfo(name string, population int, country string) *CityInfo {
	return &CityInfo{
		Name:       name,
		Population: population,
		Country:    country,
	}
}

func GetCityInfo(cityCode string) (*CityInfo, error) {
	cityInfo, found := Cities[cityCode]
	if !found {
		return nil, fmt.Errorf("city %s not found", cityCode)
	}

	url := os.Getenv("TIMES_APP_URL")
	resp, err := http.Get(fmt.Sprintf("%s/%s", url, cityCode))
	if err != nil {
		return nil, err
	}

	bytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	body := string(bytes)

	time, err := time.Parse(DateLayout, body)
	if err != nil {
		return nil, err
	}
	cityInfo.Time = &time

	return cityInfo, nil
}
