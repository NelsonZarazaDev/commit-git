import { Dropdown } from "primereact/dropdown";

type props = {
  value: { code: string };
  onChange: (value: string) => void;
};

export default function CommitTypeSelector({ value, onChange }: props) {
  const tipos = [
    { name: "(feat) = Nueva funcionalidad", code: "feat" },
    { name: "(fix) = Corrección de bug", code: "fix" },
    { name: "(docs) = Solo cambios en documentación", code: "docs" },
    {
      name: "(style) = Formato o apariencia, sin cambiar lógica.",
      code: "style",
    },
    {
      name: "(refactor) = Mejoras de código sin cambiar funcionalidad",
      code: "refactor",
    },
    { name: "(perf) = Mejora de rendimiento", code: "perf" },
    { name: "(test) = Añadir o modificar pruebas", code: "test" },
    {
      name: "(chore) = Cambios en tareas de mantenimiento, configuraciones o actualizaciones de dependencias",
      code: "chore",
    },
    {
      name: "(build) = Cambios que afectan el empaquetado o herramientas de build",
      code: "build",
    },
    {
      name: "(ci) = Cambios en archivos de integración continua o scripts de despliegue",
      code: "ci",
    },
  ];

  return (
    <div className="card flex flex-col justify-content-center gap-2">
      <label htmlFor="Type" className="font-bold hover:text-indigo-300">
        Type / Tipo
      </label>
      <Dropdown
        id="type"
        name="type"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        options={tipos}
        optionLabel="name"
        placeholder="Select a type"
        className="w-full md:w-14rem"
      />
    </div>
  );
}
