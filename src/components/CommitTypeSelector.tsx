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
  value: string;
  onChange: (value: string) => void;
};

export default function CommitTypeSelector({ value, onChange }: props) {
  const tipos = [
    {
      icon: <Sparkles />,
      color: "from-cyan-500/20 to-sky-500/10",
      border: "border-cyan-500/30",
      code: "feat",
      description: "Usalo cuando agregas una funcionalidad nueva.",
    },
    {
      icon: <Bug />,
      color: "from-rose-500/20 to-orange-500/10",
      border: "border-rose-500/30",
      code: "fix",
      description: "Usalo para corregir errores o comportamientos rotos.",
    },
    {
      icon: <BookOpen />,
      color: "from-blue-500/20 to-indigo-500/10",
      border: "border-blue-500/30",
      code: "docs",
      description: "Usalo para cambios en documentacion.",
    },
    {
      icon: <Sparkle />,
      color: "from-fuchsia-500/20 to-violet-500/10",
      border: "border-fuchsia-500/30",
      code: "style",
      description: "Usalo para estilos o formato sin cambiar logica.",
    },
    {
      icon: <Recycle />,
      color: "from-amber-500/20 to-yellow-500/10",
      border: "border-amber-500/30",
      code: "refactor",
      description: "Usalo cuando reorganizas codigo sin cambiar comportamiento.",
    },
    {
      icon: <Zap />,
      color: "from-lime-500/20 to-emerald-500/10",
      border: "border-lime-500/30",
      code: "perf",
      description: "Usalo para mejoras de rendimiento.",
    },
    {
      icon: <TestTube />,
      color: "from-violet-500/20 to-purple-500/10",
      border: "border-violet-500/30",
      code: "test",
      description: "Usalo para agregar o ajustar pruebas.",
    },
    {
      icon: <Package />,
      color: "from-slate-500/20 to-slate-700/10",
      border: "border-slate-500/30",
      code: "build",
      description: "Usalo para cambios de build, bundling o dependencias de compilacion.",
    },
    {
      icon: <Wrench />,
      color: "from-indigo-500/20 to-cyan-500/10",
      border: "border-indigo-500/30",
      code: "ci",
      description: "Usalo para pipelines, acciones o integracion continua.",
    },
    {
      icon: <Wrench />,
      color: "from-pink-500/20 to-fuchsia-500/10",
      border: "border-pink-500/30",
      code: "chore",
      description: "Usalo para tareas de mantenimiento que no son feature ni fix.",
    },
    {
      icon: <Undo2 />,
      color: "from-red-500/20 to-rose-500/10",
      border: "border-red-500/30",
      code: "revert",
      description: "Usalo para revertir un cambio anterior.",
    },
  ];

  return (
    <div>
      <label
        htmlFor="Type"
        className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
      >
        Tipo
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
