import axios, { AxiosRequestConfig } from "axios";
import { HttpError } from "../errors/http-error";

const DEFAULT_TIMEOUT = 10000;

export const fetcher = {
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await axios.get<T>(url, {
                timeout: DEFAULT_TIMEOUT,
                headers: {
                    "User-Agent": "VersionHub",
                    Accept: "application/json",
                },
                ...config,
            });

            return response.data;

        } catch (err: any) {
            throw new HttpError(
                err.response?.status || 500,
                err.response?.data?.message || "Erro ao fazer requisição GET",
                err.response?.data
            );
        }
    },

    async post<T>(url: string, body: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await axios.post<T>(url, body, {
                timeout: DEFAULT_TIMEOUT,
                headers: {
                    "User-Agent": "VersionHub",
                    Accept: "application/json",
                },
                ...config,
            });

            return response.data;

        } catch (err: any) {
            throw new HttpError(
                err.response?.status || 500,
                err.response?.data?.message || "Erro ao fazer requisição POST",
                err.response?.data
            );
        }
    },
};