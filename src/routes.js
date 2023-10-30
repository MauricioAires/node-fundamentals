import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRouePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRouePath("/users"),
    handler: (req, res) => {
      const { search } = req.query;

      const users = database.select(
        "users",
        search
          ? {
              name: search,
              email: search,
            }
          : null,
      );

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRouePath("/users"),
    handler: (req, res) => {
      const { name, email } = req.body;

      database.insert("users", {
        id: randomUUID(),
        name,
        email,
      });

      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: buildRouePath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete("users", id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: buildRouePath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { name, email } = req.body;

      database.update("users", id, {
        name,
        email,
      });

      return res.writeHead(204).end();
    },
  },
];
