import http from "node:http";

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  const buffers = [];

  /**
   * Esperar todos os chunks da stream
   */
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    req.body = null;
  }

  if (method === "GET" && url === "/users") {
    return res
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;

    users.push({
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
