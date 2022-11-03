import Consolas from "./consolas/consolas";
import Canvas from "./consolas/themes/background/canvas";
import Navbar from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen p-0 m-0 flex flex-col justify-center items-center font-mono bg-[#001337]">
      {/* <Consolas /> */}
      <Navbar />
      {children}
      {/* <Canvas /> */}
    </div>
  );
}
