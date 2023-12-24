package main

import (
	"break-chrono/controllers"
	"break-chrono/database"
	"log"
	"os"
	"time"

	_ "break-chrono/docs"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cache"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/swagger"
)

func getCorsConfig() cors.Config {
	var corsConfig cors.Config

	if os.Getenv("ENVIRONMENT") == "development" {
		corsConfig.AllowOriginsFunc = func(origin string) bool {
			return true
		}
	} else {
		corsConfig.AllowOrigins = "https://break-chrono.ncx.pl, https://break-chrono.vercel.app"
	}

	log.Println("CORS Origins:", corsConfig.AllowOrigins)

	return corsConfig
}

//	@title			BreakChrono
//	@version		1.0
//	@description	Set up a timer that you can share with others
//	@host			localhost:8000
//	@BasePath		/
func main() {
	app := fiber.New()
	database.Connect()

	app.Use(logger.New())
	app.Use(cors.New(getCorsConfig()))
	app.Use(cache.New(cache.Config{
		Expiration: 24 * time.Hour,
	}))

	app.Get("/swagger/*", swagger.HandlerDefault)

	api := app.Group("/api")
	breaks := api.Group("/breaks")

	breaks.Get(":id", controllers.GetDate)
	breaks.Post("", controllers.SetDate)

	log.Fatal(app.Listen(":8000"))
}
