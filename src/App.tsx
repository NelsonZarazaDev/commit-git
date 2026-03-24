import CommitTypeSelector from "./components/CommitTypeSelector";
import ScopeInput from "./components/ScopeInput";
import DescriptionInput from "./components/DescriptionInput";
import CommitPreview from "./components/CommitPreview";
import { useEffect, useState } from "react";
import BodyTextarea from "./components/BodyTextarea";
import Button from "./components/Button";
import { Code, Github } from "lucide-react";
import History from "./components/History";
import { LANGUAGE_STORAGE_KEY, translations, type Language } from "./i18n";

type CommitData = {
  type: string;
  scope: string;
  description: string;
  body: string;
};

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return savedLanguage === "en" ? "en" : "es";
  });
  const [commitData, setCommitData] = useState<CommitData>({
    type: "",
    scope: "",
    description: "",
    body: "",
  });
  const texts = translations[language];

  const updateCommit = (field: keyof CommitData, value: string) => {
    setCommitData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

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
          <div className="flex flex-wrap items-center justify-end gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-2 py-2 text-xs font-semibold text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <span className="px-2 text-slate-500">{texts.language}</span>
              <button
                type="button"
                onClick={() => setLanguage("es")}
                className={`rounded-full px-3 py-1.5 transition ${
                  language === "es"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`rounded-full px-3 py-1.5 transition ${
                  language === "en"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                EN
              </button>
            </div>
            <a
              href="https://github.com/NelsonZarazaDev/commit-git"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-900"
            >
              <Github size={14} />
              {texts.repo}
            </a>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)] xl:items-start">
          <div className="space-y-4">
            <div className="rounded-[1.75rem] border border-white/60 bg-white/70 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl">
              <div className="mb-4 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900">
                    {texts.buildCommit}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {texts.buildCommitHint}
                  </p>
                </div>
                <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
                  {texts.currentType}:{" "}
                  <span className="font-bold text-slate-900">
                    {commitData.type || texts.noSelection}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-y-4">
                <CommitTypeSelector
                  value={commitData.type}
                  onChange={(value) => updateCommit("type", value)}
                  texts={texts}
                />
                <div className="flex w-full flex-col gap-4 md:flex-row">
                  <ScopeInput
                    value={commitData.scope}
                    onChange={(value) => updateCommit("scope", value)}
                    texts={texts}
                  />
                  <DescriptionInput
                    value={commitData.description}
                    onChange={(value) => updateCommit("description", value)}
                    texts={texts}
                  />
                </div>
                <BodyTextarea
                  value={commitData.body}
                  onChange={(value) => updateCommit("body", value)}
                  texts={texts}
                />
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/60 bg-white/70 p-5 text-slate-900 shadow-[0_20px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-2xl bg-sky-100 p-2.5 text-sky-700">
                  <Code size={18} />
                </div>
                <div>
                  <div className="font-bold">{texts.previewTitle}</div>
                  <div className="text-xs text-slate-500">
                    {texts.previewHint}
                  </div>
                </div>
              </div>

              <CommitPreview value={commitMessage} />

              <div className="mt-3 flex gap-2">
                <Button
                  value={""}
                  nameButton={texts.clear}
                  functionality={"clear"}
                  onClear={clearFields}
                  texts={texts}
                />
                <Button
                  value={commitMessage}
                  nameButton={texts.copyCommit}
                  functionality={"copy"}
                  texts={texts}
                />
              </div>
            </div>
          </div>

          <div>
            <History texts={texts} language={language} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
