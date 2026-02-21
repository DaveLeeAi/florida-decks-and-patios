import { useState, useCallback } from "react";

export function useAdminData<T>(key: string, defaultValue: T) {
  const [data, setData] = useState<T>(() => {
    const stored = localStorage.getItem(`admin_${key}`);
    return stored ? JSON.parse(stored) : defaultValue;
  });

  const save = useCallback((newData: T) => {
    setData(newData);
    localStorage.setItem(`admin_${key}`, JSON.stringify(newData));
  }, [key]);

  const reset = useCallback(() => {
    setData(defaultValue);
    localStorage.removeItem(`admin_${key}`);
  }, [key, defaultValue]);

  return { data, save, reset };
}
