use solana_client::rpc_client::RpcClient;
use solana_sdk::pubkey::Pubkey;
use std::env;
use std::str::FromStr;
use dotenv::dotenv;

pub fn check_balance() {
    dotenv().ok();

    let url = "https://api.devnet.solana.com";
    let client = RpcClient::new(url);
    println!("⚡️ Connected to devnet");

    let public_key_str = env::var("PUBLIC_KEY").expect("PUBLIC_KEY must be set in .env");
    let public_key = Pubkey::from_str(&public_key_str).expect("Invalid public key format");

    let balance_in_lamports = client.get_balance(&public_key).expect("Failed to get balance");

    let balance_in_sol = balance_in_lamports as f64 / solana_sdk::native_token::LAMPORTS_PER_SOL as f64;

    println!(
        "💰 The balance for the wallet at address {} is: {} SOL",
        public_key, balance_in_sol
    );
}
