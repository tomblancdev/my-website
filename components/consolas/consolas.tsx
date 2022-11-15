import { useCallback, useEffect, useState } from "react";
import Command from "./command";
import { useKeyDown } from "../hooks/keyEvents";
import { useRouter } from "next/router";

export default function Consolas() {
  let [consoleActive, seConsoleActive] = useState(false);
  let keyPressed = useKeyDown();
  const router = useRouter();

  useEffect(() => {
    if (keyPressed?.key === "/") {
      seConsoleActive(true);
    } else if (keyPressed?.key === "Escape") {
      seConsoleActive(false);
    }
  }, [keyPressed]);

  return (
    <div
      className={
        "z-50 absolute w-screen h-screen p-20 bg-black bg-opacity-75 " +
        (consoleActive ? "visible" : "hidden")
      }
    >
      <Command />
    </div>
  );
}
