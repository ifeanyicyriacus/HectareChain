// This file defines the transaction module for handling land transactions in the Sui blockchain.
//             land.area_in_sqm,
//             land.ownership_history
//         )
//     }
// }
// This module defines the Transaction structure and related functions
// for managing transactions in a smart contract.
// It includes transaction creation, status updates, and retrieval of transaction details.
// It also includes the TransferType and TransactionStatus enums to categorize transactions.
// The Transaction module is designed to work with the Land and Owner modules,
// allowing for the transfer of land ownership and management of transaction records.
// It uses the MediaFile module to handle any documents associated with transactions.

// The module is structured to ensure that all transactions are securely recorded and can be audited.
module smartcontract::transaction {
    use smartcontract::media_file::MediaFile;

    public struct Transaction has key, store {
        id: UID,
        timestamp: u64,
        from: address,
        to: address,
        land_id: ID,  // ID of Land object
        transaction_type: TransferType,
        amount: u64,
        documents: vector<MediaFile>,
        status: TransactionStatus,
    }

    public fun get_transaction_id(transaction: &mut Transaction):&UID{
        &transaction.id
    }

    public enum TransferType has copy, drop, store {
        Sale,
        Inheritance,
        Gift,
        Lease,
        Mortgage
    }

    public enum TransactionStatus has copy, drop, store {
        Pending,
        Completed,
        Rejected,
        Cancelled
    }

    // Create new transaction
    public entry fun create_transaction(
        from: address,
        to: address,
        land_id: ID,
        transaction_type: u8,
        amount: u64,
        documents: vector<MediaFile>,
        ctx: &mut TxContext
    ) {
        let ttype = if (transaction_type == 0) {
            TransferType::Sale
        } else if (transaction_type == 1) {
            TransferType::Inheritance
        } else if (transaction_type == 2) {
            TransferType::Gift
        } else if (transaction_type == 3) {
            TransferType::Lease
        } else if (transaction_type == 4) {
            TransferType::Mortgage
        } else {
            TransferType::Sale
        };

        let transaction = Transaction {
            id: object::new(ctx),
            timestamp: tx_context::epoch(ctx),
            from,
            to,
            land_id,
            transaction_type: ttype,
            amount,
            documents,
            status: TransactionStatus::Pending,
        };

        transfer::transfer(transaction, tx_context::sender(ctx));
    }

    // Update transaction status
    public entry fun update_transaction_status(
        transaction: &mut Transaction,
        transaction_status: u8
    ) {
        let status = if (transaction_status == 0) {
            TransactionStatus::Pending
        } else if (transaction_status == 1) {
            TransactionStatus::Completed
        } else if (transaction_status == 2) {
            TransactionStatus::Rejected
        } else if (transaction_status == 0) {
            TransactionStatus::Cancelled
        } else { TransactionStatus::Pending
        };
        transaction.status = status;
    }

    // Get transaction details
    public fun get_transaction_details(
        transaction: &Transaction
    ): (u64, address, address, ID, TransferType, u64, TransactionStatus) {
        (
            transaction.timestamp,
            transaction.from,
            transaction.to,
            transaction.land_id,
            transaction.transaction_type,
            transaction.amount,
            transaction.status
        )
    }

    //Option 1: Return a reference to the vector
    public fun get_transaction_documents(transaction: &Transaction): &vector<MediaFile> {
    &transaction.documents}

    //Option 2: Return only the count or IDs
    public fun get_transaction_document_count(transaction: &Transaction): u64 {
    vector::length(&transaction.documents)}

    public fun get_transaction_document_uids(transaction: &Transaction): &vector<MediaFile> {
    &transaction.documents
    }
}