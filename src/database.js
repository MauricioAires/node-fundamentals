import fs from "node:fs/promises";

const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  /**
   * Para criar propriedades privadas
   * em classes javascript devemos adicionar um # do nome da
   * propriedade dessa forma ela ficar disponível
   * apenas dentro da classe, isso funciona tanto para
   * propriedades com para métodos
   */
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
      return;
    }

    this.#database[table] = [data];

    this.#persist();

    return data;
  }

  select(table) {
    const data = this.#database[table];

    if (!data) {
      return [];
    }

    return data;
  }
}
