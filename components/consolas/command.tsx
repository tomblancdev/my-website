import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useKeyDown } from "../hooks/keyEvents";
import {
  CommandConfig,
  CommandField,
  ErrorResult,
  HistoryItem,
  SuccessResult,
} from "./utils/commands";

interface propsInterface {
  toWrite: string;
  commandList: { [key: string]: CommandConfig };
  addToHistory: (history: HistoryItem) => void;
}

export default function Command({
  toWrite,
  commandList,
  addToHistory,
}: propsInterface) {
  // setting the command state
  let [command, setCommand] = useState("");
  // listening on keydown
  let keyPressed = useKeyDown();
  // if there is a toWrite in props, set it to toWrite esle set the default one
  toWrite
    ? (toWrite = toWrite)
    : (toWrite =
        "abcdefghijklmnopqrstuvwxyzAZERTYUIOPQSDFGHJKLMWXCVBN0123456789- "); //default toWrite

  useEffect(() => {
    if (keyPressed) {
      if (toWrite.includes(keyPressed.key)) {
        // if the key pressed is in the toWrite string, add it to the command
        setCommand((prev) => prev + keyPressed?.key);
      } else if (keyPressed?.key === "Backspace") {
        // if the key pressed is backspace, remove the last character of the command
        setCommand((prev) => prev.slice(0, -1));
      } else if (keyPressed?.key === "Enter") {
        let result = new ErrorResult(
          "A problem occured while executing command"
        );
        // if the key pressed is enter, execute the command
        if (command.split(" ")[0] in commandList) {
          // if the command is in the commandList
          // get the command
          let cmd = command.split(" ")[0] as keyof typeof commandList;
          try {
            // try to execute the command
            // get the result of the command i a temporary result variable
            let tempResult = commandList[cmd].execute(
              command.split(" ").slice(1)
            );
            // if result does not exist create empty success result
            tempResult ? (result = tempResult) : (result = new SuccessResult());
          } catch (e) {
            if (e instanceof Error) {
              // if the error is an Error
              // add the result to the results with the error message
              result = new ErrorResult(e.message);
            }
          }
        } else {
          // if the command is not in the commandList
          // add a error result to the results with the error message "command not found"
          result = new ErrorResult("command not found");
        }
        // add the historyItem to history if command is passed
        addToHistory && addToHistory(new HistoryItem(command, result));
        // reset the command
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
