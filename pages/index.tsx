import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Consolas from "../components/consolas/consolas";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-white p-2">
      <h1 className="text-4xl">Welcome in the next world</h1>
    </div>
  );
}
