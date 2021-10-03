export interface JournalEntryRow {
    account: number,
    credit: number,
    debit: number,
}

export default interface JournalEntry {
    id: string,
    created: Date,
    rows: JournalEntryRow[],
}