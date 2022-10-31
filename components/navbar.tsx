import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  return (
    <div className="text-white p-2 flex flex-row w-full">
      <button className="relative animate-pulse">
        <ChevronRightIcon className="h-full" />
      </button>
      <a href="/" className="w-full text-left">
        <h1 className="text-3xl">My Website</h1>
      </a>
    </div>
  );
}
