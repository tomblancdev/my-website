import { useEffect, useState } from "react";

/**
 * React hook to use the writer effect
 * @param text The text to write
 * @param minDelay Minimum delay between each character
 * @param maxDelay Maximum delay between each character
 * @returns The writer state and the function to set the text to write
 */
export function useWriter(
  text: string,
  minDelay: number = 50,
  maxDelay: number = 100
) {
  // The writer as text to write
  const [writer, setWriter] = useState(text);
  // The writen state of the writer
  const [writen, setWriten] = useState("");
  // Function to change the text to write
  const setWriterText = (text: string) => {
    // Setting the text to write
    setWriter(text);
    // Setting the writen state to empty
    setWriten("");
  };
  // Generating the rendering effect
  useEffect(() => {
    // Creating emptin array of timeout to cleanup in case of unmounting of the state
    let timeout: Array<NodeJS.Timeout> = [];
    // Initiating a random delay to 0
    let randomDelay = 0;
    // For each character of the text to write
    for (let i = 0; i < writer.length; i++) {
      // Generating a random delay between the min and max delay and add it to the previous charater's delay
      randomDelay =
        randomDelay +
        Math.floor(Math.random() * (maxDelay - minDelay) + minDelay);
      // Pushing a timeout to the timeout array
      timeout.push(
        setTimeout(() => {
          setWriten((prev) => prev + writer[i]);
        }, randomDelay)
      );
    }
    return () => {
      // Cleaning up the timeout array on unmounting
      timeout.forEach((t) => clearTimeout(t));
    };
  }, [writer]);
  return [writen, setWriterText] as const;
}

/**
 * ConsolasWriter component
 * @param props The props of the component
 * @returns The component
 */
export default function ConsolasWriter(props: { [key: string]: any }) {
  let [writer, setWriter] = useWriter(props.text, 50, 200);

  // effect to reload the component when the text change
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
