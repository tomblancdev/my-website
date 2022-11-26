import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useKeyDown } from "../hooks/keyEvents";
import {
  CommandConfig,
  CommandField,
  CommandResult,
  ErrorResult,
  HistoryItem,
  SuccessResult,
} from "./utils/commands";

/**
 * Parse, check and execute a command
 * @param command The command to execute
 * @param commandList  The list of commands used in the console
 * @returns  The result of the command
 */
export function checkCommand(
  command: string,
  commandList: { [key: string]: CommandConfig }
): CommandResult {
  let result = new ErrorResult("A problem occured while executing command");
  // if the key pressed is enter, execute the command
  if (command.split(" ")[0] in commandList) {
    // if the command is in the commandList
    // get the command
    let cmd = command.split(" ")[0] as keyof typeof commandList;
    try {
      // try to execute the command
      // get the result of the command i a temporary result variable
      let tempResult = commandList[cmd].execute(command.split(" ").slice(1));
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
  return result;
}

interface propsInterface {
  commandList: { [key: string]: CommandConfig };
  toWrite?: string;
  addToHistory?: (history: HistoryItem) => void;
  className?: string;
}

/**
 * Manage the input Command
 * @param toWrite The string to write
 * @param commandList The list of commands used by the console
 * @param addToHistory The function to add a history item to the history if not set no history return
 * @param className The class name to add
 */
export default function Command({
  toWrite = "abcdefghijklmnopqrstuvwxyzAZERTYUIOPQSDFGHJKLMWXCVBN0123456789- ",
  commandList,
  addToHistory,
  className,
}: propsInterface) {
  // setting the command state
  let [command, setCommand] = useState("");
  // listening on keydown
  let keyPressed = useKeyDown();

  useEffect(() => {
    if (keyPressed) {
      if (toWrite.includes(keyPressed.key)) {
        // if the key pressed is in the toWrite string, add it to the command
        setCommand((prev) => prev + keyPressed?.key);
      } else if (keyPressed?.key === "Backspace") {
        // if the key pressed is backspace, remove the last character of the command
        setCommand((prev) => prev.slice(0, -1));
      } else if (keyPressed?.key === "Enter") {
        // check the command and execute it if it exists
        let result = checkCommand(command, commandList);
        // add the historyItem to history if command is passed
        addToHistory && addToHistory(new HistoryItem(command, result));
        // reset the command
        setCommand("");
      }
    }
  }, [keyPressed]);

  return (
    <span className={className}>
      <p style={{ whiteSpace: "pre" }}>{command}</p>
      <p className="animate-ping">|</p>
    </span>
  );
}
