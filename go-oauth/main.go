package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var googleOauthConfig = &oauth2.Config{
	ClientID:     "Get From Env",
	ClientSecret: "Get From Env",
	RedirectURL:  "http://localhost:5000/auth/google/callback",
	Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"},
	Endpoint:     google.Endpoint,
}

func main() {
	r := gin.Default()
	//Google OAuth Login Route
	r.GET("/auth/google/login", func(c *gin.Context) {
		url := googleOauthConfig.AuthCodeURL("random-state", oauth2.AccessTypeOffline)
		c.Redirect(http.StatusFound, url)
	})

	//Google OAuth Callback
	r.GET("/auth/google/callback", func(c *gin.Context) {
		code := c.Query("code")
		token, err := googleOauthConfig.Exchange(context.Background(), code)

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "OAuth exchange failed"})
			return
		}

		client := googleOauthConfig.Client(context.Background(), token)

		resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Filed to get User info"})
			return
		}

		//fmt.Println("Body is ", resp.Body)

		defer resp.Body.Close()

		var userInfo map[string]interface{}

		if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse user information"})
			return
		}

		fmt.Println("User Info: ", userInfo)

		/*c.JSON(http.StatusOK, gin.H{
			"userInfo": userInfo,
			"token":    token,
		})*/

		frontendRedirect := fmt.Sprintf("http://localhost:3000/login?token=%s", token.AccessToken)
		c.Redirect(http.StatusFound, frontendRedirect)
	})

	/*r.GET("/auth/google/callback", func(c *gin.Context) {
		code := c.Query("code")
		token, err := googleOauthConfig.Exchange(context.Background(), code)

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "OAuth exchange failed"})
			return
		}

		client := googleOauthConfig.Client(context.Background(), token)

		// Correct Google API URL
		resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get User info"})
			return
		}
		defer resp.Body.Close()

		// Check response status code
		if resp.StatusCode != http.StatusOK {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": fmt.Sprintf("Failed to get user info: %s", resp.Status),
			})
			return
		}

		// Read and log the raw response body
		body, err := io.ReadAll(resp.Body)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read response body"})
			return
		}

		fmt.Println("Raw Response Body: ", string(body))

		var userInfo map[string]interface{}
		if err := json.Unmarshal(body, &userInfo); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse user information"})
			return
		}

		fmt.Println("User Info: ", userInfo)

		c.JSON(http.StatusOK, userInfo)
	})*/

	log.Fatal(r.Run(":5000"))
}
