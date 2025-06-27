// This module defines a land registry smart contract that allows for the
// ===== land_registry.move =====
module smartcontract::land_registry {
    // use sui::dynamic_field as df;
    use smartcontract::point::{Point};
    use std::string::String;
    use sui::dynamic_field::{DynamicField, add, borrow, contains, remove};

    public struct LandRegistry has key {
        id: UID,
        coordinate_index: DynamicField<Point, String>,
        land_records: DynamicField<String, address>,    }

    // Initialize land registry
    public entry fun create_land_registry(ctx: &mut TxContext) {
        let registry = LandRegistry {
            id: object::new(ctx),
            coordinate_index: df::table::new(ctx),
            land_records: df::table::new(ctx),
        };
        transfer::share_object(registry);
    }

    // Add land to registry and build coordinate index
    public entry fun add_land_to_registry(
        registry: &mut LandRegistry,
        land_id: String,
        coordinates: vector<Point>,
        owner: address,
        ctx: &mut TxContext
    ) {
        // Add to land records
        df::table::add(&mut registry.land_records, land_id, owner);
        
        // Add to coordinate index
        let mut i = 0;
        while (i < vector::length(&coordinates)) {
            let point = *vector::borrow(&coordinates, i);
            // df::table::add(&mut registry.coordinate_index, point, object::id_from_address(owner));
            df::table::add(&mut registry.coordinate_index, point, land_id);
            i = i + 1;
        };
    }

    // Update land registry information
    public entry fun update_land_record(
        registry: &mut LandRegistry,
        land_id: String,
        new_owner: address
    ) {
        if (df::table::contains(&registry.land_records, land_id)) {
            let record = df::table::borrow_mut(&mut registry.land_records, land_id);
            *record = new_owner;
        };
    }

    // Get land owner by land_id
    public fun get_land_owner(registry: &LandRegistry, land_id: String): &address {
        df::table::borrow(&registry.land_records, land_id)
    }

    // Find lands by coordinate point
    public fun find_lands_by_coordinate(
        registry: &LandRegistry,
        point: Point
    ): vector<String> {
        if (df::table::contains(&registry.coordinate_index, point)) {
            let land_id = df::table::borrow(&registry.coordinate_index, point);
            vector::singleton(land_id)
        } else {
            vector::empty()
        }
    }
}