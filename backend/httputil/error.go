package httputil

import "github.com/gofiber/fiber/v2"

type HTTPError struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func NewError(c *fiber.Ctx, status int, message string) error {
	er := HTTPError{
		Code:    status,
		Message: message,
	}
	c.Status(status)
	return c.JSON(er)
}
