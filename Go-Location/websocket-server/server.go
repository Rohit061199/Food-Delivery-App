package main

import (
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

// WebSocket upgrader
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // Allow all connections (update for production)
	},
}

// List of connected clients
var clients = make(map[*websocket.Conn]bool)

// Channel for broadcasting messages
var broadcast = make(chan map[string]float64)

func handleConnections(w http.ResponseWriter, r *http.Request) {
	// Upgrade HTTP to WebSocket
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Error upgrading to WebSocket:", err)
		return
	}
	defer ws.Close()

	// Register new client
	clients[ws] = true
	log.Println("New client connected")

	// Keep connection alive & listen for close event
	for {
		_, _, err := ws.ReadMessage()
		if err != nil {
			log.Println("Client disconnected")
			delete(clients, ws)
			break
		}
	}
}

func generateLocationUpdates() {
	for {
		// Simulate real-time delivery location updates
		location := map[string]float64{
			"lat": 33.2294022,  // Randomized latitude
			"lng": -97.1389606, // Randomized longitude
		}
		log.Println("Generated location update:", location)

		// Send the location update to the broadcast channel
		broadcast <- location

		time.Sleep(5 * time.Second) // Send updates every 5 seconds
	}
}

func handleMessages() {
	for {
		location := <-broadcast // Receive from broadcast channel

		// Broadcast the location update to all connected clients
		for client := range clients {
			err := client.WriteJSON(location)
			if err != nil {
				log.Println("Error sending message:", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}

func main_backup() {
	// Serve WebSocket connections
	http.HandleFunc("/ws", handleConnections)

	// Start background goroutines
	go generateLocationUpdates() // Generate random locations
	go handleMessages()          // Broadcast updates

	// Start HTTP server
	port := "8080"
	log.Println("WebSocket server started on port", port)
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
