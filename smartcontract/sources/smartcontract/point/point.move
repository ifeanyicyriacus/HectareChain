module smartcontract::point;
use std::string::String;

 public struct PointLandPair has store{
    point: Point,
    land_id: String,
}

public struct Point has store {
    longitude: u64,
    latitude: u64,
}
