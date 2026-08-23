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
      color: "text-blue-600",
      code: "feat",
      description: texts.commitTypes.feat,
    },
    {
      icon: <Bug />,
      color: "text-rose-500",
      code: "fix",
      description: texts.commitTypes.fix,
    },
    {
      icon: <BookOpen />,
      color: "text-indigo-500",
      code: "docs",
      description: texts.commitTypes.docs,
    },
    {
      icon: <Sparkle />,
      color: "text-violet-500",
      code: "style",
      description: texts.commitTypes.style,
    },
    {
      icon: <Recycle />,
      color: "text-amber-500",
      code: "refactor",
      description: texts.commitTypes.refactor,
    },
    {
      icon: <Zap />,
      color: "text-emerald-500",
      code: "perf",
      description: texts.commitTypes.perf,
    },
    {
      icon: <TestTube />,
      color: "text-purple-500",
      code: "test",
      description: texts.commitTypes.test,
    },
    {
      icon: <Package />,
      color: "text-slate-500",
      code: "build",
      description: texts.commitTypes.build,
    },
    {
      icon: <Wrench />,
      color: "text-cyan-600",
      code: "ci",
      description: texts.commitTypes.ci,
    },
    {
      icon: <Wrench />,
      color: "text-pink-500",
      code: "chore",
      description: texts.commitTypes.chore,
    },
    {
      icon: <Undo2 />,
      color: "text-red-500",
      code: "revert",
      description: texts.commitTypes.revert,
    },
  ];

  return (
    <div>
      <label
        htmlFor="Type"
        className="field-label"
      >
        {texts.type}
      </label>
      <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
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
            className={`commit-type-button ${tipo.color} ${
              value === tipo.code
                ? "is-selected"
                : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
