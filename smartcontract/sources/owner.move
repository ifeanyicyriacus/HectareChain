// This module defines the Owner structure and related functions 
// for managing ownership in a smart contract.
module smartcontract::owner{
    use std::string::String;

    public struct Owner has key, store {
        id: UID,
        name: String,
        physical_address: String,
        identification_type: String,
        identification_number: String,
    }


    // Create new owner
    public entry fun create_owner(
        name: String,
        physical_address: String,
        identification_type: String,
        identification_number: String,
        ctx: &mut TxContext
    ) {
        let owner = Owner {
            id: object::new(ctx),
            name,
            physical_address,
            identification_type,
            identification_number,
        };
        transfer::transfer(owner, tx_context::sender(ctx));
    }

    // Update owner information
    public entry fun update_owner(
        owner: &mut Owner,
        new_name: String,
        new_address: String,
        new_identification_type: String,
        new_identification_number: String
    ) {
        owner.name = new_name;
        owner.physical_address = new_address;
        owner.identification_type = new_identification_type;
        owner.identification_number = new_identification_number;
    }

    // Get owner details
    public fun get_owner_details(owner: &Owner): (String, String, String, String) {
        (
            owner.name,
            owner.physical_address,
            owner.identification_type,
            owner.identification_number
        )
    }
}