import CommitTypeSelector from "./components/CommitTypeSelector";
import ScopeInput from "./components/ScopeInput";
import DescriptionInput from "./components/DescriptionInput";
import CommitPreview from "./components/CommitPreview";
import { useEffect, useState } from "react";
import BodyTextarea from "./components/BodyTextarea";
import Button from "./components/Button";
import { Code2, Github, Sparkles } from "lucide-react";
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
    <div className="relative min-h-screen overflow-hidden px-4 pb-12 pt-5 text-slate-900 md:px-7 md:pt-7 lg:px-10">
      <div className="ambient-orb ambient-orb-one" />
      <div className="ambient-orb ambient-orb-two" />

      <div className="relative mx-auto flex w-full max-w-[1180px] flex-col">
        <header className="flex justify-end">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="segmented-control">
              <span className="hidden px-2 text-slate-400 sm:inline">{texts.language}</span>
              <button
                type="button"
                onClick={() => setLanguage("es")}
                className={`rounded-full px-3 py-1.5 transition-all ${
                  language === "es"
                    ? "bg-white text-slate-950 shadow-sm ring-1 ring-black/5"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`rounded-full px-3 py-1.5 transition-all ${
                  language === "en"
                    ? "bg-white text-slate-950 shadow-sm ring-1 ring-black/5"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                EN
              </button>
            </div>
            <a
              href="https://github.com/NelsonZarazaDev/commit-git"
              target="_blank"
              rel="noreferrer"
              className="repo-button"
            >
              <Github size={14} />
              {texts.repo}
            </a>
          </div>
        </header>

        <div className="max-w-2xl pt-2">
          <div className="mb-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-600">
            <Sparkles size={13} />
            Commit with clarity
          </div>
          <h2 className="text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-slate-950 sm:text-4xl">
            {language === "es"
              ? "Commits claros. Historial impecable."
              : "Clear commits. Impeccable history."}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
            {language === "es"
              ? "Crea mensajes consistentes y listos para tu terminal en unos segundos."
              : "Create consistent, terminal-ready messages in just a few seconds."}
          </p>
        </div>

        <main className="grid w-full grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.85fr)] xl:items-start">
          <div className="space-y-5">
            <section className="premium-card p-5 sm:p-7">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.025em] text-slate-950">
                    {texts.buildCommit}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {texts.buildCommitHint}
                  </p>
                </div>
                <div className="self-start rounded-full border border-slate-200/80 bg-slate-50/80 px-3 py-1.5 text-[11px] font-medium text-slate-500">
                  {texts.currentType}:{" "}
                  <span className="font-semibold text-slate-900">
                    {commitData.type || texts.noSelection}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-y-5">
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
            </section>

            <section className="premium-card p-5 sm:p-7">
              <div className="mb-4 flex items-center gap-3">
                <div className="section-icon">
                  <Code2 size={18} />
                </div>
                <div>
                  <div className="font-semibold tracking-[-0.015em]">{texts.previewTitle}</div>
                  <div className="mt-0.5 text-xs text-slate-500">
                    {texts.previewHint}
                  </div>
                </div>
              </div>

              <CommitPreview value={commitMessage} />

              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
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
            </section>
          </div>

          <aside>
            <History texts={texts} language={language} />
          </aside>
        </main>
      </div>
    </div>
  );
}

export default App;
