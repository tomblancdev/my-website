import { useEffect, useState } from "react";

export default function Command() {
  let [command, setCommand] = useState("");

  // @todo replace with a real command
  function keyTreatment(key: KeyboardEvent) {
    switch (key.code) {
      case "Enter":
        // @todo send command
        setCommand("");
        break;
      case "Backspace":
        setCommand(command.slice(0, -1));
        break;
      case "F5":
        break;
      default:
        setCommand(command + key.key);
    }
  }
  let handleKeyDown = (e: any) => {
    keyTreatment(e);
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [command]);

  return (
    <span className="text-white flex flex-row">
      <p className="whitespace-pre">{command}</p>
      <p className="text-white animate-ping">|</p>
    </span>
  );
}
