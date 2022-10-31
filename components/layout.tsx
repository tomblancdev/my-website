import Consolas from "./consolas/consolas";
import Navbar from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen p-0 m-0 flex flex-col justify-center items-center bg-[#001337] font-mono">
      {/* <Consolas /> */}
      <Navbar />
      {children}
    </div>
  );
}
