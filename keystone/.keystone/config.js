var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");

// auth.ts
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "name",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"]
  }
});
var sessionSecret = "vbsdkblasmnc;jkcpk;,m;k[edjdjnndnleee";
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var import_fields_document = require("@keystone-6/fields-document");
var lists = {
  User: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({ validation: { isRequired: true }, isIndexed: "unique" }),
      posts: (0, import_fields.relationship)({ ref: "Post.author", many: true }),
      password: (0, import_fields.password)({ validation: { isRequired: true } })
    },
    hooks: {
      afterOperation: ({ operation, item }) => {
        if (operation === "create") {
          console.log(`New user created. Name: ${item.name}, Email: ${item.email}`);
        }
      }
    }
  }),
  Post: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields.text)(),
      avatar: (0, import_fields.image)({ storage: "my_local_images" }),
      publishedAt: (0, import_fields.timestamp)(),
      author: (0, import_fields.relationship)({
        ref: "User.posts"
      }),
      status: (0, import_fields.select)({
        options: [
          { label: "Published", value: "published" },
          { label: "Draft", value: "draft" },
          { label: "Pending", value: "pending" }
        ],
        defaultValue: "draft",
        ui: { displayMode: "segmented-control" }
      }),
      content: (0, import_fields_document.document)({
        formatting: true,
        links: true,
        dividers: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1]
        ]
      })
    }
  }),
  Author: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)(),
      email: (0, import_fields.text)()
    },
    hooks: {
      afterOperation: ({ operation, item }) => {
        console.log(operation, item);
        if (operation === "create") {
          console.log(`New user created. Name: ${item.name}, Email: ${item.email}`);
        }
      },
      resolveInput: async ({
        listKey,
        operation,
        inputData,
        item,
        resolvedData,
        context
      }) => {
        console.log(
          "resolvedData",
          listKey,
          operation,
          inputData,
          item,
          resolvedData,
          context
        );
      }
    }
  }),
  Product: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)(),
      price: (0, import_fields.text)(),
      description: (0, import_fields.text)(),
      avatar: (0, import_fields.image)({ storage: "my_local_images" }),
      category: (0, import_fields.select)({
        options: [
          { label: "Men", value: "men" },
          { label: "Women", value: "women" },
          { label: "Kids", value: "kids" }
        ]
      })
    },
    hooks: {
      afterOperation: ({ operation, item }) => {
        if (operation === "create") {
          console.log(`New Item created. Name: ${item.name}, price: ${item.price}`);
        }
      },
      resolveInput: ({ resolvedData }) => {
        const { name } = resolvedData;
        if (name) {
          return {
            ...resolvedData,
            // Ensure the first letter of the title is capitalised
            name: name[0].toUpperCase() + name.slice(1)
          };
        }
        return resolvedData.name;
      },
      validateInput: ({ resolvedData, addValidationError }) => {
        const { price } = resolvedData;
        if (price >= "30000") {
          addValidationError("The price should be less then 30000");
        }
      },
      validateDelete: ({ operation, item }) => {
        if (operation === "delete") {
          console.log(`New Item delete. Name: ${item.name}, price: ${item.price}`);
        }
      }
    }
  })
};
var keystone_default = (0, import_core.config)(
  withAuth({
    db: {
      provider: "postgresql",
      url: "postgres://postgres:Vikalp@99@localhost:5432/firstproject"
    },
    lists,
    storage: {
      my_local_images: {
        // Images that use this store will be stored on the local machine
        kind: "local",
        // This store is used for the image field type
        type: "image",
        // The URL that is returned in the Keystone GraphQL API
        generateUrl: (path) => `http://localhost:3000/images${path}`,
        // The route that will be created in Keystone's backend to serve the images
        serverRoute: {
          path: "/images"
        },
        // Set serverRoute to null if you don't want a route to be created in Keystone
        // serverRoute: null
        storagePath: "public/images"
      }
      /** more storage */
    },
    session,
    ui: {
      isAccessAllowed: (context) => !!context.session?.data
    }
  })
);
