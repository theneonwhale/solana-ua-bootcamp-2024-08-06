use solana_sdk::signature::{Keypair, Signer};
use std::env;
use hex;
use dotenv::dotenv;

pub fn create_keypair_from_secret() -> Keypair {
    dotenv().ok();

    let private_key_str = env::var("SECRET_KEY").expect("SECRET_KEY must be set in .env");

    let private_key_str = private_key_str.replace(",", "").replace(" ", "");

    let private_key_bytes = hex::decode(private_key_str).expect("Failed to decode private key");

    Keypair::from_bytes(&private_key_bytes).expect("Failed to create Keypair from private key")
}

pub fn load_keypair() {
    dotenv().ok();

    let wallet = create_keypair_from_secret();

    let public_key = wallet.pubkey();
    println!("Public key: {}", public_key);

    let private_key_bytes = wallet.to_bytes();
    println!("Private key (array of numbers): {:?}", private_key_bytes);

    let private_key_str = hex::encode(private_key_bytes);
    println!("Private key (hex): {}", private_key_str);
}
