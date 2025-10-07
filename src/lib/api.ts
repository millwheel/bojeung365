import apiClient from "./apiClient";

export async function get<T>(url: string, config?: object): Promise<T> {
    const { data } = await apiClient.get<T>(url, config);
    return data;
}

export async function post<T>(url: string, body?: object): Promise<T> {
    const { data } = await apiClient.post<T>(url, body);
    return data;
}

export async function put<T>(url: string, body?: object): Promise<T> {
    const { data } = await apiClient.put<T>(url, body);
    return data;
}

export async function del<T>(url: string): Promise<T> {
    const { data } = await apiClient.delete<T>(url);
    return data;
}