import { useCallback, useEffect, useState } from "react";
import Command from "./command";
import { CommandConfig, CommandResult, HistoryItem } from "./utils/commands";

interface propsInterface {
  commandList: { [key: string]: CommandConfig };
  className?: string;
}

/**
 * The first console component
 * @param commandList The list of commands used by the console
 * @param className ClassName of the console component
 * @returns The first created console
 */
export default function Consolas({
  commandList,
  className = "",
}: propsInterface) {
  let [history, setHistory] = useState<HistoryItem[]>([]);

  function addToHistory(historyItem: HistoryItem) {
    setHistory((prev) => [...prev, historyItem]);
  }

  return (
    <div className={className}>
      <Command
        className="flex flex-row"
        commandList={commandList}
        addToHistory={addToHistory}
      />
      <div className="flex flex-col-reverse">
        {history.map((item, i) => (
          <div key={i}>
            <p className="font-bold">{item.command}</p>
            <p
              className={
                item.result.type === "error" ? "text-red-500" : "text-green-500"
              }
            >
              {item.result ? item.result.result : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
