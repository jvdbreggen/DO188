package main

import (
	"fmt"
	"time"
)

var CityTimezones = map[string]int{
	"MAD": 2,
	"BKK": 7,
	"SAN": -7,
	"LON": 1,
}

func getCurrentTime(cityCode string) (*time.Time, error) {
	timezone, found := CityTimezones[cityCode]
	if !found {
		return nil, fmt.Errorf("city %s not supported", cityCode)
	}

	loc := time.FixedZone(cityCode, timezone*3600)
	currentTime := time.Now().In(loc)

	return &currentTime, nil
}
