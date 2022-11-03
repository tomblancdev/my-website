import { useEffect, useState } from "react";
import ConsolasWriter, {
  useWriter,
} from "../components/consolas/effects/consolasWriter";

let i = 0;
let values = [
  "Just click to begin",
  "Not really easy to use",
  "...",
  "This is a simple website I made to prensent myself",
  "So you can know me better",
  "Then",
  "...",
  "I let you discover",
  "...",
  "My Website",
];
export default function Home() {
  const [writer, setWriter] = useWriter(values[i], 50, 100);
  const [history, setHistory] = useState<string[]>([]);

  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center text-white p-2 select-none"
      onClick={() => {
        if (i < values.length) {
          setHistory((prev) => [...prev, values[i - 1]]);
          i++;
          if (i < values.length) {
            setWriter(values[i]);
          } else {
            setWriter("");
          }
        }
      }}
    >
      {history.map((h, index) => (
        <p key={index} className="text-center md:text-2xl">
          {h}
        </p>
      ))}
      {writer ? (
        <p className="text-2xl md:text-4xl text-center">
          {"> "}
          {writer}
          <b className="animate-ping">|</b>
        </p>
      ) : (
        ""
      )}
    </div>
  );
}
