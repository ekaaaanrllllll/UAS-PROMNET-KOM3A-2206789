package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

var db *sql.DB
var err error

func main() {
	Routers()
}

func Routers() {
	InitDB()
	defer db.Close()
	log.Println("Starting the HTTP server on port 9080")
	router := mux.NewRouter()
	router.HandleFunc("/items", GetItems).Methods("GET")
	router.HandleFunc("/items", CreateItem).Methods("POST")
	router.HandleFunc("/items/{id}", GetItem).Methods("GET")
	router.HandleFunc("/items/{id}", UpdateItem).Methods("PUT")
	router.HandleFunc("/items/{id}", DeleteItem).Methods("DELETE")
	http.ListenAndServe(":9080", &CORSRouterDecorator{router})
}

func GetItems(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var items []Item

	result, err := db.Query("SELECT id, nama_barang, jumlah, harga_satuan, lokasi, deskripsi FROM inventory_eka")
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	for result.Next() {
		var item Item
		err := result.Scan(&item.ID, &item.NamaBarang, &item.Jumlah, &item.HargaSatuan, &item.Lokasi, &item.Deskripsi)
		if err != nil {
			panic(err.Error())
		}
		items = append(items, item)
	}
	json.NewEncoder(w).Encode(items)
}

func CreateItem(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	stmt, err := db.Prepare("INSERT INTO inventory_eka(nama_barang, jumlah, harga_satuan, lokasi, deskripsi) VALUES(?,?,?,?,?)")
	if err != nil {
		panic(err.Error())
	}
	defer r.Body.Close()
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	var item Item
	if err := json.Unmarshal(body, &item); err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(item.NamaBarang, item.Jumlah, item.HargaSatuan, item.Lokasi, item.Deskripsi)
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Item added successfully")
}

func GetItem(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	result := db.QueryRow("SELECT id, nama_barang, jumlah, harga_satuan, lokasi, deskripsi FROM inventory_eka WHERE id = ?", params["id"])
	var item Item
	err := result.Scan(&item.ID, &item.NamaBarang, &item.Jumlah, &item.HargaSatuan, &item.Lokasi, &item.Deskripsi)
	if err != nil {
		panic(err.Error())
	}
	json.NewEncoder(w).Encode(item)
}

func UpdateItem(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("UPDATE inventory_eka SET nama_barang=?, jumlah=?, harga_satuan=?, lokasi=?, deskripsi=? WHERE id=?")
	if err != nil {
		panic(err.Error())
	}
	defer r.Body.Close()
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	var item Item
	if err := json.Unmarshal(body, &item); err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(item.NamaBarang, item.Jumlah, item.HargaSatuan, item.Lokasi, item.Deskripsi, params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Item with ID = %s was updated", params["id"])
}

func DeleteItem(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("DELETE FROM inventory_eka WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Item with ID = %s was deleted", params["id"])
}

type Item struct {
	ID          int    `json:"id"`
	NamaBarang  string `json:"nama_barang"`
	Jumlah      string `json:"jumlah"`
	HargaSatuan string `json:"harga_satuan"`
	Lokasi      string `json:"lokasi"`
	Deskripsi   string `json:"deskripsi"`
}

type CORSRouterDecorator struct {
	R *mux.Router
}

// func (c *CORSRouterDecorator) ServeHTTP(rw http.ResponseWriter, req *http.Request) {
// 	// Your CORS implementation here
// }

func InitDB() {
	db, err = sql.Open("mysql",
		"root:@tcp(127.0.0.1:3306)/db_2206789_ekaanrll_uas")
	fmt.Println("connected to db")
	if err != nil {
		panic(err.Error())
	}
}
func (c *CORSRouterDecorator) ServeHTTP(rw http.ResponseWriter,
	req *http.Request) {
	if origin := req.Header.Get("Origin"); origin != "" {
		rw.Header().Set("Access-Control-Allow-Origin", origin)
		rw.Header().Set("Access-Control-Allow-Methods",
			"POST, GET, OPTIONS, PUT, DELETE")
		rw.Header().Set("Access-Control-Allow-Headers",
			"Accept, Accept-Language,"+
				" Content-Type, YourOwnHeader")
	}
	// Stop here if its Preflighted OPTIONS request
	if req.Method == "OPTIONS" {
		return
	}

	c.R.ServeHTTP(rw, req)
}
