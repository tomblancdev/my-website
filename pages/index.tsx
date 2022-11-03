import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Consolas from "../components/consolas/consolas";

function useConsole(
  text: string,
  minDelay: number = 50,
  maxDelay: number = 100
) {
  const [writer, setConsole] = useState("");
  useEffect(() => {
    console.log(text);
    let timeout: Array<NodeJS.Timeout> = [];
    let randomDelay = 0;
    for (let i = 0; i < text.length; i++) {
      randomDelay =
        randomDelay +
        Math.floor(Math.random() * (maxDelay - minDelay) + minDelay);
      timeout.push(
        setTimeout(() => {
          setConsole((prev) => prev + text[i]);
        }, randomDelay)
      );
    }
    return () => {
      timeout.forEach((t) => clearTimeout(t));
    };
  }, []);
  return writer;
}

export default function Home() {
  let writer = useConsole("Welcome in the next world ", 50, 300);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-white p-2">
      <h1 className="text-4xl">
        {"> "}
        {writer}
        <b className="animate-ping">|</b>
      </h1>
    </div>
  );
}
