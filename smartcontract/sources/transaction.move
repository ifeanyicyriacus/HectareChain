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
    use std::string::String;
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

    public enum TransferType has store {
        Sale,
        Inheritance,
        Gift,
        Lease,
        Mortgage
    }

    public enum TransactionStatus has store {
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
        transaction_type: TransferType,
        amount: u64,
        documents: vector<MediaFile>,
        ctx: &mut TxContext
    ) {
        let transaction = Transaction {
            id: object::new(ctx),
            timestamp: tx_context::epoch(ctx),
            from,
            to,
            land_id,
            transaction_type,
            amount,
            documents,
            status: Pending,
        };
        transfer::transfer(transaction, tx_context::sender(ctx));
    }

    // Update transaction status
    public entry fun update_transaction_status(
        transaction: &mut Transaction,
        new_status: String
    ) {
        transaction.status = new_status;
    }

    // Get transaction details
    public fun get_transaction_details(
        transaction: &Transaction
    ): (u64, address, address, ID, TransferType, u64, vector<MediaFile>, TransactionStatus) {
        (
            transaction.timestamp,
            transaction.from,
            transaction.to,
            transaction.land_id,
            transaction.transaction_type,
            transaction.amount,
            transaction.documents,
            transaction.status
        )
    }
}