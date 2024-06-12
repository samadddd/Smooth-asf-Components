import { useState } from "react";
import DownloadBtn from "./components/DownloadBtn";

function App() {
  return (
    <div className="my-20">
      <h1 className="text-6xl font-black text-center text-pink-500 uppercase">
        Smooth asf components
      </h1>

      <div className="mx-auto my-10 flex h-96 max-w-[90vw] items-center justify-center bg-white">
        <DownloadBtn progress={80} />
      </div>
      <div className="flex justify-center w-full gap-3">
        <button className="p-4 bg-pink-500">{"<"}</button>
        <button className="p-4 bg-pink-500">{">"}</button>
      </div>
    </div>
  );
}

export default App;
