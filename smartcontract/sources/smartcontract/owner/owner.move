module smartcontract::owner;

use std::string::String;

public struct Owner has key, store {
    id: object::UID,
    name: String,
    address: address,
    identification: IdentificationNumberType,
    identification_number: String,
}

public enum IdentificationNumberType has store {
    NationalID,
    Passport,
    DriverLicense,
    VoterID,
}

public fun create_owner(
    ctx: &mut TxContext,
    name: String,
    owner_address: address,
    identification: IdentificationNumberType,
    identification_number: String,
) :Owner{
    Owner{
        id:object::new(ctx),
        name,
        address:owner_address,
        identification,
        identification_number,
    }
}


