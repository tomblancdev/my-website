export default function About() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-5 select-none">
      <div className="text-white">
        <h1 className="text-4xl md:text-6xl font-bold">About me</h1>
        <div className="mt-10">
          <h1 className="text-2xl md:text-4xl">
            I'm a 17 years old french student who loves to code.
          </h1>
          <h1 className="text-2xl md:text-4xl">
            I'm currently learning web development and I'm looking for an
            internship.
          </h1>
          <h1 className="text-2xl md:text-4xl">
            I'm also interested in AI and I'm currently learning about it.
          </h1>
        </div>
      </div>
    </div>
  );
}
