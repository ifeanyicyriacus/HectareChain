// ===== media_file.move =====
module smartcontract::media_file {
    use std::string::String;

    public struct MediaFile has key, store {
        id: UID,
        document_name: String,
        file_type: String,
        uploaded_at: u64,
    }

    

    // Create media file
    public entry fun create_media_file(
        document_name: String,
        file_type: String,
        uploaded_at: u64,
        ctx: &mut TxContext
    ) {
        let media = MediaFile {
            id: object::new(ctx),
            document_name,
            file_type,
            uploaded_at,
        };
        transfer::transfer(media, tx_context::sender(ctx));
    }

    // Get media details
    public fun get_media_details(media: &MediaFile): ( String, String, u64) {
        (
            media.document_name,
            media.file_type,
            media.uploaded_at
        )
    }
}