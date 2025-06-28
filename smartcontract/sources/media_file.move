// ===== media_file.move =====
module smartcontract::media_file {
    use std::string::String;

    public struct MediaFile has key, store {
        id: UID,
        transaction_id: ID,
        document_name: String,
        file_type: String,
        uploaded_at: u64,
    }
    
    public fun get_id(media_file: &MediaFile): &UID {
        &media_file.id
    }

    // Create media file
    public entry fun create_media_file(
        transaction_id: ID,
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
    public fun get_media_details(media: &MediaFile): (ID, String, String, u64) {
        (
            media.transaction_id,
            media.document_name,
            media.file_type,
            media.uploaded_at
        )
    }
}