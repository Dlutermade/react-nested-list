import { useState } from "react";
import "./App.css";

type TEntry = {
  name: string;
  children?: TEntry[];
};

const files: { children: TEntry[] } = {
  children: [
    {
      name: "node_modules",
      children: [
        {
          name: "joi",
          children: [
            {
              name: "node_modules",
            },
            {
              name: "package.json",
            },
          ],
        },
      ],
    },
    {
      name: "package.json",
      children: [
        {
          name: "test",
        },
      ],
    },
    {
      name: "vite.config.ts",
    },
  ],
};

const Entry = ({ entry, depth }: { entry: TEntry; depth: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => setIsExpanded((prev) => !prev);

  return (
    <div>
      {entry.children ? (
        <button className="entry" onClick={handleToggle}>
          {isExpanded ? "-" : "+"} {entry.name}
        </button>
      ) : (
        <div> {entry.name}</div>
      )}

      {isExpanded && (
        <div style={{ paddingLeft: `${depth * 14}px` }}>
          {entry.children?.map((entry, i) => (
            <Entry entry={entry} depth={depth + 1} key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      {files.children.map((entry, i) => (
        <Entry entry={entry} depth={1} key={i} />
      ))}
    </div>
  );
}

export default App;
