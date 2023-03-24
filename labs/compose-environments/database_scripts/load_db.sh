#!/bin/bash

START_DIR="$APP_DATA/src/postgresql-start"

run_sql_script () {
  
  SQL_FILE=$1
  
  psql \
    -U "$POSTGRESQL_USER"  \
    --echo-all \
    -f $SQL_FILE \
    -d $POSTGRESQL_DATABASE

}

run_sql_script $START_DIR/rpi-store-ddl.sql
run_sql_script $START_DIR/rpi-store-dml.sql
