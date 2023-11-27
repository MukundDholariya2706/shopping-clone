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
            feedback: {
              type: "string",
              descripition: "Add your feedback here",
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

const get_rating = {
  tags: ["Rating"],
  description: "Rating List",
  summary: "Rating List by product",
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

const update_rating = {
  tags: ["Rating"],
  description: "Update rating",
  summary: "Update rating",
  security: [
    {
      bearerAuth: [],
    },
  ],

  parameters: [
    {
      name: "ratingId",
      in: "path",
      description: "rating Id",
      required: true,
    },
  ],

  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            product: {
              type: "string",
              descripition: "Enter product id",
              required: true,
            },
            rate: {
              type: "number",
              descripition: "Enter your rating",
              required: true,
            },
            feedback: {
              type: "string",
              descripition: "Enter your feedback",
              required: true,
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

const delete_rating = {
  tags: ["Rating"],
  description: "Delete rating",
  summary: "Delete rating",
  security: [
    {
      bearerAuth: [],
    },
  ],

  parameters: [
    {
      name: "ratingId",
      in: "path",
      description: "rating Id",
      required: true,
    },
  ],

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
  "/rating/getRating/{productId}": {
    get: get_rating,
  },
  "/rating/update/{ratingId}": {
    put: update_rating,
  },
  "/rating/delete-rating/{ratingId}": {
    delete: delete_rating,
  },
};

module.exports = RatingRouter;
