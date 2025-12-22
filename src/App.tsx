import CommitTypeSelector from "./components/CommitTypeSelector";
import ScopeInput from "./components/ScopeInput";
import DescriptionInput from "./components/DescriptionInput";
import CommitPreview from "./components/CommitPreview";
import { useEffect, useState } from "react";
import BodyTextarea from "./components/BodyTextarea";
import Button from "./components/Button";
import { Code, GitBranch } from "lucide-react";
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
    <div className="px-4 py-3">
      <div className="flex gap-2">
        <div className="p-4 bg-[#E640B2] rounded-2xl">
          <GitBranch size={28} />
        </div>
        <div>
          <h1 className="text-xl font-bold">Generador de Commits Git</h1>
          <h2>Conventional Commits</h2>
        </div>
      </div>
      <hr className="mt-2 text-[#401372cc]" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 py-4 ">
        <div className="lg:col-span-2">
          <div className="w-full flex flex-col gap-y-2 backdrop-blur-md bg-white/10 border border-white/30 rounded-xl shadow-lg p-6 text-white">
            <CommitTypeSelector
              value={commitData.type}
              onChange={(value) => updateCommit("type", value)}
            />
            <div className="flex w-full gap-4">
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
          <div className="backdrop-blur-md bg-white/10 border border-white/30 rounded-xl shadow-lg p-6 text-white mt-4 space-y-2">
            <div className="flex gap-2 font-bold">
              <Code />
              Vista Previa
            </div>
            <CommitPreview value={commitMessage} />
            <div className="flex gap-2">
              <Button
                value={""}
                nameButton={"Limpiar"}
                functionality={"clear"}
                onClear={clearFields}
              />
              <Button
                value={commitMessage}
                nameButton={"Copiar"}
                functionality={"copy"}
              />
            </div>
          </div>
        </div>

        <History/>
      </div>
    </div>
  );
}

export default App;
