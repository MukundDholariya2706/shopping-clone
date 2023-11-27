const login = {
  tags: ["User"],
  description: "User Login",
  summary: "User Login",

  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: {
              type: "string",
              required: true,
              descripition: "Enter your register email",
            },
            password: {
              type: "string",
              required: true,
              descripition: "Enter your password",
            },
          },
        },
      },
    },
  },
  responses: {
    201: {
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

const user_register = {
  tags: ["User"],
  description: "User Register",
  summary: "User Register",

  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            first_name: {
              type: "string",
              required: true,
            },
            last_name: {
              type: "string",
              required: true,
            },
            email: {
              type: "string",
              required: true,
            },
            password: {
              type: "string",
              required: true,
              maxlength: 6,
            },
          },
        },
      },
    },
  },

  responses: {
    201: {
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

const seller_register = {
  tags: ["User"],
  description: "Seller Register",
  summary: "Seller Register",

  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            first_name: {
              type: "string",
              required: true,
            },
            last_name: {
              type: "string",
              required: true,
            },
            email: {
              type: "string",
              required: true,
            },
            password: {
              type: "string",
              required: true,
              description: "minlength 6",
            },
          },
        },
      },
    },
  },

  responses: {
    201: {
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

const UserRouter = {
  "/user/login": {
    post: login,
  },
  "/user/user-register": {
    post: user_register,
  },
  "/user/seller-register": {
    post: seller_register,
  },
};

module.exports = UserRouter;
