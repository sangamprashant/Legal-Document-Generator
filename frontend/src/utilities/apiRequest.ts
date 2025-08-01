import { server } from ".";

// utils/apiRequest.ts
type Method = "GET" | "POST" | "PUT" | "DELETE";

interface ApiRequestOptions {
  method: Method;
  url: string;
  data?: any;
  token?: string;
  headers?: Record<string, string>;
}

export async function apiRequest<T = any>({
  method,
  url,
  data,
  token,
  headers = {},
}: ApiRequestOptions): Promise<T> {
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${server}${url}`, {
    method,
    headers: defaultHeaders,
    body: method !== "GET" ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "API request failed");
  }

  return await response.json();
}
