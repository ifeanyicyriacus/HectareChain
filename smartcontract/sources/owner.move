// This module defines the Owner structure and related functions 
// for managing ownership in a smart contract.
module smartcontract::owner;
    use std::string::String;
    use sui::object::{UID};
    use sui::tx_context::TxContext;

    public struct Owner has key, store {
        id: UID,
        name: String,
        physical_address: String,
        identification_type: IdentificationNumberType,
        identification_number: String,
    }

    public enum IdentificationNumberType has store {
        NationalID,
        Passport,
        DriverLicense,
        VoterID,
    }

    // Create new owner
    public entry fun create_owner(
        name: String,
        physical_address: String,
        identification_type: IdentificationNumberType,
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
        new_identification_type: IdentificationNumberType,
        new_identification_number: String
    ) {
        owner.name = new_name;
        owner.physical_address = new_address;
        owner.identification_type = new_identification_type;
        owner.identification_number = new_identification_number;
    }

    // Get owner details
    public fun get_owner_details(owner: &Owner): (String, String, IdentificationNumberType, String) {
        (
            owner.name,
            owner.physical_address,
            owner.identification_type,
            owner.identification_number
        )
    }
// }