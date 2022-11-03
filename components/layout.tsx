import Consolas from "./consolas/consolas";
import Navbar from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen p-0 m-0 flex flex-col justify-center items-center font-mono bg-gradient-to-tl from-[#001337] to-[#021e51]">
      {/* <Consolas /> */}
      <Navbar />
      {children}
    </div>
  );
}
