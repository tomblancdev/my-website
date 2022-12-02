import React, { useEffect, useRef, useState } from "react";
import { useWriter } from "../../components/consolas/hooks/consolasWriter";
import Dropdown from "../../components/inputs/dropdown";

export default function Inputs() {
  let [selected, setSelected] = useState(1);
  let [writer, setWriter] = useWriter("", 1, 5);

  useEffect(() => {
    fetch("/api/readFile", {
      method: "POST",
      body: JSON.stringify({ path: "components/inputs/dropdown.tsx" }),
    })
      .then((res) => res.json())
      .then((data) => {
        setWriter(data?.content);
      });
  }, []);
  return (
    <div className="h-full w-full flex flex-row items-center justify-between select-none p-10">
      <div className="flex flex-col items-center justify-start bg-neutral-800/50 rounded-3xl p-5 h-full flex-wrap">
        <code className="w-full h-full text-xs overflow-scroll text-white p-5 ">
          <pre>{writer}</pre>
        </code>
      </div>
      <div className="flex flex-col justify-center items-center min-w-1/3 flex-grow">
        <div>
          <h1 className="text-white text-2xl">Dropdown component</h1>
          <hr className="border-2 m-2" />
          <Dropdown
            className="bg-white w-full rounded-md"
            selected={selected}
            setSelected={setSelected}
          >
            <p key={0}>test</p>
            <p key={1}>test2</p>
            <p key={2}>test3</p>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
