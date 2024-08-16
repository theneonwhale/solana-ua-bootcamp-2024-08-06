import "dotenv/config";
import { Keypair } from "@solana/web3.js";

const keyFromEnv: any = process.env.SECRET_KEY;
const asArray = Uint8Array.from(JSON.parse(keyFromEnv));
const keypair = Keypair.fromSecretKey(asArray);

console.log('Keypair successfully generated!');

console.log('Public key:', keypair.publicKey.toBase58());
console.log('Private key:', keypair.secretKey.toString());
