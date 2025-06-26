
/// Module: smartcontract
module smartcontract::smartcontract;

use std::string::String;

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
    transfer_type:String, // e.g., "sale", "inheritance", "gift", "lease", "mortgage",
    // transfer_type can be an enum or a string
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
    ownership_history:vector<Transaction>,
}

public struct PointLandPair has store{
    point: Point,
    land_id: String,
}

public struct LandRegistry has key {
    id:UID,

    owner_name:String,
    lands: vector<Land>,
    coordinate_index: vector<PointLandPair>,
}

public enum TransferType {
    Sale,
    Inheritance,
    Gift,
    Lease,
    Mortgage
}

public struct Owner





//  You might want to consider using a more efficient data structure for 
// coordinate_index, such as a hash table or a spatial index, to enable
// faster lookups.

// enum for transfer type


// functions:
// transfer_ownership
// update_land_registry_information
// verify_ownership
// retrive_land_data

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

