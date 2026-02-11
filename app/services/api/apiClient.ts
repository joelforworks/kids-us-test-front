const BASE_URL = "http://localhost:4000"

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type QueryParams = Record<string, string | number | boolean | undefined>;

export interface GetOptions {
  endpoint?: string;
  params?: QueryParams;
  headers?: HeadersInit;
}

export interface WriteOptions {
  endpoint?: string;
  body: unknown;
  headers?: HeadersInit;
}

export default abstract class ApiClient {
  protected baseURL: string;

  protected constructor(routeRoot: string = "") {
    if (!BASE_URL) {
      throw new Error(
        "URL is not defined. Check your .env file.",
      );
    }

    this.baseURL = `${BASE_URL}${routeRoot}`;
  }

  protected async request<T>(
    endpoint: string,
    method: HttpMethod = "GET",
    body: unknown = null,
    headers: HeadersInit = {},
    query: QueryParams = {},
  ): Promise<T> {
    const config: RequestInit = {
      method,
      headers: {
        ...headers,
      },
    };

    const isFormData = body instanceof FormData;

    if (body) {
      if (isFormData) {
        config.body = body;
      } else {
        (config.headers as Record<string, string>)["Content-Type"] =
          "application/json";
        config.body = JSON.stringify(body);
      }
    }

    const queryString = new URLSearchParams(
      Object.entries(query).filter(([, v]) => v !== undefined) as [
        string,
        string,
      ][],
    ).toString();

    const url = `${this.baseURL}${endpoint}${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ?? `API request failed with status ${response.status}`,
      );
    }

    return response.json() as Promise<T>;
  }

  abstract get<T>(options: GetOptions): Promise<T>;
  abstract post<T>(options: WriteOptions): Promise<T>;
  abstract put<T>(options: WriteOptions): Promise<T>;
}
