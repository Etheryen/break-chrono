package database

import (
	"context"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/redis/go-redis/v9"
)

type Database struct {
	conn *redis.Client
}

func (db *Database) Get(id string) string {
	return db.conn.Get(ctx, id).Val()
}

// TODO: make actual date type
func (db *Database) Set(id string, value string) {
	db.conn.Set(ctx, id, value, 0)
}

var (
	ctx = context.Background()
	Db  Database
)

func Connect() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	opt, _ := redis.ParseURL(os.Getenv("DB_URL"))
	client := redis.NewClient(opt)

	Db.conn = client
}
