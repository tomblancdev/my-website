import { useEffect, useState } from "react";

export function useKeyDown(): KeyboardEvent | undefined {
  let [key, setKey] = useState<KeyboardEvent>();
  useEffect(() => {
    window.addEventListener("keydown", setKey);
    return () => {
      window.removeEventListener("keydown", setKey);
    };
  }, []);
  return key;
}
