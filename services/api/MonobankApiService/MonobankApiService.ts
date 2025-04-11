import {BaseApiService} from "../BaseApiService";
import { useRuntimeConfig } from '#app';
import type {ClientInfo} from "./types/ClientInfo";
import type {Statement} from "./types/Statement";
import type {StatementParams} from "./types/StatementParams";

class MonobankApiService extends BaseApiService {
    override baseUrl = 'https://api.monobank.ua/personal'

    getClientInfo(): Promise<ClientInfo> {
        return this.get<ClientInfo>('/client-info', {
            headers: this.getMonobankHeaders(),
        });
    }

    getStatement(params: StatementParams): Promise<Statement[]> {
        const { accountId, fromDate, toDate } = params;
        return this.get<Statement[]>(`/statement/${accountId}/${fromDate.getTime()}/${toDate.getTime()}`, {
            headers: this.getMonobankHeaders(),
        });
    }

    private getMonobankHeaders() {
        return {
            "X-Token": useRuntimeConfig().public.bankAuthToken,
        };
    }
}

export const monobankApiService = new MonobankApiService()