const product_list = {
  tags: ["Product"],
  description: "Product Listing",
  summary: "Product Listing",
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
    {
      name: "min",
      in: "query",
      description: "Enter min price ",
      type: "string",
    },
    {
      name: "max",
      in: "query",
      description: "Enter max price",
      type: "string",
    },
    {
      name: "gender",
      in: "query",
      description: "Enter gender. male, female",
      type: "string",
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

const add_product = {
  tags: ["Product"],
  description: "add new Product",
  summary: "add new Product",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            productName: {
              type: "string",
              required: true,
              descripition: "Enter your product name",
              example: "Shoes",
            },
            productDescription: {
              type: "string",
              required: true,
              descripition: "Enter your product description",
              example: "Nike shoes",
            },
            price: {
              type: "number",
              required: true,
              descripition: "Enter your product price",
              example: 200,
            },
            gender: {
              type: "array",
              descripition: "Enter gender",
              items: {
                type: "string",
              },
              example: ["male", "female"],
            },
          },
        },
      },
    },
  },
  responses: {
    201: {
      descripition: "ok",
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

const update_product = {
  tags: ["Product"],
  description: "Update your Product",
  summary: "Update your Product",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "id",
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
            productName: {
              type: "string",
              required: true,
              descripition: "Enter your product name",
              example: "Shoes",
            },
            productDescription: {
              type: "string",
              required: true,
              descripition: "Enter your product description",
              example: "Nike shoes",
            },
            price: {
              type: "number",
              required: true,
              descripition: "Enter your product price",
              example: 200,
            },
            gender: {
              type: "array",
              descripition: "Enter gender",
              items: {
                type: "string",
              },
              example: ["male", "female"],
            },
          },
        },
      },
    },
  },
  responses: {
    201: {
      descripition: "ok",
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

const delete_product = {
  tags: ["Product"],
  description: "Delete your Product",
  summary: "Delete your Product",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "Product Id",
      required: true,
    },
  ],
  responses: {
    201: {
      descripition: "ok",
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

const upload_image = {
  tags: ["Product"],
  description: "Upload product image",
  summary: "Upload product image",
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
  requestBody: {
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            productImages: {
              type: "string",
              format: "binary",
              descripition: "Upload product image",
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

const delete_product_image = {
  tags: ["Product"],
  description: "Delete product image",
  summary: "Delete product image",
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
    {
      name: "imageId",
      in: "path",
      description: "Image Id",
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

const ProductRouter = {
  "/product/get-product": {
    get: product_list,
  },
  "/product/add-product": {
    post: add_product,
  },
  "/product/update-product/{id}": {
    put: update_product,
  },
  "/product/delete-product/{id}": {
    delete: delete_product,
  },
  "/product/product-image/{id}": {
    post: upload_image,
  },
  "/product/product-image/{productId}/imageId/{imageId}": {
    delete: delete_product_image,
  },
};

module.exports = ProductRouter;
