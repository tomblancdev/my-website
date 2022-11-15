import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useKeyDown } from "../hooks/keyEvents";

export default function Command() {
  let [command, setCommand] = useState("");
  let keyPressed = useKeyDown();
  const router = useRouter();

  useEffect(() => {
    if (keyPressed) {
      if ("abcdefghijklmnopqrstuvwxyz0123456789 ".includes(keyPressed.key)) {
        setCommand((prev) => prev + keyPressed?.key);
      } else if (keyPressed?.key === "Backspace") {
        setCommand((prev) => prev.slice(0, -1));
      } else if (keyPressed?.key === "Enter") {
        if (command.split(" ")[0] === "cd") {
          let path = "/" + (command.split(" ")[1] ? command.split(" ")[1] : "");
          router.push(path, path, { shallow: true });
        }
        setCommand("");
      }
    }
  }, [keyPressed]);

  return (
    <span className="text-white flex flex-row">
      <p className="whitespace-pre">{command}</p>
      <p className="text-white animate-ping">|</p>
    </span>
  );
}
