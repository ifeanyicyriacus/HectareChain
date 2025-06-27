// ===== point.move =====
module smartcontract::point {
    public struct Point has copy, drop, store {
        longitude: u64,
        latitude: u64,
    }

    // Create point
    public fun create_point(longitude: u64, latitude: u64): Point {
        Point { longitude, latitude }
    }

    // Get coordinates
    public fun get_coordinates(point: &Point): (u64, u64) {
        (point.longitude, point.latitude)
    }

    // Compare points
    public fun eq(a: &Point, b: &Point): bool {
        a.longitude == b.longitude && a.latitude == b.latitude
    }
}