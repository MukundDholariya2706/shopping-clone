const add_rating = {
  tags: ["Rating"],
  description: "Add rating",
  summary: "Add rating",
  security: [
    {
      bearerAuth: [],
    },
  ],

  parameters: [
    {
      name: "productId",
      in: "path",
      description: "Product Id",
      required: true,
    },
  ],

  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            rate: {
              type: "number",
              required: true,
              descripition: "Rating 1 to 5",
              example: 1,
            },
          },
        },
      },
    },
  },

  responses: {
    200: {
      description: "ok",
      content: {
        "application/json": {
          schema: {
            type: "object",
          },
        },
      },
    },
  },
};

const RatingRouter = {
  "/rating/add/{productId}": {
    post: add_rating,
  },
};

module.exports = RatingRouter;
