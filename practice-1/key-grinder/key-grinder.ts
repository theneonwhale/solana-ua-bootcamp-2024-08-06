import { Keypair } from "@solana/web3.js";

const targetPrefix = "ANDY";
const prefixLength = targetPrefix.length;
const probability = Math.pow(1 / 58, prefixLength);

console.log(`Generating keypair with prefix: ${targetPrefix} ...`);

let keypair;
let publicKey;
let tries = 0;

const startTime = Date.now();

do {
  keypair = Keypair.generate();
  publicKey = keypair.publicKey.toBase58();
  tries++;
  // console.log('Try:', tries);
} while (!publicKey.startsWith(targetPrefix));

const endTime = Date.now();
const elapsedTime = (endTime - startTime) / 1000;

console.log('Found keypair!');
console.log('Public Key:', publicKey);
console.log('Private Key:', keypair.secretKey.toString());
console.log(`Took ${tries} tries and ${elapsedTime} seconds to find the keypair.`);
console.log(`Probability of finding a keypair with prefix "${targetPrefix}" is approximately 1 in ${1 / probability}`);
