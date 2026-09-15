import { useState, useEffect } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let cancelado = false;
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelado) setData(json);
      } catch (err) {
        if (!cancelado) setError((err as Error).message);
      } finally {
        if (!cancelado) setLoading(false);
      }
    }
    fetchData();
    return () => {
      cancelado = true;
    };
  }, [url]);
  return { data, loading, error };
}
