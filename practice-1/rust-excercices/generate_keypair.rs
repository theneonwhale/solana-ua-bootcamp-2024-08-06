use solana_sdk::signature::{Keypair, Signer};
use hex;

pub fn create_keypair() -> Keypair {
    Keypair::new()
}

pub fn get_public_key(wallet: &Keypair) -> String {
    wallet.pubkey().to_string()
}

pub fn private_key_bytes(wallet: &Keypair) -> Vec<u8> {
    let private_key_bytes = wallet.to_bytes();
    private_key_bytes.to_vec()
}

pub fn private_key_str(wallet: &Keypair) -> String {
    let private_key_bytes = wallet.to_bytes();
    hex::encode(private_key_bytes)
}

pub fn generate_keypair() {
    let wallet = create_keypair();
    println!("Public key: {}", get_public_key(&wallet));
    println!("Private key (array of numbers): {:?}", private_key_bytes(&wallet));
    println!("Private key (hex): {}", private_key_str(&wallet));
}
