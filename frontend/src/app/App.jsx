import "./App.css";
import { Editor } from "@monaco-editor/react";
function App() {
  return (
    <>
      <main className="h-screen w-full bg-gray-950 p-4 gap-4 flex">
        <aside className="h-full w-1/5 bg-amber-50 rounded-lg"></aside>
        <section className="h-full w-4/5 bg-neutral-600 rounded-lg overflow-hidden">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            defaultValue="// Hanji kya hal chal"
            theme="vs-dark"
          />
        </section>
      </main>
    </>
  );
}

export default App;
