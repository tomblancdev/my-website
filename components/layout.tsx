import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Consolas from "./consolas/consolas";
import {
  CommandConfig,
  HistoryItem,
  StringField,
  SuccessResult,
} from "./consolas/utils/commands";
import { useKeyDown } from "./hooks/keyEvents";
import Navbar from "./navbar";
import { addPropsToChildren } from "./utils/passProps";

export default function Layout({ children }: { children: React.ReactNode }) {
  // CONSOLAS CONFIGURATION
  // Status of the console (open or closed)
  let [consoleActive, seConsoleActive] = useState(false);
  // The history of the console (the commands executed)
  let [history, setHistory] = useState<HistoryItem[]>([]);
  // Listen to the keydown event
  let keyPressed = useKeyDown();
  // Router to navigate
  const router = useRouter();

  useEffect(() => {
    if (keyPressed?.key === "/") {
      seConsoleActive(true);
    } else if (keyPressed?.key === "Escape") {
      seConsoleActive(false);
    }
  }, [keyPressed]);

  // List of commands used by the console
  let dist = {
    // command to go to a page
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
          return new SuccessResult("Redirected to home");
        }
        let path =
          (params.path as string) || (noIdentifiersParams[0] as string);
        if (path) {
          router.push(path, path, { shallow: true });
          return new SuccessResult("Redirected to " + path);
        }
      }
    ),
  };

  return (
    <div className="w-screen h-screen p-0 m-0 flex flex-col justify-center items-center font-mono bg-gradient-to-tl from-[#001337] to-[#021e51]">
      {consoleActive && (
        <Consolas
          className="z-50 absolute w-screen h-screen p-20 bg-black bg-opacity-75 text-white"
          commandList={dist}
        />
      )}
      <Navbar />
      {addPropsToChildren(children, { consoleActive })}
    </div>
  );
}
