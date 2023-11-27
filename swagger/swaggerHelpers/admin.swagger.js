const user_list = {
  tags: ["Admin"],
  description: "User Listing",
  summary: "User Listing",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "page",
      in: "query",
      description: "Enter the page number",
      type: "Number",
    },
    {
      name: "limit",
      in: "query",
      description: "Enter the limit",
      type: "string",
    },
    {
      name: "search",
      in: "query",
      description: "Enter the search string",
      type: "string",
    },
    {
      name: "sortBy",
      in: "query",
      description: "Enter the sortBy, Example: role",
      type: "string",
    },
    {
      name: "sortDirection",
      in: "query",
      description: "Enter sort direction, -1: desc, 1: asc ",
      type: "string",
      example: "1",
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

const statistics = {
  tags: ["Admin"],
  description: "statistics",
  summary: "statistics",
  security: [
    {
      bearerAuth: [],
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

const deleteUser = {
  tags: ["Admin"],
  description: "Delete User",
  summary: "Delete User - Only Admin can super admin can delete the user",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "Users Id",
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

const AdminRouter = {
  "/admin/user-list": {
    get: user_list,
  },
  "/admin/statistics": {
    get: statistics,
  },
  "/admin/user/{id}": {
    delete: deleteUser,
  },
};

module.exports = AdminRouter;
