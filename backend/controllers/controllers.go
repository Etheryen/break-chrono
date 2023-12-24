package controllers

import (
	"break-chrono/database"
	"break-chrono/httputil"
	"break-chrono/models"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

// GetDate godoc
//
//	@Summary		Get the end date
//	@Description	get end date by id
//	@Produce		json
//	@Param			id	path		int	true	"Timer ID"
//	@Success		200	{object}	models.Break
//	@Failure		404	{object}	httputil.HTTPError
//	@Router			/breaks/{id} [get]
func GetDate(c *fiber.Ctx) error {
	id := c.Params("id")
	date := database.Db.Get(id)
	if date != "" {
		return c.JSON(models.Break{Date: date})
	}

	return httputil.NewError(c, fiber.StatusNotFound, "timer not found")
}

// GetDate godoc
//
//	@Summary		Create a new timer
//	@Description	create a new timer by passing the end date
//	@Accept			json
//	@Produce		json
//	@Param			date	body		models.Break	true	"New break to add"
//	@Success		200		{object}	models.PostResponse
//	@Router			/breaks [post]
func SetDate(c *fiber.Ctx) error {
	newBreak := new(models.Break)

	if err := c.BodyParser(newBreak); err != nil {
		return err
	}

	// TODO: make sure the date is valid, use a parser / change type to date

	log.Println("Creating break until: ", newBreak.Date)

	id := uuid.New().String()
	database.Db.Set(id, newBreak.Date)

	c.Status(fiber.StatusCreated)
	return c.JSON(&fiber.Map{
		"id": id,
	})
}
