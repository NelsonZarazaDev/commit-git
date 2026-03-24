import CommitTypeSelector from "./components/CommitTypeSelector";
import ScopeInput from "./components/ScopeInput";
import DescriptionInput from "./components/DescriptionInput";
import CommitPreview from "./components/CommitPreview";
import { useEffect, useState } from "react";
import BodyTextarea from "./components/BodyTextarea";
import Button from "./components/Button";
import { Code, Github } from "lucide-react";
import History from "./components/History";

type CommitData = {
  type: string;
  scope: string;
  description: string;
  body: string;
};

function App() {
  const [commitData, setCommitData] = useState<CommitData>({
    type: "",
    scope: "",
    description: "",
    body: "",
  });

  const updateCommit = (field: keyof CommitData, value: string) => {
    setCommitData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {}, [commitData]);

  const getCommitMessage = (data: CommitData) => {
    return `git commit -m "${data.type}${
      data.scope ? `(${data.scope})` : ""
    }: ${data.description}\n${data.body ? `${data.body}` : ""}"`;
  };

  const commitMessage = getCommitMessage(commitData);

  const clearFields = () => {
    setCommitData({
      type: "",
      scope: "",
      description: "",
      body: "",
    });
  };

  return (
    <div className="min-h-screen px-4 py-4 text-slate-100 md:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
        <div className="flex justify-end">
          <a
            href="https://github.com/NelsonZarazaDev/commit-git"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-900"
          >
            <Github size={14} />
            Repo
          </a>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)] xl:items-start">
          <div className="space-y-4">
            <div className="rounded-[1.75rem] border border-white/60 bg-white/70 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl">
              <div className="mb-4 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900">
                    Construye tu commit
                  </h2>
                  <p className="text-xs text-slate-500">
                    Completa lo esencial y deja la salida lista.
                  </p>
                </div>
                <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
                  Tipo actual:{" "}
                  <span className="font-bold text-slate-900">
                    {commitData.type || "sin seleccionar"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-y-4">
                <CommitTypeSelector
                  value={commitData.type}
                  onChange={(value) => updateCommit("type", value)}
                />
                <div className="flex w-full flex-col gap-4 md:flex-row">
                  <ScopeInput
                    value={commitData.scope}
                    onChange={(value) => updateCommit("scope", value)}
                  />
                  <DescriptionInput
                    value={commitData.description}
                    onChange={(value) => updateCommit("description", value)}
                  />
                </div>
                <BodyTextarea
                  value={commitData.body}
                  onChange={(value) => updateCommit("body", value)}
                />
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/60 bg-white/70 p-5 text-slate-900 shadow-[0_20px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-2xl bg-sky-100 p-2.5 text-sky-700">
                  <Code size={18} />
                </div>
                <div>
                  <div className="font-bold">Vista previa</div>
                  <div className="text-xs text-slate-500">
                    Revisa y copia.
                  </div>
                </div>
              </div>

              <CommitPreview value={commitMessage} />

              <div className="mt-3 flex gap-2">
                <Button
                  value={""}
                  nameButton={"Limpiar"}
                  functionality={"clear"}
                  onClear={clearFields}
                />
                <Button
                  value={commitMessage}
                  nameButton={"Copiar commit"}
                  functionality={"copy"}
                />
              </div>
            </div>
          </div>

          <div>
            <History />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
