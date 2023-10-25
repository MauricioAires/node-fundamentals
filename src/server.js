import http from "node:http";
import { json } from "./middlewares/json.js";
import { Database } from "./database.js";

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/users") {
    const users = database.select("users");

    return res.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;

    database.insert("users", {
      id: 1,
      name,
      email,
    });

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(3333, () => {
  console.log(`Server listening on 3333`);
});

/**
 * NOTE: Concept of Stateful
 *
 * Ela depende da memoria para armazenar informações a partir do momento
 * que a aplicação for reiniciada os dados será perdido (Stateless é o contrário disso kk)
 */
