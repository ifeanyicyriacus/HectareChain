module smartcontract::media_file;

use std::string::String;

public struct MediaFile has key, store {
    id: UID,
    transaction_id: UID,
    document_name: String,
    file_type: String,
    uploaded_at: u64,
}