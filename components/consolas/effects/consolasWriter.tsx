import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

export function useWriter(
  text: string,
  minDelay: number = 50,
  maxDelay: number = 100
) {
  const [writer, setWriter] = useState(text);
  const [writen, setWriten] = useState("");
  const setWriterText = (text: string) => {
    setWriter(text);
    setWriten("");
  };
  useEffect(() => {
    let timeout: Array<NodeJS.Timeout> = [];
    let randomDelay = 0;
    for (let i = 0; i < writer.length; i++) {
      randomDelay =
        randomDelay +
        Math.floor(Math.random() * (maxDelay - minDelay) + minDelay);
      timeout.push(
        setTimeout(() => {
          setWriten((prev) => prev + writer[i]);
        }, randomDelay)
      );
    }
    return () => {
      timeout.forEach((t) => clearTimeout(t));
    };
  }, [writer]);
  return [writen, setWriterText] as const;
}

export default function ConsolasWriter(props: { [key: string]: any }) {
  let [writer, setWriter] = useWriter(props.text, 50, 200);

  useEffect(() => {
    setWriter(props.text);
  }, [props.text]);

  return (
    <p className={props.className}>
      {"> "}
      {writer}
      <b className="animate-ping">|</b>
    </p>
  );
}
