import { useEffect, useState } from "react";
import ConsolasWriter, {
  useWriter,
} from "../components/consolas/hooks/consolasWriter";
import { useKeyDown } from "../components/hooks/keyEvents";

// Creatign variable to look for the right text to write
let i = 0;
// Creating the text to write row by row
let values = [
  "Just click to begin",
  "Not really easy to use",
  "...",
  "This is a simple website I made to introduce myself",
  "So you can know me better",
  "Then",
  "...",
  "I let you discover",
  "...",
  "My Website",
];

/**
 *
 * @returns The Layout menu
 */
function LayoutMenu() {
  let [transition, setTransition] = useState("opacity-0 scale-0");

  let pages = [
    { name: "About me", url: "/about" },
    { name: "How does this website works", url: "/website_tuto" },
    { name: "My Projects", url: "/projects" },
  ];

  useEffect(() => {
    let timeout = setTimeout(() => {
      setTransition("opacity-100 scale-100");
    }, 1);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      className={
        "max-md:absolute max-md:bg-neutral-700/90 md:h-1/3 rounded-2xl w-screen grid grid-cols-1 grid-rows-1 md:grid-cols-3 md:grid-rows-1 gap-8 p-20 transition duration-1000 " +
        transition
      }
    >
      {pages.map((page, key) => {
        return (
          <a
            href={page.url}
            key={key}
            className={
              "h-full w-full bg-white opacity-60 rounded-2xl flex flex-col justify-center items-center  transition hover:opacity-75 hover:scale-105 focus:opacity-75 scale-95 focus:scale-105"
            }
          >
            <h1 className="text-2xl md:text-4xl text-center p-5">
              {page.name}
            </h1>
          </a>
        );
      })}
    </div>
  );
}

export default function Home(props: { [key: string]: any }) {
  // Text to write using the consolaswriting effect
  const [writer, setWriter] = useWriter(values[i], 50, 100);
  // State to store the history of text
  const [history, setHistory] = useState<string[]>([]);

  let keyPressed = useKeyDown();

  useEffect(() => {
    if (!props.consoleActive) {
      if (keyPressed?.key === "Enter") {
        if (i < values.length - 1) {
          setHistory((prev) => [...prev, values[i - 1]]);
          i++;
          if (i < values.length) {
            setWriter(values[i]);
          }
        }
      }
    }
  }, [keyPressed]);

  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center p-2 select-none"
      onClick={() => {
        if (i < values.length - 1) {
          setHistory((prev) => [...prev, values[i - 1]]);
          i++;
          if (i < values.length) {
            setWriter(values[i]);
          }
        }
      }}
    >
      <div className="text-white">
        {history.map((h, index) => (
          <p key={index} className="text-center md:text-2xl">
            {h}
          </p>
        ))}
        {writer && (
          <p className="text-2xl md:text-4xl text-center">
            {"> "}
            {writer}
            <b className="animate-ping">|</b>
          </p>
        )}
      </div>
      {i == values.length - 1 && <LayoutMenu />}
    </div>
  );
}
