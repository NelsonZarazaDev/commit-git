import { InputText } from "primereact/inputtext";

type props = {
  value: string;
  onChange: (value: string) => void;
};

export default function ScopeInput({ value, onChange }: props) {
  return (
    <div className="card flex flex-col justify-content-center gap-2">
      <label htmlFor="Scope" className="font-bold hover:text-indigo-300">
        Scope / Alcance - OPCIONAL
      </label>
      <InputText
        id="scope"
        name="scope"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        tooltip="Qué parte del código tocaste (Módulo, carpeta,
        componente, etc.)"
        tooltipOptions={{ position: "top" }}
       />
    </div>
  );
}
