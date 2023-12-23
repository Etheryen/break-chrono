package main

import (
	"break-chrono/database"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/google/uuid"
)

type NewBreak struct {
	Date string `json:"date"`
}

func getCorsConfig() *cors.Config {
	corsConfig := new(cors.Config)

	if os.Getenv("ENVIRONMENT") == "development" {
		corsConfig.AllowOriginsFunc = func(origin string) bool {
			return true
		}
	} else {
		corsConfig.AllowOrigins = "https://break-chrono.ncx.pl, https://break-chrono.vercel.app"
	}

	return corsConfig
}

func main() {
	app := fiber.New()
	database.Connect()
	db := database.Db

	app.Use(logger.New())

	app.Use(cors.New(*getCorsConfig()))

	api := app.Group("/api")

	api.Get("/break/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		date := db.Get(id)
		if date != "" {
			return c.JSON(&fiber.Map{
				"date": date,
			})
		}

		c.Status(fiber.StatusNotFound)
		return nil
	})

	api.Post("/break", func(c *fiber.Ctx) error {
		newBreak := new(NewBreak)

		if err := c.BodyParser(newBreak); err != nil {
			return err
		}

		// TODO: make sure the date is valid, use a parser / change type to date

		log.Println("Creating break until: ", newBreak.Date)

		id := uuid.New().String()
		db.Set(id, newBreak.Date)

		c.Status(fiber.StatusCreated)
		return c.JSON(&fiber.Map{
			"id": id,
		})
	})

	log.Fatal(app.Listen(":8000"))
}
