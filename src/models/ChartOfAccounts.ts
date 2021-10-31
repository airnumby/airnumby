import { AccountDefinition } from "./AccountDefinition";

export interface ChartOfAccounts {
    name: string,
    id: string,
    accounts: Record<string, AccountDefinition>
}