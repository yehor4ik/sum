type Account = {
    id: string;
    sendId: string;
    currencyCode: number;
    balance: number;
    creditLimit: number;
    maskedPan: string[];
    type: string;
    iban: string;
    cashbackType?: string;
}

type Jar = {
    id: string;
    sendId: string;
    title: string;
    description: string;
    currencyCode: number;
    balance: number;
    goal: number | null;
}

export type ClientInfo = {
    clientId: string;
    name: string;
    webHookUrl: string;
    permissions: string;
    accounts: Account[];
    jars: Jar[];
}
