import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useKeyDown } from "../hooks/keyEvents";
import { CommandConfig, CommandField, StringField } from "./utils/commands";

export default function MyCommand() {
  let [command, setCommand] = useState("");
  let keyPressed = useKeyDown();
  const router = useRouter();

  let dist = {
    cd: new CommandConfig(
      { "-p": new StringField("path") },
      (params, noIdentifiersParams) => {
        if (noIdentifiersParams.length > 1) {
          throw new Error("Invalid command options : Too many options");
        } else if (
          noIdentifiersParams.length + Object.keys(params).length ===
          0
        ) {
          router.push("/");
        }
        let path =
          (params.path as string) || (noIdentifiersParams[0] as string);
        if (path) {
          router.push(path, path, { shallow: true });
        }
      }
    ),
  };

  useEffect(() => {
    if (keyPressed) {
      if ("abcdefghijklmnopqrstuvwxyz0123456789- ".includes(keyPressed.key)) {
        setCommand((prev) => prev + keyPressed?.key);
      } else if (keyPressed?.key === "Backspace") {
        setCommand((prev) => prev.slice(0, -1));
      } else if (keyPressed?.key === "Enter") {
        if (command.split(" ")[0] in dist) {
          let cmd = command.split(" ")[0] as keyof typeof dist;
          try {
            dist[cmd].execute(command.split(" ").slice(1));
          } catch (e) {
            if (e instanceof Error) {
              console.log(e.message);
            }
          }
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
