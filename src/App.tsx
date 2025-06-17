import CommitTypeSelector from "./components/CommitTypeSelector";
import ScopeInput from "./components/ScopeInput";
import DescriptionInput from "./components/DescriptionInput";
import FooterOptions from "./components/FooterOptions";
import CommitPreview from "./components/CommitPreview";
import { useEffect, useState } from "react";
import BodyTextarea from "./components/BodyTextarea";
import Button from "./components/Button";
import { ConfirmDialog } from "primereact/confirmdialog";

type CommitData = {
  type: { code: string };
  scope: string;
  description: string;
  body: string;
  footer: string;
};

function App() {
  const [commitData, setCommitData] = useState<CommitData>({
    type: { code: "" },
    scope: "",
    description: "",
    body: "",
    footer: "",
  });

  const updateCommit = (field: keyof CommitData, value: string) => {
    setCommitData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {}, [commitData]);

  const getCommitMessage = (data: CommitData) => {
    return `git commit -m "${data.type.code}${
      data.scope ? `(${data.scope})` : ""
    }: ${data.description}\n${data.body ? `${data.body}` : ""}${
      data.footer ? `\nBREAKING CHANGE: ${data.footer}` : ""
    }"`;
  };

  const commitMessage = getCommitMessage(commitData);

  const clearFields = () => {
    setCommitData({
      type: { code: "" },
      scope: "",
      description: "",
      body: "",
      footer: "",
    });
  };

  return (
    <>
      <ConfirmDialog />
      <h1 className="text-center font-bold text-5xl pt-6">Commit git</h1>

      <div className="w-full p-4 md:px-10">
        <div className="w-full flex flex-col gap-y-2 backdrop-blur-md bg-white/10 border border-white/30 rounded-xl shadow-lg p-6 text-white">
          <CommitTypeSelector
            value={commitData.type}
            onChange={(value) => updateCommit("type", value)}
          />
          <ScopeInput
            value={commitData.scope}
            onChange={(value) => updateCommit("scope", value)}
          />
          <DescriptionInput
            value={commitData.description}
            onChange={(value) => updateCommit("description", value)}
          />
          <BodyTextarea
            value={commitData.body}
            onChange={(value) => updateCommit("body", value)}
          />
          <FooterOptions
            value={commitData.footer}
            onChange={(value) => updateCommit("footer", value)}
          />

          <CommitPreview value={commitMessage} />
          <div className="flex justify-between">
            <Button
              value={""}
              nameButton={"Clear"}
              functionality={"clear"}
              onClear={clearFields}
            />
            <Button
              value={commitMessage}
              nameButton={"Copy"}
              functionality={"copy"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
