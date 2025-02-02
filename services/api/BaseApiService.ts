import axios, { type AxiosRequestConfig } from 'axios';

export class BaseApiService {
    baseUrl = ''

    private axios = axios.create({});

    protected async get<Response>(url: string, config?: AxiosRequestConfig): Promise<Response> {
        console.log('get', config);
        const response = await this.axios.get<Response>(this.baseUrl + url, config);
        return response.data;
    }
}