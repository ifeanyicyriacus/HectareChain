module smartcontract::transaction;

use smartcontract::media_file::{MediaFile};

public struct Transaction has key, store{
    id: UID,
    timestamp:u64,
    from:address,
    to:address,
    land_id: UID,
    transfer_type:TransferType,
    transfer_amount_ngn_kobo: u64, // in smallest currency unit, e.g., wei for Ethereum
    documents: vector<MediaFile>,
}

public enum TransferType has store {
    Sale,
    Inheritance,
    Gift,
    Lease,
    Mortgage
}
