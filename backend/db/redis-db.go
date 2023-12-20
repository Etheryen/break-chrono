package db

import (
	"context"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/redis/go-redis/v9"
)

var (
	ctx    = context.Background()
	client *redis.Client
)

func init() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	opt, _ := redis.ParseURL(os.Getenv("DB_URL"))
	newClient := redis.NewClient(opt)

	client = newClient
}

func Get(id string) string {
	return client.Get(ctx, id).Val()
}

// TODO: make actual date type
func Set(id string, value string) {
	client.Set(ctx, id, value, 0)
}
