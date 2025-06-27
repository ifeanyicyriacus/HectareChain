module smartcontract::land_registry;
    use smartcontract::owner::{Owner};
    use smartcontract::land::{Land};
    use smartcontract::transaction::{Transaction};
    use smartcontract::point::{Point, PointLandPair};

public struct LandRegistry has key {
    id:UID,
    owner:vector<Owner>,
    lands: vector<Land>,
    transactions: vector<Transaction>,
    coordinate_index: vector<PointLandPair>,
}

// Land registry-related functions
public fun create_land_registry(ctx: &mut TxContext): LandRegistry {
    LandRegistry {
        id: object::new(ctx),
        owner: vector::empty<Owner>(),
        lands: vector::empty<Land>(),
        transactions: vector::empty<Transaction>(),
        coordinate_index: vector::empty<PointLandPair>(),
    }
}

// Add other land registry-related functions

