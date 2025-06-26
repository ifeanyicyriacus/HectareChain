
/// Module: smartcontract
module smartcontract::smartcontract;

use std::string::String;
use std::address;

public struct MediaFile has key, store {
    id: UID,
    transaction_id: UID,
    document_name: String,
    file_type: String,
    uploaded_at: u64,
}

public struct Transaction has key, store{
    id: UID,
    timestamp:u64,
    from:address,
    to:address,
    land_id: UID,
    transfer_type:TransferType,
    transfer_amount_ngn_kobo: u64, // in smallest currency unit, e.g., wei for Ethereum
    documents: vector<MediaFile>,
}

public struct Point has store {
    longitude: u64,
    latitude: u64,
}

public struct Land has key, store {
    id: UID,
    land_id:String,
    owner_id:address,
    coordinates: vector<Point>,
    area_in_sqm:u64,
    ownership_history:vector<UID>, // List of transaction IDs representing ownership changes
}

public struct Owner has key, store {
    id:UID,
    name: String,
    address: address,
    identification: IdentificationNumberType,
    identification_number: String, // National Identification Number
}

public struct PointLandPair has store{
    point: Point,
    land_id: String,
}

public struct LandRegistry has key {
    id:UID,
    owner:vector<Owner>,
    lands: vector<Land>,
    transactions: vector<Transaction>,
    coordinate_index: vector<PointLandPair>,
}

public enum TransferType has store {
    Sale,
    Inheritance,
    Gift,
    Lease,
    Mortgage
}
public enum IdentificationNumberType has store {
    NationalID,
    Passport,
    DriverLicense,
    VoterID,
}


// Functioinalities of the Land Registry System:
// Owner Management:
//     Create a new owner
public fun create_owner(
    registry:&mut LandRegistry,
    ctx: &mut TxContext,
    name: String,
    owner_address: address,
    identification: IdentificationNumberType,
    identification_number: String,
){
    let new_owner = Owner{
        id:object::new(ctx),
        name,
        address:owner_address,
        identification,
        identification_number,
    };
    vector::push_back(&mut registry.owner, new_owner);
}




// The land registry system provides functionalities for:

// Owner Management:
//     Create a new owner
//     Update owner information
//     Retrieve owner details

// Land Management:
//     Create a new land
//     Update land information
//     Retrieve land details
//     Assign ownership of a land to an owner

// Transaction Management:
//     Create a new transaction (e.g., sale, inheritance, gift)
//     Update transaction status
//     Retrieve transaction details

// Land Registry Management:
//     Add a new land to the registry
//     Update land registry information
//     Retrieve land registry details

// Coordinate Indexing:
//     Create a coordinate index for efficient land lookup
//     Retrieve lands based on coordinates



// Security features:
// Access Control
// immutable storage
// transparent transaction history

// The share registry system ensures that the company and the public can 
// track ownership, transfers, and other relevant information 
// about the company's shares

// This land registry system ensures that the government and the public 
// can track ownership, transfer and other relevant information about the 
// land state's lands.

// Next steps
// Define functions for adding, updating, or removing points from the coordinates array.
// Consider implementing spatial indexing for efficient queries.



// mint CofO
// how to index coordinates, catering for encrochment within area of land 

