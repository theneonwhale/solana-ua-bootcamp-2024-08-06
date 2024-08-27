import {
  Connection,
  Keypair,
  clusterApiUrl
} from "@solana/web3.js";
import {
  createMultisig,
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  getMint
} from "@solana/spl-token";
import "dotenv/config";

const signer1 = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env["SIGNER_1_PRIVATE_KEY"])));
const signer2 = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env["SIGNER_2_PRIVATE_KEY"])));
const signer3 = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env["SIGNER_3_PRIVATE_KEY"])));
const signer1_publicKey = signer1.publicKey.toBase58();
const signer2_publicKey = signer2.publicKey.toBase58();
const signer3_publicKey = signer3.publicKey.toBase58();

console.log('signer1_publicKey', signer1_publicKey);
console.log('signer2_publicKey', signer2_publicKey);
console.log('signer3_publicKey', signer3_publicKey);

const connection = new Connection(clusterApiUrl("devnet"));

const payer = signer1;

const multisigKey = await createMultisig(
  connection,
  payer,
  [
    signer1.publicKey,
    signer2.publicKey,
    signer3.publicKey
  ],
  2
);

console.log(`Created 2/3 multisig ${multisigKey.toBase58()}`);

const mint = await createMint(
  connection,
  payer,
  multisigKey,
  multisigKey,
  9
);

const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer,
  mint,
  signer1.publicKey
);

await mintTo(
  connection,
  payer,
  mint,
  associatedTokenAccount.address,
  multisigKey,
  1,
  [
    signer1,
    signer2
  ]
)

const mintInfo = await getMint(
  connection,
  mint
)

console.log(`Minted ${mintInfo.supply} token`);
