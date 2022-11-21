import { useCallback, useEffect, useState } from "react";
import Command from "./command";
import { CommandResult, HistoryItem } from "./utils/commands";

export default function Consolas(props: { [key: string]: any }) {
  let [history, setHistory] = useState<HistoryItem[]>([]);

  function addToHistory(historyItem: HistoryItem) {
    setHistory((prev) => [...prev, historyItem]);
  }

  return (
    <div className={props.className}>
      <Command
        commandList={props.commandList}
        toWrite={props.toWrite}
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
