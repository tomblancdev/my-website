import React, { useEffect, useRef, useState } from "react";
import { useWriter } from "../../components/consolas/hooks/consolasWriter";
import Dropdown from "../../components/inputs/dropdown";

var strReg1 = /"(.*?)"/g,
  strReg2 = /'(.*?)'/g,
  specialReg =
    /\b(new|var|if|do|function|while|switch|for|foreach|in|continue|break)(?=[^\w])/g,
  specialJsGlobReg =
    /\b(document|window|Array|String|Object|Number|\$)(?=[^\w])/g,
  specialJsReg =
    /\b(getElementsBy(TagName|ClassName|Name)|getElementById|typeof|instanceof)(?=[^\w])/g,
  specialMethReg = /\b(indexOf|match|replace|toString|length)(?=[^\w])/g,
  specialPhpReg = /\b(define|echo|print_r|var_dump)(?=[^\w])/g,
  specialCommentReg = /(\/\*.*\*\/)/g,
  inlineCommentReg = /(\/\/.*)/g;

var htmlTagReg = /(&lt;[^\&]*&gt;)/g;

var sqlReg =
  /\b(CREATE|ALL|DATABASE|TABLE|GRANT|PRIVILEGES|IDENTIFIED|FLUSH|SELECT|UPDATE|DELETE|INSERT|FROM|WHERE|ORDER|BY|GROUP|LIMIT|INNER|OUTER|AS|ON|COUNT|CASE|TO|IF|WHEN|BETWEEN|AND|OR)(?=[^\w])/g;

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
