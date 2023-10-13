import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed);

    /**
     * @param {null} error
     * @param {transformed} dados
     */
    callback(null, Buffer.from(String(transformed)));
  }
}

/**
 * NOTE: Tudo no node é stream todas as entradas e saídas do node é stream
 *
 * req => Readable Stream
 * res => Writeable Stream
 */

const server = http.createServer((req, res) => {
  /**
   * Req (Readable Stream) está lendo os dados e já escrevendo/ retornando no
   * res (Writeable Stream)
   */
  return req.pipe(new InverseNumberStream()).pipe(res);
});

server.listen(3334, () => {
  console.log("listening on 3334");
});
