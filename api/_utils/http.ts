import { default as nodeFetch } from 'node-fetch';
import { URLSearchParams } from 'url';
import { captureException } from './logger';

export interface FetchConfig {
    url: string;
    method: string;
    headers: { [key: string]: any };
    body: { [key: string]: any };
}

export const fetch = async <T>(config: FetchConfig) => {
    try {
        const response = await nodeFetch(config.url, {
            ...config,
            body: new URLSearchParams(config.body)
        });

        return (await response.json()) as T;
    } catch (error) {
        captureException(error);
        return undefined;
    }
};
