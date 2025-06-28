module hectarechain::land_registry {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use std::string::{Self, String};
    use std::vector;

    // Error codes
    const E_NOT_AUTHORIZED: u64 = 1;
    const E_PROPERTY_NOT_FOUND: u64 = 2;
    const E_INVALID_STATUS: u64 = 3;
    const E_ALREADY_FRACTIONALIZED: u64 = 4;

    // Property status constants
    const STATUS_REGISTERED: u8 = 0;
    const STATUS_UNDER_VERIFICATION: u8 = 1;
    const STATUS_VERIFIED: u8 = 2;
    const STATUS_UNDER_DISPUTE: u8 = 3;
    const STATUS_MORTGAGED: u8 = 4;
    const STATUS_GOVERNMENT_ACQUIRED: u8 = 5;
    const STATUS_FRACTIONALIZED: u8 = 6;

    // Main land parcel struct
    struct LandParcel has key, store {
        id: UID,
        land_id_internal: String,
        address: String,
        coordinates: String, // JSON string of polygon coordinates
        size: String,
        current_owner: address,
        status: u8,
        registration_date: u64,
        last_modified_date: u64,
        deed_walrus_cid: String,
        survey_walrus_cid: String,
        other_docs_cids: vector<String>,
        images_cids: vector<String>,
        features: vector<String>,
        lga: String,
        estimated_value: u64,
    }

    // Fractional ownership token
    struct HectareShare has key, store {
        id: UID,
        property_id: address,
        total_shares: u64,
        share_value: u64,
    }

    // Admin capability
    struct AdminCap has key {
        id: UID,
    }

    // Registry for tracking all properties
    struct LandRegistry has key {
        id: UID,
        total_properties: u64,
        admin: address,
    }

    // Events
    struct PropertyRegistered has copy, drop {
        property_id: address,
        land_id_internal: String,
        owner: address,
        registration_date: u64,
    }

    struct PropertyVerified has copy, drop {
        property_id: address,
        verified_by: address,
        verification_date: u64,
    }

    struct OwnershipTransferred has copy, drop {
        property_id: address,
        from: address,
        to: address,
        transfer_date: u64,
    }

    struct PropertyFractionalized has copy, drop {
        property_id: address,
        total_shares: u64,
        token_id: address,
    }

    // Initialize the registry
    fun init(ctx: &mut TxContext) {
        let admin_cap = AdminCap {
            id: object::new(ctx),
        };

        let registry = LandRegistry {
            id: object::new(ctx),
            total_properties: 0,
            admin: tx_context::sender(ctx),
        };

        transfer::transfer(admin_cap, tx_context::sender(ctx));
        transfer::share_object(registry);
    }

    // Register a new land parcel
    public entry fun register_land_parcel(
        _admin_cap: &AdminCap,
        registry: &mut LandRegistry,
        land_id_internal: String,
        address: String,
        coordinates: String,
        size: String,
        owner: address,
        deed_cid: String,
        survey_cid: String,
        features: vector<String>,
        lga: String,
        estimated_value: u64,
        ctx: &mut TxContext
    ) {
        let property = LandParcel {
            id: object::new(ctx),
            land_id_internal,
            address,
            coordinates,
            size,
            current_owner: owner,
            status: STATUS_REGISTERED,
            registration_date: tx_context::epoch(ctx),
            last_modified_date: tx_context::epoch(ctx),
            deed_walrus_cid: deed_cid,
            survey_walrus_cid: survey_cid,
            other_docs_cids: vector::empty(),
            images_cids: vector::empty(),
            features,
            lga,
            estimated_value,
        };

        let property_id = object::uid_to_address(&property.id);
        
        // Emit event
        sui::event::emit(PropertyRegistered {
            property_id,
            land_id_internal: property.land_id_internal,
            owner,
            registration_date: property.registration_date,
        });

        registry.total_properties = registry.total_properties + 1;
        transfer::transfer(property, owner);
    }

    // Set property status to verified
    public entry fun set_property_status_verified(
        _admin_cap: &AdminCap,
        property: &mut LandParcel,
        verification_cid: String,
        ctx: &mut TxContext
    ) {
        property.status = STATUS_VERIFIED;
        property.last_modified_date = tx_context::epoch(ctx);
        vector::push_back(&mut property.other_docs_cids, verification_cid);

        // Emit event
        sui::event::emit(PropertyVerified {
            property_id: object::uid_to_address(&property.id),
            verified_by: tx_context::sender(ctx),
            verification_date: tx_context::epoch(ctx),
        });
    }

    // Transfer ownership
    public entry fun transfer_ownership(
        property: &mut LandParcel,
        new_owner: address,
        ctx: &mut TxContext
    ) {
        let old_owner = property.current_owner;
        assert!(tx_context::sender(ctx) == old_owner, E_NOT_AUTHORIZED);

        property.current_owner = new_owner;
        property.last_modified_date = tx_context::epoch(ctx);

        // Emit event
        sui::event::emit(OwnershipTransferred {
            property_id: object::uid_to_address(&property.id),
            from: old_owner,
            to: new_owner,
            transfer_date: tx_context::epoch(ctx),
        });
    }

    // Fractionalize land parcel
    public entry fun fractionalize_land_parcel(
        _admin_cap: &AdminCap,
        property: &mut LandParcel,
        total_shares: u64,
        ctx: &mut TxContext
    ) {
        assert!(property.status == STATUS_VERIFIED, E_INVALID_STATUS);
        assert!(property.status != STATUS_FRACTIONALIZED, E_ALREADY_FRACTIONALIZED);

        property.status = STATUS_FRACTIONALIZED;
        property.last_modified_date = tx_context::epoch(ctx);

        let share_token = HectareShare {
            id: object::new(ctx),
            property_id: object::uid_to_address(&property.id),
            total_shares,
            share_value: property.estimated_value / total_shares,
        };

        let token_id = object::uid_to_address(&share_token.id);

        // Emit event
        sui::event::emit(PropertyFractionalized {
            property_id: object::uid_to_address(&property.id),
            total_shares,
            token_id,
        });

        transfer::transfer(share_token, property.current_owner);
    }

    // Getter functions
    public fun get_property_status(property: &LandParcel): u8 {
        property.status
    }

    public fun get_property_owner(property: &LandParcel): address {
        property.current_owner
    }

    public fun get_property_value(property: &LandParcel): u64 {
        property.estimated_value
    }
}
