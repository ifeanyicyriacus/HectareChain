// This module defines a smart contract for 
// managing land ownership and details in a blockchain environment.
module smartcontract::land {
    use std::string::String;

    public struct Land has key, store {
        id: UID,
        land_id: String,
        owner: address,  // Address of Owner object owner
        latitudes: vector<u64>,
        longitudes: vector<u64>,
        area_in_sqm: u64,
        // ownership_history: vector<address>,
        ownership_history: vector<ID>,
    }

    public fun get_land_id(land: &Land): String {
        land.land_id
    }

    // Create new land
    public entry fun create_land(
        land_id: String,
        latitudes: vector<u64>,
        longitudes: vector<u64>,
        area_in_sqm: u64,
        ctx: &mut TxContext
    ) {
        let len = vector::length(&latitudes);
        assert!(len == vector::length(&longitudes), 0);
        
        let land = Land {
            id: object::new(ctx),
            land_id,
            owner: tx_context::sender(ctx),
            latitudes,
            longitudes,
            area_in_sqm,
            ownership_history: vector::empty(),
        };
        transfer::transfer(land, tx_context::sender(ctx));
    }

    // Update land information
    public entry fun update_land_info(
        land: &mut Land,
        latitudes: vector<u64>,
        longitudes: vector<u64>,
        area_in_sqm: u64,
        _ctx: &mut TxContext
    ) {
        let len = vector::length(&latitudes);
        assert!(len == vector::length(&longitudes), 0);

        // Update the land's coordinates and area
        land.latitudes = latitudes;
        land.longitudes = longitudes;
        land.area_in_sqm = area_in_sqm;
    }

    // Assign ownership to new owner
    public entry fun transfer_ownership(
        land: &mut Land, 
        new_owner: address,
        transaction_id: ID
    ) : (String, address, vector<u64>, vector<u64>, u64, vector<ID>)
    {
        // Save previous owner for history
        land.owner = new_owner;
        vector::push_back(&mut land.ownership_history, transaction_id);

        // Return all land details
        (
            land.land_id,
            land.owner,
            land.latitudes,
            land.longitudes,
            land.area_in_sqm,
            land.ownership_history
        )
    }

    // Assign ownership to new owner
    public entry fun transfer_ownership_get_land_details(
        land: &mut Land, 
        new_owner: address,
        transaction_id: ID
    ) : (String, address, vector<u64>, vector<u64>, u64, vector<ID>)
    {
        // Save previous owner for history
        land.owner = new_owner;
        vector::push_back(&mut land.ownership_history, transaction_id);

        // Return all land details
        (
            land.land_id,
            land.owner,
            land.latitudes,
            land.longitudes,
            land.area_in_sqm,
            land.ownership_history
        )
    }

    // Get land details
    public fun get_land_details(land: &Land): (String, address, vector<u64>, vector<u64>, u64, vector<ID>) {
    (
        land.land_id,
        land.owner,
        land.latitudes,
        land.longitudes,
        land.area_in_sqm,
        land.ownership_history
    )
    }

    
}