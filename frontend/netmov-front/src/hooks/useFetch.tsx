/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
};

export function useFetch<T>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false);

  const fetchData = async (url: string, options: FetchOptions = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: options.method || "GET",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : null,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || "Algo está errado");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { data, error, loading, fetchData };
}
