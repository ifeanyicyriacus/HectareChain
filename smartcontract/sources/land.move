// This module defines a smart contract for 
// managing land ownership and details in a blockchain environment.
module smartcontract::land {
    use std::string::String;
    use smartcontract::point::Point;

    public struct Land has key, store {
        id: UID,
        land_id: String,
        owner: address,  // Address of Owner object owner
        coordinates: vector<Point>,
        area_in_sqm: u64,
        ownership_history: vector<ID>,
    }

    public fun get_land_id(land: &Land): String {
        land.land_id
    }

    // Create new land
    public entry fun create_land(
        land_id: String,
        coordinates: vector<Point>,
        area_in_sqm: u64,
        ctx: &mut TxContext
    ) {
        let land = Land {
            id: object::new(ctx),
            land_id,
            owner: tx_context::sender(ctx),
            coordinates,
            area_in_sqm,
            ownership_history: vector::empty(),
        };
        transfer::transfer(land, tx_context::sender(ctx));
    }

    // Update land information
    public entry fun update_land_info(
        land: &mut Land,
        new_coordinates: vector<Point>,
        new_area: u64
    ) {
        land.coordinates = new_coordinates;
        land.area_in_sqm = new_area;
    }

    // Assign ownership to new owner
    public entry fun transfer_ownership(
        land: &mut Land,
        transaction_id: ID,
        new_owner: address
    ) {
        land.owner = new_owner;
        vector::push_back(&mut land.ownership_history, transaction_id);
    }

    // Get land details
    public fun get_land_details(land: &Land): (String, address, vector<Point>, u64, vector<ID>) {
        (
            land.land_id,
            land.owner,
            land.coordinates,
            land.area_in_sqm,
            land.ownership_history
        )
    }
}