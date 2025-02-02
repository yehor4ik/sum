import {BaseApiService} from "../BaseApiService";
import { useRuntimeConfig } from '#app';
import type {ClientInfo} from "./types/ClientInfo";

class MonobankApiService extends BaseApiService {
    override baseUrl = 'https://api.monobank.ua/personal'

    getClientInfo(): Promise<ClientInfo> {
        return this.get<ClientInfo>('/client-info', {
            headers: {
                "X-Token": useRuntimeConfig().public.bankAuthToken,
            },
        })
    }
}

export const monobankApiService = new MonobankApiService()