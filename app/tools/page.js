export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h1 className="text-3xl font-bold text-white mb-4">Welcome to Tools</h1>
      <p className="text-zinc-400 text-lg max-w-md">
        Select a tool from the sidebar to get started.
      </p>
    </div>
  );
}