import http from "node:http";

const users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/users") {
    return res
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(users));
  }
  if (method === "POST" && url === "/users") {
    users.push({
      id: 1,
      name: "John Doe",
      email: "te@kumlof.dk",
    });

    return res.end("Criação de usuários");
  }

  return res.end("Hello world!!");
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