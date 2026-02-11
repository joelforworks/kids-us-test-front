import ApiClient from "./apiClient";

type QueryParams = Record<string, string | number | boolean | undefined>;

interface GetOptions {
  endpoint?: string;
  params?: QueryParams;
  headers?: HeadersInit;
}

interface WriteOptions {
  endpoint?: string;
  body: unknown;
  headers?: HeadersInit;
}

export class ExpenseApiClient extends ApiClient {
  constructor() {
    super("/expenses");
  }

  get<T>({
    endpoint = "/",
    params = {},
    headers = {},
  }: GetOptions): Promise<T> {
    const queryString = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined) as [
        string,
        string,
      ][]
    ).toString();

    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    return this.request<T>(url, "GET", null, headers);
  }

  post<T>({
    endpoint = "/",
    body,
    headers = {},
  }: WriteOptions): Promise<T> {
    return this.request<T>(endpoint, "POST", body, headers);
  }

  put<T>({
    endpoint = "/",
    body,
    headers = {},
  }: WriteOptions): Promise<T> {
    return this.request<T>(endpoint, "PUT", body, headers);
  }
}
