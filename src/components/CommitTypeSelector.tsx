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

type props = {
  onChange: (value: string) => void;
};

export default function CommitTypeSelector({ onChange }: props) {
  const tipos = [
    {
      icon: <Sparkles />,
      color: "bg-[#30495B]/70",
      border: "border-[#30495B]",
      code: "feat",
    },
    {
      icon: <Bug />,
      color: "bg-[#642859]/80",
      border: "border-[#642859]",
      code: "fix",
    },
    {
      icon: <BookOpen />,
      color: "bg-[#314E88]/80",
      border: "border-[#314E88]",
      code: "docs",
    },
    {
      icon: <Sparkle />,
      color: "bg-[#613188]/80",
      border: "border-[#613188]",
      code: "style",
    },
    {
      icon: <Recycle />,
      color: "bg-[#723F5F]/80",
      border: "border-[#723F5F]",
      code: "refactor",
    },
    {
      icon: <Zap />,
      color: "bg-[#723F5F]/80",
      border: "border-[#723F5F]",
      code: "perf",
    },
    {
      icon: <TestTube />,
      color: "bg-[#3F3B7F]/80",
      border: "border-[#3F3B7F]",
      code: "test",
    },
    {
      icon: <Package />,
      color: "bg-[#483B69]/80",
      border: "border-[#483B69]",
      code: "build",
    },
    {
      icon: <Wrench />,
      color: "bg-[#3C477C]/80",
      border: "border-[#3C477C]",
      code: "ci",
    },
    {
      icon: <Wrench />,
      color: "bg-[#5D3291]/80",
      border: "border-[#5D3291]",
      code: "chore",
    },
    {
      icon: <Undo2 />,
      color: "bg-[#753164]/80",
      border: "border-[#753164]",
      code: "revert",
    },
  ];

  return (
    <div>
      <label htmlFor="Type" className="font-bold hover:text-indigo-300">
        Tipo
      </label>
      <div className="grid grid-cols-6 gap-4 mt-2">
        {tipos.map((tipo, index) => (
          <Button
            key={index}
            label={tipo.code}
            icon={tipo.icon}
            onClick={() => onChange(tipo.code)}
            className={`${tipo.color} border-4 ${tipo.border} flex flex-col items-center p-2 rounded-2xl cursor-pointer`}
          />
        ))}
      </div>
    </div>
  );
}
