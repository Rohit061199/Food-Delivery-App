package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// WebSocket upgrader
var upgrader_new = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // Allow all connections (update for production)
	},
}

func handleConnectionsNew(w http.ResponseWriter, r *http.Request) {
	// Upgrade HTTP to WebSocket
	ws, err := upgrader_new.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Error upgrading to WebSocket:", err)
		return
	}
	defer ws.Close()

	log.Println("New client connected")

	// Send a single location update
	location := map[string]float64{
		"lat": 33.2294022,  // Static latitude
		"lng": -97.1389606, // Static longitude
	}

	err = ws.WriteJSON(location)
	if err != nil {
		log.Println("Error sending location:", err)
		return
	}

	log.Println("Sent location update:", location)
}

func main() {
	// Serve WebSocket connections
	http.HandleFunc("/ws", handleConnectionsNew)

	// Start HTTP server
	port := "8080"
	log.Println("WebSocket server started on port", port)
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
