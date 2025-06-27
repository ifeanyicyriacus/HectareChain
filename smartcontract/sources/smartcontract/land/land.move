module smartcontract::land;

use std::string::String;
use smartcontract::point::{Point};


public struct Land has key, store {
    id: UID,
    land_id:String,
    owner_id:address,
    coordinates: vector<Point>,
    area_in_sqm:u64,
    ownership_history:vector<UID>, // List of transaction IDs representing ownership changes
}

