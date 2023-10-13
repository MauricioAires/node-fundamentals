/**
 *  Buffer é uma forma nativa do node ler e escrever
 * dados na memoria
 *
 * é a forma mais eficiente de tratar dados
 *
 * Buffer é a representação de dados em memoria no formato de hexadecimal
 * que o node utiliza
 */

const buf = Buffer.from("Mauricio");

console.log(buf.toJSON());
