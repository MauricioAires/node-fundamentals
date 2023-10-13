import { Readable } from "node:stream";

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
    }, 1);
  }
}

fetch("http://localhost:3334", {
  method: "POST",
  body: new OndeToHundredStream(),
  duplex: "half",
});

/**
 * NOTE: Desde a versão 18 do node ele suporta nativamente a fetch API
 */
