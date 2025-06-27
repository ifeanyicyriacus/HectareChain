// ===== media_file.move =====
module smartcontract::media_file {
    use std::string::String;

    public struct MediaFile has key, store {
        id: UID,
        transaction_id: UID,
        document_name: String,
        file_type: String,
        uploaded_at: u64,
    }

    // Create media file
    public entry fun create_media_file(
        transaction_id: UID,
        document_name: String,
        file_type: String,
        uploaded_at: u64,
        ctx: &mut TxContext
    ) {
        let media = MediaFile {
            id: object::new(ctx),
            transaction_id,
            document_name,
            file_type,
            uploaded_at,
        };
        transfer::transfer(media, tx_context::sender(ctx));
    }

    // Get media details
    public fun get_media_details(media: &MediaFile): (UID, String, String, u64) {
        (
            media.transaction_id,
            media.document_name,
            media.file_type,
            media.uploaded_at
        )
    }
}