mod generate_keypair;
mod load_keypair;
mod check_balance;

fn main() {
    generate_keypair::generate_keypair();
    load_keypair::load_keypair();
    check_balance::check_balance();
}
