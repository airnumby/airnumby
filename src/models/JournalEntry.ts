import JournalEntryRecord from "./JournalEntryRecord";

export default interface JournalEntry {
    id?: string,
    description: string,
    created: Date,
    bookingDate: Date,
    records: JournalEntryRecord[],
}