import { AccountDefinition } from "./AccountDefinition";

export interface ChartOfAccounts {
    name: string,
    id: string,
    accounts: Map<string, AccountDefinition>
}