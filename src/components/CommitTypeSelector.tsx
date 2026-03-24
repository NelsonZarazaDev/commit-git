import {
  BookOpen,
  Bug,
  Package,
  Recycle,
  Sparkle,
  Sparkles,
  TestTube,
  Undo2,
  Wrench,
  Zap,
} from "lucide-react";
import { Button } from "primereact/button";
import type { TranslationSet } from "../i18n";

type props = {
  value: string;
  onChange: (value: string) => void;
  texts: TranslationSet;
};

export default function CommitTypeSelector({ value, onChange, texts }: props) {
  const tipos = [
    {
      icon: <Sparkles />,
      color: "from-cyan-500/20 to-sky-500/10",
      border: "border-cyan-500/30",
      code: "feat",
      description: texts.commitTypes.feat,
    },
    {
      icon: <Bug />,
      color: "from-rose-500/20 to-orange-500/10",
      border: "border-rose-500/30",
      code: "fix",
      description: texts.commitTypes.fix,
    },
    {
      icon: <BookOpen />,
      color: "from-blue-500/20 to-indigo-500/10",
      border: "border-blue-500/30",
      code: "docs",
      description: texts.commitTypes.docs,
    },
    {
      icon: <Sparkle />,
      color: "from-fuchsia-500/20 to-violet-500/10",
      border: "border-fuchsia-500/30",
      code: "style",
      description: texts.commitTypes.style,
    },
    {
      icon: <Recycle />,
      color: "from-amber-500/20 to-yellow-500/10",
      border: "border-amber-500/30",
      code: "refactor",
      description: texts.commitTypes.refactor,
    },
    {
      icon: <Zap />,
      color: "from-lime-500/20 to-emerald-500/10",
      border: "border-lime-500/30",
      code: "perf",
      description: texts.commitTypes.perf,
    },
    {
      icon: <TestTube />,
      color: "from-violet-500/20 to-purple-500/10",
      border: "border-violet-500/30",
      code: "test",
      description: texts.commitTypes.test,
    },
    {
      icon: <Package />,
      color: "from-slate-500/20 to-slate-700/10",
      border: "border-slate-500/30",
      code: "build",
      description: texts.commitTypes.build,
    },
    {
      icon: <Wrench />,
      color: "from-indigo-500/20 to-cyan-500/10",
      border: "border-indigo-500/30",
      code: "ci",
      description: texts.commitTypes.ci,
    },
    {
      icon: <Wrench />,
      color: "from-pink-500/20 to-fuchsia-500/10",
      border: "border-pink-500/30",
      code: "chore",
      description: texts.commitTypes.chore,
    },
    {
      icon: <Undo2 />,
      color: "from-red-500/20 to-rose-500/10",
      border: "border-red-500/30",
      code: "revert",
      description: texts.commitTypes.revert,
    },
  ];

  return (
    <div>
      <label
        htmlFor="Type"
        className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
      >
        {texts.type}
      </label>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
        {tipos.map((tipo, index) => (
          <Button
            key={index}
            label={tipo.code}
            icon={tipo.icon}
            onClick={() => onChange(tipo.code)}
            tooltip={tipo.description}
            tooltipOptions={{
              position: "top",
              showDelay: 120,
              className: "commit-type-tooltip",
            }}
            className={`flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-[1.25rem] border bg-gradient-to-br ${tipo.color} px-3 py-2 text-sm text-slate-800 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg ${tipo.border} ${
              value === tipo.code
                ? "ring-2 ring-slate-900/70 shadow-lg shadow-slate-900/10"
                : "opacity-85 hover:opacity-100"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
