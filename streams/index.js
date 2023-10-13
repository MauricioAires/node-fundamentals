/**
 *  Netflix x Spotify
 *
 * - Importação de clientes via CSV (Excel)
 *
 * - Readable Steam x Writable Steam
 *
 * - Por padrão as portas do node são steam tanto a request
 * que pode enviar dados por parte (upload de imagem, video, csv) quando
 * o response também é um stream que pode retornar as informações as poucos
 * com o excel ou um video
 *
 * - stdin/stdout é uma stream para leitura de dados do terminal
 *
 *  process.stdin.pipe(process.stdout);
 */

import { Readable, Writable, Transform } from "node:stream";

class OndeToHundredStream extends Readable {
  index = 1;
  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        /**
         * Esse push() é o método utilizado em streams  para fornecer informações para quem
         * está utilizando essa class
         */
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));

        this.push(buf);
      }
    }, 1000);
  }
}

class MultipleByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);

    callback();
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    /**
     * @param {null} error
     * @param {transformed} dados
     */
    callback(null, Buffer.from(String(transformed)));
  }
}
// new OndeToHundredStream().pipe(process.stdout);
new OndeToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultipleByTenStream());
