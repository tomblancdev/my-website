import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Consolas from "../components/consolas/consolas";

function useConsole(text: string) {
  const [cnsl, setConsole] = useState("");
  useEffect(() => {
    console.log(text);
    let timeout: Array<NodeJS.Timeout> = [];
    for (let i = 0; i < text.length; i++) {
      timeout.push(
        setTimeout(() => {
          setConsole((prev) => prev + text[i]);
        }, 100 * i)
      );
    }
    return () => {
      timeout.forEach((t) => clearTimeout(t));
    };
  }, []);
  return cnsl;
}

export default function Home() {
  let cnsl = useConsole("Welcome in the next world");

  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-white p-2">
      <h1 className="text-4xl">
        {"> "}
        {cnsl} <b className="animate-ping"> |</b>
      </h1>
    </div>
  );
}
