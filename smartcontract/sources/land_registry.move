// This module defines a land registry smart contract that allows for the
// ===== land_registry.move =====
module smartcontract::land_registry {
    use sui::dynamic_field as df;
    use std::string::String;

    public struct LandInfo has store{
        land_id:String,
        owner: address,
    }

    public struct LandRegistry has key {
        id: UID,
        land_id_index:UID,
    }

    // Initialize land registry
    public entry fun create_land_registry(ctx: &mut TxContext) {
        let registry = LandRegistry {
            id: object::new(ctx),
            land_id_index: object::new(ctx),
        };
        transfer::share_object(registry);
    }

    // Add land to registry and build coordinate index
    public entry fun add_land_to_registry(
        registry: &mut LandRegistry,
        //If you need to add multiple points, call this function multiple times from the client.
        lon: String,
        lat: String,
        land_id: String,
        owner:address,
        _ctx: &mut TxContext
    ) {
        // Build coordinate string key
        let mut coordinates = b"lon: ".to_string();
        coordinates.append(lon);
        coordinates.append(b" & ".to_string());
        coordinates.append(b"lat: ".to_string());
        coordinates.append(lat);
        
        let info = LandInfo { land_id: land_id, owner };
        // Add to coordinates → LandInfo
        df::add(&mut registry.id, coordinates, info);
        // Add to land_id → coordinates
        df::add(&mut registry.land_id_index, land_id, coordinates);
        }

    // Update land registry information
    // this is a sui move edition 2024 code, convert the table here to dynamic field
      public entry fun update_land_record(
        registry: &mut LandRegistry,
        land_id: String,
        new_owner: address
    ) {
        let coordinates = df::borrow<String, String>(&registry.land_id_index, land_id);
        let mut info = df::remove<String, LandInfo>(&mut registry.id, *coordinates);
        info.owner = new_owner;
        df::add<String, LandInfo>(&mut registry.id, *coordinates, info);
    }

    /// Get the owner address for a given land_id.
    public fun get_land_owner(
        registry: &LandRegistry, 
        land_id: String
    ): &address {
        let coordinates = df::borrow<String, String>(&registry.land_id_index, land_id);
        let info = df::borrow<String, LandInfo>(&registry.id, *coordinates);
        &info.owner
    }

   public fun find_lands_by_coordinate(
        registry: &LandRegistry,
        coordinates: String
    ): vector<String> {
        // No contains, so we try to borrow and catch error (not shown here)
        let info = df::borrow<String, LandInfo>(&registry.id, coordinates);
        vector::singleton(info.land_id)
    }
}